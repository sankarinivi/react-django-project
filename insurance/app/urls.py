from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import send_liability_mail
from .views import (
    UserProfileViewSet,
    VehicleViewSet,
    ClaimViewSet,
    SurveyReportViewSet,
    SurveyAssignmentViewSet,
    LiabilityLetterViewSet,
    login,
    customers,
    surveyors,
    
    
)

router = DefaultRouter()


router.register(r"userprofiles", UserProfileViewSet)
router.register(r"vehicles", VehicleViewSet, basename="vehicle")
router.register(r"claims", ClaimViewSet)
router.register(r"surveyReports", SurveyReportViewSet,basename="surveyReports")
router.register(r"surveyassignments", SurveyAssignmentViewSet)
router.register(r'liabilityletters',LiabilityLetterViewSet)

#urlpatterns += router.urls

urlpatterns = [
    path("", include(router.urls)),
    path("login/", login, name="login"),
    path("customers/", customers),
    path( "surveyors/",surveyors,name="surveyors"),
    path("send-liability-mail/",send_liability_mail,name="send-liability-mail" ),
   
]