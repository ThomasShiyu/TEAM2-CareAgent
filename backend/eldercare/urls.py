from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import (
    ResidentViewSet,
    StaffViewSet,
    BasicNeedsAssessmentViewSet,
    SafetyNeedsAssessmentViewSet,
    MedicalConditionViewSet,
    MedicationViewSet,
    MedicationAdministrationLogViewSet,
    AllergyViewSet,
    TherapyNeedViewSet,
    VitalsLogViewSet,
    AdvanceDirectiveViewSet,
)

router = DefaultRouter()
router.register(r"residents", ResidentViewSet)
router.register(r"staff", StaffViewSet)
router.register(r"basic-needs-assessments", BasicNeedsAssessmentViewSet)
router.register(r"safety-needs-assessments", SafetyNeedsAssessmentViewSet)
router.register(r"medical-conditions", MedicalConditionViewSet)
router.register(r"medications", MedicationViewSet)
router.register(r"medication-administration-logs", MedicationAdministrationLogViewSet)
router.register(r"allergies", AllergyViewSet)
router.register(r"therapy-needs", TherapyNeedViewSet)
router.register(r"vitals-logs", VitalsLogViewSet)
router.register(r"advance-directives", AdvanceDirectiveViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
