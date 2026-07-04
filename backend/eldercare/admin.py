from django.contrib import admin
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

admin.site.register(Resident)
admin.site.register(Staff)
admin.site.register(BasicNeedsAssessment)
admin.site.register(SafetyNeedsAssessment)
admin.site.register(MedicalCondition)
admin.site.register(Medication)
admin.site.register(MedicationAdministrationLog)
admin.site.register(Allergy)
admin.site.register(TherapyNeed)
admin.site.register(VitalsLog)
admin.site.register(AdvanceDirective)
