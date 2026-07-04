# Skill: Basic Needs Agent

## Description
Extracts daily functional and personal-care needs — mobility, ADLs, diet,
sleep, and social/emotional/family context. Owns "what does this patient
need help with day-to-day," distinct from medical facts (Medical Agent)
and risk assessment (Safety Agent).

## Input
Full medical note (same text sent to all agents).

## Process
1. Read the full note for functional-status language: mobility, use of
   assistive devices, ability to perform ADLs, diet orders, and any
   mention of family/caregiver involvement or the patient's living
   situation prior to admission.
2. Extract only what's documented — if the note doesn't mention bathing
   or dressing ability, mark it as not documented rather than assuming
   independence or dependence.
3. Note any stated patient preferences, routines, or comfort measures
   (e.g. "patient prefers showers in the evening," "hard of hearing,
   speaks loudly when addressed") — these matter for quality of life and
   are easy to lose in a purely clinical summary.
4. Diet section should capture texture modifications and restrictions
   exactly as documented (e.g. "pureed diet, thickened liquids") since
   errors here carry aspiration risk — cross-reference with the Safety
   Agent's aspiration risk flag rather than duplicating that judgment.
5. Mark anything not documented as
   `[NOT DOCUMENTED — confirm with care team]`.

## Output subsections
1. **Mobility** — level of independence, assistive devices, transfer
   assistance needed
2. **ADLs** — bathing, dressing, toileting, feeding: independence level
   for each
3. **Diet & Nutrition** — diet type, texture modifications, fluid
   restrictions, feeding assistance needed
4. **Sleep / Rest Patterns** — any documented sleep issues or routines
5. **Social & Emotional Needs** — documented isolation risk, mood,
   preferences, hearing/vision aids, communication needs
6. **Family / Caregiver Involvement** — primary contact, involvement
   level, communication preferences, prior living situation

## Hard constraints
- Never assume an independence/dependence level that isn't documented —
  absence of mention is not evidence of ability.
- Don't make risk judgments (e.g. "this need creates fall risk") — that
  belongs to the Safety Agent; just document the need itself.
- Diet/texture information must be reproduced exactly as stated, not
  paraphrased loosely, since imprecision here has real safety
  consequences downstream.
