# Original-material verification

Baseline: [hfruzesh/sprott at a9a07abab679faccb9206ba9b6268623a2ff1e57](https://github.com/hfruzesh/sprott/tree/a9a07abab679faccb9206ba9b6268623a2ff1e57), the repository state before the super-quiz work. All ten input files were checked against that commit, ignoring only Git CRLF/LF line-ending differences. Their SHA-256 digests are pinned in original-source-manifest.json; the builder refuses changed inputs.

- 758 original records included, with every source ID preserved.
- 758 exact matches for prompts, all answer choices, correct answer texts/sets, explanations and distractor feedback.
- 0 added questions, 0 changed question–answer pairings and 0 outside references added.
- The original 62 two-choice questions and 8 select-all questions are retained in their original form.

The previous 180 substantive rewrites, spelling-normalization layer and externally sourced living-will replacement have been removed from the active bank. The original wording and course keys are reproduced verbatim, including any original limitations or errors. This verifies agreement with the original quizzes; it is not an independent certification of their factual accuracy or complete textbook coverage. Original links already in the repo are retained.

source-parity.json records each question’s matching content fingerprint. coverage.json records each current key and source locator. Only question IDs are namespaced, answer keys are stored as indices, and relative reference paths are rebased for the combined interface. These storage and navigation adaptations do not change question text or answers.

The interface improvements remain: live progress, guarded navigation, validated saves, in-page confirmations, paginated review, result export and preserved full-quiz results during retries. The strict 90% practice target is an app rule, not new course content or an official pass mark.

Rebuild with node build-super-quiz.cjs. Run npm test for source-parity, grading and page-control checks.
