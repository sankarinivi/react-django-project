from rest_framework import viewsets, serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser,
)

from .models import (
    UserProfile,
    Vehicle,
    Claim,
    SurveyReport,
    SurveyAssignment,
    LiabilityLetter,
)

from .serializer import (
    UserProfileSerializer,
    VehicleSerializer,
    ClaimSerializer,
    SurveyReportSerializer,
    SurveyAssignmentSerializer,
    LiabilityLetterSerializer,
)


# =========================================================
# USER PROFILE
# =========================================================

class UserProfileViewSet(viewsets.ModelViewSet):

    queryset = UserProfile.objects.all().select_related("user")
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        role = self.request.query_params.get("role")

        queryset = UserProfile.objects.select_related("user")

        if role:
            queryset = queryset.filter(role=role)

        return queryset


# =========================================================
# VEHICLE
# =========================================================

class VehicleViewSet(viewsets.ModelViewSet):

    serializer_class = VehicleSerializer

    def get_queryset(self):

        queryset = Vehicle.objects.select_related("customer")

        username = self.request.query_params.get("username")

        if username:
            queryset = queryset.filter(
                customer__username=username
            )

        return queryset


# =========================================================
# CLAIM
# =========================================================

class ClaimViewSet(viewsets.ModelViewSet):

    queryset = Claim.objects.select_related(
        "vehicle",
        "vehicle__customer",
    ).prefetch_related(
        "survey_assignments__surveyor__user"
    ).all()

    serializer_class = ClaimSerializer

    def get_queryset(self):

        queryset = self.queryset

        # Optional status filter
        claim_status = self.request.query_params.get("status")

        if claim_status:
            queryset = queryset.filter(
                status=claim_status
            )

        return queryset

    def perform_create(self, serializer):

        serializer.save(
            status="Pending"
        )


# =========================================================
# SURVEY ASSIGNMENT
# =========================================================

class SurveyAssignmentViewSet(viewsets.ModelViewSet):

    queryset = SurveyAssignment.objects.select_related(
        "claim",
        "claim__vehicle",
        "claim__vehicle__customer",
        "surveyor",
        "surveyor__user",
    ).all()

    serializer_class = SurveyAssignmentSerializer

    def perform_create(self, serializer):

        # Get claim selected by Admin
        claim = serializer.validated_data["claim"]

        # -------------------------------------------------
        # Check claim status
        # -------------------------------------------------

        if claim.status != "Pending":
            raise serializers.ValidationError({
                "claim": "Only Pending claims can be assigned."
            })

        # -------------------------------------------------
        # Check whether claim is already assigned
        # -------------------------------------------------

        if SurveyAssignment.objects.filter(
            claim=claim
        ).exists():

            raise serializers.ValidationError({
                "claim": "This claim is already assigned to a surveyor."
            })

        # -------------------------------------------------
        # Get selected surveyor
        # -------------------------------------------------

        surveyor = serializer.validated_data["surveyor"]

        # -------------------------------------------------
        # Check selected user is actually a Surveyor
        # -------------------------------------------------

        if surveyor.role != "Surveyor":

            raise serializers.ValidationError({
                "surveyor": "Selected user is not a surveyor."
            })

        # -------------------------------------------------
        # Create assignment
        # -------------------------------------------------

        serializer.save(
            status="Assigned"
        )

        # -------------------------------------------------
        # Keep Claim status as Pending
        # -------------------------------------------------
        #
        # IMPORTANT:
        # We are NOT changing Claim status here.
        #
        # Admin page identifies assigned claims by checking
        # SurveyAssignment.
        #
        # This avoids the "Pending" / "Surveyor Assigned"
        # status mismatch.
        #


# =========================================================
# SURVEY REPORT
# =========================================================

class SurveyReportViewSet(viewsets.ModelViewSet):

    queryset = SurveyReport.objects.select_related(
        "claim",
        "claim__vehicle",
        "claim__vehicle__customer",
        "surveyor",
    ).all()

    serializer_class = SurveyReportSerializer

    parser_classes = (
        MultiPartParser,
        FormParser,
        JSONParser,
    )

    def list(self, request, *args, **kwargs):

        reports = self.get_queryset()

        print("TOTAL REPORTS:", reports.count())

        return super().list(
            request,
            *args,
            **kwargs
        )

    def perform_create(self, serializer):

        # SurveyReport.surveyor is a User FK
        serializer.save(
            surveyor=self.request.user,
            status="Completed"
        )


# =========================================================
# LOGIN
# =========================================================

@api_view(["POST"])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:

        return Response(
            {
                "message": "Invalid Username or Password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    role = "Customer"

    try:

        role = user.userprofile.role

    except UserProfile.DoesNotExist:

        pass

    return Response(
        {
            "message": "Login Success",
            "username": user.username,
            "role": role,
            "user_id": user.id,
        },
        status=status.HTTP_200_OK
    )


# =========================================================
# CUSTOMER LIST
# =========================================================

@api_view(["GET"])
def customers(request):

    users = User.objects.filter(
        userprofile__role="Customer"
    )

    customer_list = []

    for user in users:

        customer_list.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

    return Response(customer_list)


# =========================================================
# SURVEYOR LIST
# =========================================================

@api_view(["GET"])
def surveyors(request):

    users = User.objects.filter(
        userprofile__role="Surveyor"
    ).select_related("userprofile")

    surveyor_list = []

    for user in users:

        surveyor_list.append({

            # IMPORTANT:
            # This is UserProfile ID
            "id": user.userprofile.id,

            # Django User ID
            "user_id": user.id,

            "username": user.username,

            "email": user.email,

            "role": user.userprofile.role,
        })

    return Response(surveyor_list)


# =========================================================
# LIABILITY LETTER
# =========================================================

class LiabilityLetterViewSet(viewsets.ModelViewSet):

    queryset = LiabilityLetter.objects.all()

    serializer_class = LiabilityLetterSerializer


# =========================================================
# SEND LIABILITY LETTER EMAIL
# =========================================================

@api_view(["POST"])
def send_liability_mail(request):

    try:

        claim_id = request.data.get("claim")

        if not claim_id:

            return Response(
                {
                    "error": "Claim ID is required"
                },
                status=400
            )

        letter = LiabilityLetter.objects.get(
            claim_id=claim_id
        )

        # Customer is linked through Vehicle
        customer = letter.claim.vehicle.customer

        subject = "Vehicle Insurance Liability Letter"

        message = f"""
Dear {customer.username},

Your vehicle insurance claim has been approved.

Claim Number : {letter.claim.claim_number}

Approved Amount : ₹{letter.approved_amount}

Deductible : ₹{letter.deductible}

Net Liability : ₹{letter.net_amount}

Workshop :
{letter.workshop_name}

Remarks :
{letter.remarks if letter.remarks else "NIL"}

Thank you for choosing our insurance services.

Regards,
Insurance Company
"""

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [customer.email],
            fail_silently=False,
        )

        return Response({
            "message": "Liability Letter emailed successfully."
        })

    except LiabilityLetter.DoesNotExist:

        return Response(
            {
                "error": "Liability Letter not found"
            },
            status=404
        )

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=500
        )