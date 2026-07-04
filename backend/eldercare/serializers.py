from rest_framework import serializers
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


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"


class BasicNeedsAssessmentSerializer(serializers.ModelSerializer):
    assessed_by_name = serializers.CharField(source="assessed_by.__str__", read_only=True)

    class Meta:
        model = BasicNeedsAssessment
        fields = "__all__"
        read_only_fields = ["created_at"]


class SafetyNeedsAssessmentSerializer(serializers.ModelSerializer):
    assessed_by_name = serializers.CharField(source="assessed_by.__str__", read_only=True)

    class Meta:
        model = SafetyNeedsAssessment
        fields = "__all__"
        read_only_fields = ["created_at"]


class MedicalConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalCondition
        fields = "__all__"
        read_only_fields = ["created_at"]


class MedicationAdministrationLogSerializer(serializers.ModelSerializer):
    administered_by_name = serializers.CharField(source="administered_by.__str__", read_only=True)

    class Meta:
        model = MedicationAdministrationLog
        fields = "__all__"
        read_only_fields = ["administered_at"]


class MedicationSerializer(serializers.ModelSerializer):
    # Nested read-only log history; writes go through the dedicated
    # MedicationAdministrationLog endpoint to keep concerns separate.
    administration_logs = MedicationAdministrationLogSerializer(many=True, read_only=True)

    class Meta:
        model = Medication
        fields = "__all__"
        read_only_fields = ["created_at"]


class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = "__all__"


class TherapyNeedSerializer(serializers.ModelSerializer):
    therapy_type_display = serializers.CharField(source="get_therapy_type_display", read_only=True)

    class Meta:
        model = TherapyNeed
        fields = "__all__"
        read_only_fields = ["created_at"]


class VitalsLogSerializer(serializers.ModelSerializer):
    recorded_by_name = serializers.CharField(source="recorded_by.__str__", read_only=True)

    class Meta:
        model = VitalsLog
        fields = "__all__"
        read_only_fields = ["recorded_at"]


class AdvanceDirectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvanceDirective
        fields = "__all__"
        read_only_fields = ["updated_at"]


class ResidentSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views / nesting elsewhere."""

    age = serializers.SerializerMethodField()

    class Meta:
        model = Resident
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

    def get_age(self, obj):
        from datetime import date
        if not obj.date_of_birth:
            return None
        today = date.today()
        return today.year - obj.date_of_birth.year - (
            (today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day)
        )


class ResidentDetailSerializer(ResidentSerializer):
    """Heavier serializer with full related history — use for a resident's detail page."""

    basic_needs_assessments = BasicNeedsAssessmentSerializer(many=True, read_only=True)
    safety_needs_assessments = SafetyNeedsAssessmentSerializer(many=True, read_only=True)
    medical_conditions = MedicalConditionSerializer(many=True, read_only=True)
    medications = MedicationSerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    therapy_needs = TherapyNeedSerializer(many=True, read_only=True)
    vitals_logs = VitalsLogSerializer(many=True, read_only=True)
    advance_directive = AdvanceDirectiveSerializer(read_only=True)

    class Meta(ResidentSerializer.Meta):
        pass
