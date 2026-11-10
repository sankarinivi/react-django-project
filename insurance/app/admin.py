from django.contrib import admin
from .models import (
    UserProfile,
    Vehicle,
    Claim,
    SurveyReport,
    SurveyAssignment,
    LiabilityLetter
)


admin.site.register(UserProfile)
admin.site.register(Vehicle)
admin.site.register(Claim)
admin.site.register(SurveyReport)
admin.site.register(SurveyAssignment)
admin.site.register(LiabilityLetter)