from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# ============================================================
# CHOICES (mirrors the VARCHAR "enum-like" fields from SQL)
# ============================================================

class AssistanceLevel(models.TextChoices):
    INDEPENDENT = "independent", "Independent"
    PARTIAL = "partial", "Partial"
    FULL = "full", "Full"


class Level3(models.TextChoices):
    POOR = "poor", "Poor"
    FAIR = "fair", "Fair"
    GOOD = "good", "Good"


class RiskLevel(models.TextChoices):
    LOW = "low", "Low"
    MEDIUM = "medium", "Medium"
    HIGH = "high", "High"


class Severity(models.TextChoices):
    MILD = "mild", "Mild"
    MODERATE = "moderate", "Moderate"
    SEVERE = "severe", "Severe"


class ContinenceStatus(models.TextChoices):
    CONTINENT = "continent", "Continent"
    OCCASIONAL = "occasional", "Occasional"
    INCONTINENT = "incontinent", "Incontinent"


class MobilityAid(models.TextChoices):
    NONE = "none", "None"
    CANE = "cane", "Cane"
    WALKER = "walker", "Walker"
    WHEELCHAIR = "wheelchair", "Wheelchair"
    BEDBOUND = "bedbound", "Bedbound"


class SupervisionLevel(models.TextChoices):
    NONE = "none", "None"
    PERIODIC = "periodic", "Periodic"
    CONSTANT = "constant", "Constant"


class ConditionStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    RESOLVED = "resolved", "Resolved"
    CHRONIC = "chronic", "Chronic"


class MedicationRoute(models.TextChoices):
    ORAL = "oral", "Oral"
    INJECTION = "injection", "Injection"
    TOPICAL = "topical", "Topical"
    INHALED = "inhaled", "Inhaled"


class AdministrationStatus(models.TextChoices):
    GIVEN = "given", "Given"
    MISSED = "missed", "Missed"
    REFUSED = "refused", "Refused"


class TherapyType(models.TextChoices):
    PHYSICAL = "physical", "Physical"
    OCCUPATIONAL = "occupational", "Occupational"
    SPEECH = "speech", "Speech"
    RESPIRATORY = "respiratory", "Respiratory"


class ResidentStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    DISCHARGED = "discharged", "Discharged"
    DECEASED = "deceased", "Deceased"


# ============================================================
# CORE
# ============================================================

class Resident(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=20, blank=True)
    room_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)  # if home-care rather than facility

    primary_physician_name = models.CharField(max_length=150, blank=True)
    primary_physician_phone = models.CharField(max_length=30, blank=True)

    emergency_contact_name = models.CharField(max_length=150, blank=True)
    emergency_contact_phone = models.CharField(max_length=30, blank=True)
    emergency_contact_relation = models.CharField(max_length=50, blank=True)

    admission_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=ResidentStatus.choices, default=ResidentStatus.ACTIVE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Staff(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, blank=True)  # nurse, caregiver, doctor, PT, etc.
    email = models.EmailField(max_length=150, blank=True)
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


# ============================================================
# 1. BASIC NEEDS (ADLs)
# One row per assessment -> full history preserved
# ============================================================

class BasicNeedsAssessment(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="basic_needs_assessments")
    assessment_date = models.DateField(auto_now_add=False)
    assessed_by = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)

    # Eating / Nutrition
    appetite_level = models.CharField(max_length=20, choices=Level3.choices, blank=True)
    diet_type = models.CharField(max_length=50, blank=True)  # regular, pureed, diabetic, low-sodium, renal...
    dietary_restrictions = models.TextField(blank=True)
    swallowing_difficulty = models.BooleanField(default=False)
    eating_assistance_level = models.CharField(max_length=20, choices=AssistanceLevel.choices, blank=True)
    hydration_status = models.CharField(max_length=20, blank=True)  # adequate, at_risk, dehydrated
    avg_fluid_intake_ml = models.PositiveIntegerField(null=True, blank=True)

    # Sleeping
    avg_sleep_hours = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    sleep_quality = models.CharField(max_length=20, choices=Level3.choices, blank=True)
    sleep_aid_used = models.BooleanField(default=False)
    sleep_disturbances = models.TextField(blank=True)  # e.g. nighttime waking, sundowning

    # Continence
    bladder_continence = models.CharField(max_length=20, choices=ContinenceStatus.choices, blank=True)
    bowel_continence = models.CharField(max_length=20, choices=ContinenceStatus.choices, blank=True)
    toileting_assistance_level = models.CharField(max_length=20, choices=AssistanceLevel.choices, blank=True)

    # Dressing / Grooming
    dressing_assistance_level = models.CharField(max_length=20, choices=AssistanceLevel.choices, blank=True)
    grooming_assistance_level = models.CharField(max_length=20, choices=AssistanceLevel.choices, blank=True)

    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-assessment_date"]
        indexes = [models.Index(fields=["resident", "assessment_date"])]

    def __str__(self):
        return f"Basic needs - {self.resident} ({self.assessment_date})"


# ============================================================
# 2. SAFETY NEEDS
# One row per assessment -> track risk evolution over time
# ============================================================

