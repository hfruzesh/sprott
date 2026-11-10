# Original-material verification

Baseline: [hfruzesh/sprott at a9a07abab679faccb9206ba9b6268623a2ff1e57](https://github.com/hfruzesh/sprott/tree/a9a07abab679faccb9206ba9b6268623a2ff1e57), the repository state before the super-quiz work. All ten input files were checked against that commit, ignoring only Git CRLF/LF line-ending differences. Their SHA-256 digests are pinned in original-source-manifest.json; the builder refuses changed inputs.

- 758 original records included, with every source ID preserved.
- 758 exact matches for prompts, all answer choices, correct answer texts/sets, explanations and distractor feedback.
- 0 added questions, 0 changed question–answer pairings and 0 outside references added.
- The original 62 two-choice questions and 8 select-all questions are retained in their original form.

The previous 180 substantive rewrites, spelling-normalization layer and externally sourced living-will replacement have been removed from the active bank. The original wording and course keys are reproduced verbatim, including any original limitations or errors. This verifies agreement with the original quizzes; it is not an independent certification of their factual accuracy or complete textbook coverage. Original links already in the repo are retained.

source-parity.json records each question’s matching content fingerprint. coverage.json records each current key and source locator. Only question IDs are namespaced, answer keys are stored as indices, and relative reference paths are rebased for the combined interface. These storage and navigation adaptations do not change question text or answers.

The interface improvements remain: live progress, guarded navigation, validated saves, in-page confirmations, paginated review, result export and preserved full-quiz results during retries. The default experience teaches after each answer and records lessons explored, without a pass/fail target.

Rebuild with node build-super-quiz.cjs. Run npm test for source-parity, grading and page-control checks.

## Study modes and additional authorized source

The source-parity counts above apply to the original 758-question bank. The 100-question level selects advanced original questions; the 400-question level includes those 100 and all nine study areas; the full level includes all 758. Selection metadata is in study-levels.json. Difficulty is an editorial selection based on original round labels and question design, not measured student performance.

A separate write-in section contains 80 prompts and model answers from the user-supplied HCA200_Final_Exam_Instructor_Review_QA.pdf. This newly authorized PDF source does not change or add to the 758 original multiple-choice records. written-source.json records its file digest, page locators, confidence labels and local key-point checklists. Feedback is a study aid requiring comparison with the model answer, not semantic or official marking.

## Instructional answer feedback

The 758 original prompts, choices, correct keys and original explanations remain unchanged. A separate teaching layer adds explanations for all 2,915 answer choices. Existing choice-specific feedback is retained. Other choices use related original course examples, source-supported decision distinctions, or explicit comparisons between the alternative and the original keyed response and rationale. Added teaching notes are explanatory material, not new question–answer pairings or independently verified clinical/legal guidance. Every teaching record cites its original question and any supporting question IDs.

Where a precise page or slide was not recorded in the original bank, the interface says so and supplies the chapter, topic, recorded section-level locator and original guide link; it does not invent page references. teaching-coverage.json records option counts and source precision for every question.
