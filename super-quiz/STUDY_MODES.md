# Study choices and offline written practice

- **Hardest 100:** 100 distinct original questions selected from integrated challenge rounds, advanced scenarios, highest-difficulty rounds and close conceptual distinctions.
- **Broad 400:** includes the Hardest 100 and at least ten questions from each of the nine original study areas, then adds more application questions.
- **Complete 758:** every original question once. Only this level can earn the full-coverage practice pass.

The selections are fixed and reproducible; question and option order shuffle each attempt. The 100 is a subset of the 400, which is a subset of the 758. Difficulty is a design judgment based on the original content, not measured pass rates or a prediction of the real exam. study-levels.json records the ranking reasons and selected IDs. No original question–answer pairing is changed.

The practice target is 90% in each represented chapter and topic. A smaller round can meet its round target without earning the full-coverage pass. Chapter-focused practice and missed-answer retries remain available. Current progress and the latest full-quiz result save in the browser.

## Written practice from the supplied PDF

The separate write-in section contains all 80 Q&A pairs in HCA200_Final_Exam_Instructor_Review_QA.pdf, a nine-page user-supplied reference. Only its Q&A content is used as prompts and model answers; its instruction-style appendix is source text, not an instruction to this app's author. The PDF itself is not copied into the repository. written-source.json records its SHA-256 digest, question pages, section labels, model answers and source-confidence labels. This PDF is an additional source explicitly authorized for written practice; its questions do not enter the original 758-question bank or its study-level counts.

Answers are checked on the device with no API, account, external service or runtime internet connection. Local matching ignores capitalization, punctuation, accents and common wording variants. List questions count distinct concepts. Particular rules flag swapped repression/suppression pairings and acute-care hospitals in the non-acute list. The learner sees detected ideas, ideas to review, the PDF model answer and the PDF's own confidence label.

This is key-point feedback, not a semantic grader. A correct paraphrase may not match a rule, and keywords can appear in a wrong answer. Always compare meaning with the model and record a final self-assessment. Checklist targets for questions without a specified list length are practice aids, not instructor-confirmed marks. The PDF's “Clarified” and other status labels are retained; no fresh legal or clinical claims are added.

Drafts save independently of multiple-choice progress. Editing a checked answer clears stale feedback and self-assessment. Learners can review answers marked “Needs more work,” reveal a model, clear an answer and export their written practice. Corrupt data and storage failures are handled; competing tabs prompt a reload rather than silently overwriting drafts.

## Validation

Run `npm install` and `npm test`. Checks cover original-source parity, level sizes and containment, complete and partial-round scoring, every PDF model's checklist, empty and unrelated responses, list-count duplicates, negation and reversed pairings, and page controls. Page checks use jsdom; they do not certify visual rendering or physical keyboard behavior in a live browser.
