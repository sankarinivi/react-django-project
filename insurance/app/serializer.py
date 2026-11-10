from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Vehicle, Claim,SurveyReport,SurveyAssignment,LiabilityLetter



class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "email",
            "role",
        ]

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        user = User.objects.create_user(
            username=user_data["username"],
            email=user_data["email"],
            password="123456"
        )

        profile = UserProfile.objects.create(
            user=user,
            role=validated_data["role"]
        )

        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        instance.user.username = user_data.get(
            "username",
            instance.user.username
        )

        instance.user.email = user_data.get(
            "email",
            instance.user.email
        )

        instance.user.save()

        instance.role = validated_data.get(
            "role",
            instance.role
        )

        instance.save()

        return instance


class VehicleSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(
        source="customer.username",
        read_only=True
    )

    class Meta:
        model = Vehicle
        fields = [
            "id",
            "customer",
            "customer_name",
            "vehicle_number",
            "Vehicle_model",
            "insurance_company",
            "policy_number",
        ]
        
class ClaimSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(
        source="vehicle.customer.username",
        read_only=True
    )
    customer_email = serializers.EmailField(
        source="vehicle.customer.email",
        read_only=True
    )

    vehicle_number = serializers.CharField(
        source="vehicle.vehicle_number",
        read_only=True
    )
    policy_number = serializers.CharField(
        source="vehicle.policy_number",
        read_only=True
    )

    insurance_company = serializers.CharField(
        source="vehicle.insurance_company",
        read_only=True
    )
    
    class Meta:

        model = Claim

        fields = [
    "id",
    "claim_number",
    "vehicle",
    "customer_name",
    "customer_email",
    "policy_number",
    "insurance_company",
    "vehicle_number",
    "accident_date",
    "place",
    "loss_details",
    "status",
    "surveyor_name",
]
    surveyor_name = serializers.SerializerMethodField()

    def get_surveyor_name(self, obj):
        assignment = obj.survey_assignments.last()
        if assignment:
            return assignment.surveyor.user.username
        return ""


class SurveyReportSerializer(serializers.ModelSerializer):

    claim_number = serializers.CharField(
        source="claim.claim_number",
        read_only=True
    )

    vehicle_number = serializers.CharField(
        source="claim.vehicle.vehicle_number",
        read_only=True
    )

    surveyor_name = serializers.CharField(
    source="surveyor.username",
    read_only=True
)

    customer_name = serializers.CharField(
        source="claim.vehicle.customer.username",
        read_only=True
    )

    class Meta:
        model = SurveyReport

        fields = [
            "id",
            "claim",
            "claim_number",
            "vehicle_number",
            "customer_name",
            "surveyor",
            "surveyor_name",
            "inspection_date",
            "damaged_parts",
            "damage_description",
            "repair_estimate",
            "labor_cost",
            "parts_cost",
            "recommendation",
            "remarks",
            "report",
            "status",
            "created_at",
        ]
    def perform_create(self, serializer):
        profile = UserProfile.objects.get(user=self.request.user)

        serializer.save(
        surveyor=profile,
        status="Completed"
    )

        read_only_fields = (
            "id",
            "claim_number",
            "vehicle_number",
            "customer_name",
             "surveyor",
            "surveyor_name",
            "status",
            "created_at",
        )

    def validate_repair_estimate(self, value):
        return value or 0

    def validate_labor_cost(self, value):
        return value or 0

    def validate_parts_cost(self, value):
        return value or 0
     
    
class SurveyAssignmentSerializer(serializers.ModelSerializer):

    claim_number = serializers.CharField(
        source="claim.claim_number",
        read_only=True
    )

    vehicle_number = serializers.CharField(
        source="claim.vehicle.vehicle_number",
        read_only=True
    )

    customer_name = serializers.CharField(
        source="claim.vehicle.customer.username",
        read_only=True
    )

    surveyor_name = serializers.CharField(
        source="surveyor.user.username",
        read_only=True
    )

    class Meta:
        model = SurveyAssignment
        fields = [
            "id",
            "claim",
            "claim_number",
            "vehicle_number",
            "customer_name",
            "surveyor",
            "surveyor_name",
            "inspection_date",
            "remarks",
            "status",
            "assigned_date",
        ]

class LiabilityLetterSerializer(serializers.ModelSerializer):

    class Meta:
        model = LiabilityLetter
        fields = "__all__"


