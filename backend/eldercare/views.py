from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Resident,
    Staff,
    BasicNeedsAssessment,
    SafetyNeedsAssessment,
    MedicalCondition,
    Medication,
    MedicationAdministrationLog,
    Allergy,
    TherapyNeed,
    VitalsLog,
    AdvanceDirective,
)
from .serializers import (
    ResidentSerializer,
    ResidentDetailSerializer,
    StaffSerializer,
    BasicNeedsAssessmentSerializer,
    SafetyNeedsAssessmentSerializer,
    MedicalConditionSerializer,
    MedicationSerializer,
    MedicationAdministrationLogSerializer,
    AllergySerializer,
    TherapyNeedSerializer,
    VitalsLogSerializer,
    AdvanceDirectiveSerializer,
)


class ResidentViewSet(viewsets.ModelViewSet):
    queryset = Resident.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "room_number"]
    search_fields = ["first_name", "last_name"]

    def get_serializer_class(self):
        # Full nested history on retrieve, lightweight for list/create/update
        if self.action == "retrieve":
            return ResidentDetailSerializer
        return ResidentSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["role"]
    search_fields = ["first_name", "last_name"]


class BasicNeedsAssessmentViewSet(viewsets.ModelViewSet):
    queryset = BasicNeedsAssessment.objects.all()
    serializer_class = BasicNeedsAssessmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "assessment_date"]


class SafetyNeedsAssessmentViewSet(viewsets.ModelViewSet):
    queryset = SafetyNeedsAssessment.objects.all()
    serializer_class = SafetyNeedsAssessmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "assessment_date", "fall_risk_level"]


class MedicalConditionViewSet(viewsets.ModelViewSet):
    queryset = MedicalCondition.objects.all()
    serializer_class = MedicalConditionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "status"]


class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "active"]


class MedicationAdministrationLogViewSet(viewsets.ModelViewSet):
    queryset = MedicationAdministrationLog.objects.all()
    serializer_class = MedicationAdministrationLogSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["medication", "status"]


class AllergyViewSet(viewsets.ModelViewSet):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "severity"]


class TherapyNeedViewSet(viewsets.ModelViewSet):
    queryset = TherapyNeed.objects.all()
    serializer_class = TherapyNeedSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident", "therapy_type", "active"]


class VitalsLogViewSet(viewsets.ModelViewSet):
    queryset = VitalsLog.objects.all()
    serializer_class = VitalsLogSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident"]


class AdvanceDirectiveViewSet(viewsets.ModelViewSet):
    queryset = AdvanceDirective.objects.all()
    serializer_class = AdvanceDirectiveSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["resident"]
