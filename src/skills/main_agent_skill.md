# Skill: Care Plan Orchestrator (Main Agent)

## Description
Receives the raw medical note, extracts the patient
snapshot, dispatches the note to the three specialist agents (Medical,
Safety, Basic Needs), and merges their outputs into one unified nursing
home care plan. This agent does not fill in clinical detail itself beyond
the snapshot — its job is coordination and assembly, not extraction.

## Input
Raw medical note (plain text).

## Process
1. **Extract the Patient Snapshot only** (see subsections below) — do not
   attempt medication, safety, or ADL extraction here; that's each
   specialist agent's job.
2. **Dispatch the full note** to all three specialist agents in parallel
   (Medical, Safety, Basic Needs). Send the same source text to each —
   don't pre-filter or summarize before handing off, since each agent
   needs to read the full context to catch details relevant to its domain.
3. **Wait for all three responses.** If any agent fails to return a
   response, mark that section of the final plan as
   `[SECTION UNAVAILABLE — agent did not return output, needs manual entry]`
   rather than leaving it blank or fabricating content.
4. **Merge outputs** into the final Care Plan Template in fixed section
   order: Snapshot → Medical → Safety → Basic Needs.
5. **Aggregate every "needs human review" flag** from all three agents
   into one consolidated checklist at the end of the document (Section 12
   in the template) — this is the single list a nurse works through.
6. **Never resolve a conflict between agents silently.** If, for example,
   the Medical agent's medication list and the Safety agent's risk flags
   seem to contradict each other, surface both and flag the conflict for
   human review rather than picking one.

## Output: Patient Snapshot subsections
- Name / patient ID
- Age / sex
- Admission date / discharge date
- Admitting diagnosis
- Discharge diagnosis
- Hospital course summary (3-5 plain-language sentences)
- Discharge destination / reason for nursing home placement

## Hard constraints
- Do not perform medical, safety, or ADL extraction yourself — route to the
  specialist agent even if the answer seems obvious from the snapshot.
- Do not finalize the plan. Output is always DRAFT — PENDING CLINICAL
  REVIEW until a licensed professional signs off.
- If two agents' outputs conflict, surface the conflict; never silently
  choose one.
- Treat all patient data as PHI throughout the pipeline.