class SafetyNeedsAssessment(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="safety_needs_assessments")
    assessment_date = models.DateField()
    assessed_by = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)

    # Fall risk
    fall_risk_score = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(125)],  # e.g. Morse Fall Scale range
        help_text="e.g. Morse Fall Scale (0-125)"
    )
    fall_risk_level = models.CharField(max_length=20, choices=RiskLevel.choices, blank=True)
    fall_history_count = models.PositiveIntegerField(default=0)
    last_fall_date = models.DateField(null=True, blank=True)
    mobility_aid = models.CharField(max_length=30, choices=MobilityAid.choices, blank=True)

    # Hygiene / self-care safety
    bathing_assistance_level = models.CharField(max_length=20, choices=AssistanceLevel.choices, blank=True)
    bathroom_grab_bars_present = models.BooleanField(default=False)
    non_slip_mats_present = models.BooleanField(default=False)

    # Cognitive / wandering
    cognitive_impairment_level = models.CharField(
        max_length=20,
        choices=[("none", "None")] + Severity.choices,
        blank=True,
    )
    wandering_risk = models.BooleanField(default=False)
    door_alarm_needed = models.BooleanField(default=False)

    # Supervision & environment
    supervision_level_required = models.CharField(max_length=20, choices=SupervisionLevel.choices, blank=True)
    home_hazards_identified = models.TextField(blank=True)
    bed_rail_needed = models.BooleanField(default=False)
    emergency_device_present = models.BooleanField(default=False)
    emergency_device_type = models.CharField(max_length=50, blank=True)  # e.g. wearable alert button

    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-assessment_date"]
        indexes = [models.Index(fields=["resident", "assessment_date"])]

    def __str__(self):
        return f"Safety needs - {self.resident} ({self.assessment_date})"


# ============================================================
# 3. MEDICAL NEEDS
# ============================================================

class MedicalCondition(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="medical_conditions")
    condition_name = models.CharField(max_length=150)
    diagnosis_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=ConditionStatus.choices, default=ConditionStatus.ACTIVE)
    severity = models.CharField(max_length=20, choices=Severity.choices, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["resident", "status"])]

    def __str__(self):
        return f"{self.condition_name} - {self.resident}"


class Medication(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="medications")
    medication_name = models.CharField(max_length=150)
    dosage = models.CharField(max_length=50, blank=True)      # e.g. "500mg"
    frequency = models.CharField(max_length=50, blank=True)   # e.g. "twice daily"
    route = models.CharField(max_length=30, choices=MedicationRoute.choices, blank=True)
    prescribing_doctor = models.CharField(max_length=150, blank=True)
    purpose = models.CharField(max_length=150, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)
    side_effects_observed = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["resident", "active"])]

    def __str__(self):
        return f"{self.medication_name} - {self.resident}"


class MedicationAdministrationLog(models.Model):
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE, related_name="administration_logs")
    administered_at = models.DateTimeField(auto_now_add=True)
    administered_by = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=AdministrationStatus.choices, default=AdministrationStatus.GIVEN)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-administered_at"]
        indexes = [models.Index(fields=["medication", "administered_at"])]

    def __str__(self):
        return f"{self.medication} - {self.administered_at} ({self.status})"


class Allergy(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="allergies")
    allergen = models.CharField(max_length=150)
    reaction_type = models.CharField(max_length=150, blank=True)  # e.g. rash, anaphylaxis
    severity = models.CharField(max_length=20, choices=Severity.choices, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.allergen} - {self.resident}"


class TherapyNeed(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="therapy_needs")
    therapy_type = models.CharField(max_length=50, choices=TherapyType.choices)
    provider_name = models.CharField(max_length=150, blank=True)
    frequency = models.CharField(max_length=50, blank=True)  # e.g. "3x/week"
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    goals = models.TextField(blank=True)
    progress_notes = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_therapy_type_display()} - {self.resident}"


class VitalsLog(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE, related_name="vitals_logs")
    recorded_at = models.DateTimeField(auto_now_add=True)
    recorded_by = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)

    blood_pressure_systolic = models.PositiveIntegerField(null=True, blank=True)
    blood_pressure_diastolic = models.PositiveIntegerField(null=True, blank=True)
    heart_rate_bpm = models.PositiveIntegerField(null=True, blank=True)
    temperature_celsius = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    blood_oxygen_pct = models.PositiveIntegerField(
        null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    blood_glucose_mgdl = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-recorded_at"]
        indexes = [models.Index(fields=["resident", "recorded_at"])]

    def __str__(self):
        return f"Vitals - {self.resident} ({self.recorded_at})"


class AdvanceDirective(models.Model):
    resident = models.OneToOneField(Resident, on_delete=models.CASCADE, related_name="advance_directive")
    dnr_status = models.BooleanField(default=False)  # Do Not Resuscitate
    living_will_on_file = models.BooleanField(default=False)
    healthcare_proxy_name = models.CharField(max_length=150, blank=True)
    healthcare_proxy_phone = models.CharField(max_length=30, blank=True)
    notes = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Advance directive - {self.resident}"
