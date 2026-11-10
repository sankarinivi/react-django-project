from django.db import models
from django.contrib.auth.models import User


# ==========================
# USER PROFILE
# ==========================

class UserProfile(models.Model):

    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Customer', 'Customer'),
        ('Surveyor', 'Surveyor'),
    )


    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )


    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )


    def __str__(self):
        return self.user.username



# ==========================
# VEHICLE
# ==========================

class Vehicle(models.Model):

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="vehicles"
    )


    vehicle_number = models.CharField(
        max_length=20,
        unique=True
    )


    Vehicle_model = models.CharField(
        max_length=100
    )

    insurance_company = models.CharField(
        max_length=20,
        choices=[
            ('icici','icici'),
            ('acko','acko'),
            ('tata','tata'),
        ]
    )


    policy_number = models.CharField(
        max_length=50,
        unique=True
    )


    def __str__(self):

        return f"{self.vehicle_number} - {self.Vehicle_model}"


# ==========================
# CLAIM
# ==========================

class Claim(models.Model):

    STATUS_CHOICES = (
        ("Pending","Pending"),
        ("Approved","Approved"),
        ("Rejected","Rejected"),
        ("Settled", "Settled"),
    )

    
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="claims"
    )


    claim_number = models.CharField(
        max_length=20,
        unique=True
    )
    accident_date = models.DateField()

    place = models.CharField(
        max_length=100
    )

    loss_details = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    def __str__(self):

        return self.claim_number





# ==========================
# SURVEY ASSIGNMENT
# ==========================

class SurveyAssignment(models.Model):

    STATUS_CHOICES = (
        ("Pending","Pending"),
        ("Assigned","Assigned"),
        ("Completed","Completed"),
    )


    claim = models.ForeignKey(
        Claim,
        on_delete=models.CASCADE,
        related_name="survey_assignments"
    )


    surveyor = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        limit_choices_to={
            "role":"Surveyor"
        }
    )


    inspection_date = models.DateField()


    remarks = models.TextField(
        blank=True
    )


    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Assigned"
    )


    assigned_date = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return (
            f"{self.claim.claim_number} -> "
            f"{self.surveyor.user.username}"
        )



class LiabilityLetter(models.Model):
    claim = models.OneToOneField(
        "Claim",
        on_delete=models.CASCADE,
        related_name="liability_letter"
    )

    approved_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    deductible = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    net_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    workshop_name = models.CharField(
        max_length=150
    )

    remarks = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Liability Letter - {self.claim.claim_number}"
    
class SurveyReport(models.Model):

    STATUS_CHOICES = (
    ("Pending", "Pending"),
    ("Approved", "Approved"),
    ("Rejected", "Rejected"),
    ("Completed", "Completed"),
    ("Settled", "Settled"),
)
    RECOMMENDATION_CHOICES = (
        ("Repair", "Repair"),
        ("Replace", "Replace"),
        ("Total Loss", "Total Loss"),
    )

    claim = models.ForeignKey(
        "Claim",
        on_delete=models.CASCADE,
        related_name="survey_reports"
    )

    surveyor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="survey_reports"
    )

    inspection_date = models.DateField()

    damaged_parts = models.TextField(
        blank=True,
        null=True
    )

    damage_description = models.TextField(
        blank=True,
        null=True
    )

    repair_estimate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    labor_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    parts_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    recommendation = models.CharField(
        max_length=20,
        choices=RECOMMENDATION_CHOICES,
        default="Repair"
    )

    remarks = models.TextField(
        blank=True,
        null=True
    )

    report = models.FileField(
        upload_to="survey_reports/",
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.claim.claim_number