# Super-quiz coverage

All 758 original question IDs are represented, including the challenge extensions and Chapter 23 under main/. Flashcards and random exam subsets reuse these banks and are not extra questions.

- Pre-learning: 155
- Chapter 3: 73
- Chapter 2: 47
- Chapter 4: 41
- Chapter 5: 55
- Chapter 10: 57
- Chapter 6: 150
- Chapter 13: 80
- Chapter 23: 100

All prompts and choice sets were reviewed for grammar, spelling, clarity and answer cues. The current super-quiz applies an editorial layer to the original source banks. See [question quality review](REVIEW.md), editorial-overrides.json and editorial-review.json for the authored revisions and the disposition of every question. Strong existing scenarios and essential terminology questions are retained.

coverage.json records the current answer keys, content revision, source locators and SHA-256 digests of the input files. Chapter attribution follows the existing apps. This verifies inclusion of every existing question; it does not establish complete textbook coverage or independently certify all clinical and legal course claims. Slide-reported figures remain attributed.

The full quiz presents every question once in shuffled order. Answers remain hidden until submission; unanswered questions earn zero, and select-all questions require the exact set. The practice target is 90% in every chapter and topic. Focused and retry rounds cannot earn the full-coverage pass. This target is not an official pass mark.

Progress and option order save in the current browser. Stored attempts are checked against the current content revision; older answers are not silently graded against revised wording. The latest full result remains available during retries. Storage errors are reported.

Rebuild from the repository root with node build-super-quiz.cjs. For checks, install the development dependency with npm install, then run npm test. The quiz itself has no runtime dependencies or build requirement.
