# Super-quiz coverage

All 758 source question records are retained, including challenge extensions and Chapter 23 under main/. Flashcards and random exam subsets reuse these banks and are not additional questions. No deduplication removes distinct source records.

- Pre-learning: 155
- Chapter 3: 73
- Chapter 2: 47
- Chapter 4: 41
- Chapter 5: 55
- Chapter 10: 57
- Chapter 6: 150
- Chapter 13: 80
- Chapter 23: 100

Chapter attribution follows the existing apps, including their default chapter rules. coverage.json records every question, keyed answer, source locator, and source revision. The builder validates every ID, answer index, option set, explanation and source. Original wording, answer keys, source caveats and feedback are preserved.

This verifies complete inclusion of existing quiz banks; it does not certify full textbook coverage or independently validate medical/legal claims against current guidance. Refer to the repository source notes and original course materials for limits and instructor interpretation.

Strict full mode presents all questions without replacement. Answers remain hidden until final submission. Unanswered questions score zero, select-all answers need the exact set, and the practice target is 90% in every chapter and topic. This target is a practice rule, not an official pass mark. A passing result must include all 758 questions. Retry rounds do not replace the full result.

Progress and answer order are saved locally; the interface reports storage failures. Resume in the same browser. Rebuild from the repository root with node build-super-quiz.cjs.

