# HCA Study Arcade

## Comprehensive Super-Quiz

Open [the Super-Quiz](super-quiz/) for all 758 original questions across pre-learning and Chapters 2, 3, 4, 5, 6, 10, 13 and 23. Prompts, choices, correct answers and explanations match the repo before the super-quiz changes. The authored rewrites and added outside reference have been removed. Answers stay hidden until submission; progress saves locally, results show chapter and topic performance, and retries retain the latest full result. See [original-material verification](super-quiz/REVIEW.md) and the per-question source-parity register.

Choose Hardest 100, Broad 400 or Complete 758. The 400 set includes the 100 and all nine original study areas. A separate 80-question write-in section uses the supplied instructor-review PDF, with local key-point feedback, model answers, source labels and self-assessment; no API or internet connection is needed. See [study-mode notes](super-quiz/STUDY_MODES.md).

Development checks: npm install, then npm test. Run npm run build:quiz to regenerate the original bank, levels and PDF write-in data. No installation is needed to use the quiz.

A mobile-friendly, browser-based study aid based on the supplied **HCA Pre-Learning Package** PowerPoint (47 slides).

## Study modes

- **Practice quiz:** 155 multiple-choice questions across nine topic areas, with answer-specific feedback, slide references, and short memory cues.
- **Flashcards:** 155 prompt-and-answer cards drawn from the same slide-linked bank.
- **Review queue:** missed answers return immediately; correct retrieval schedules the next review after 1, 3, 7, then 14 days.
- **Exam simulation:** 45 questions randomly selected without replacement from the bank on each attempt, with shuffled options, navigation, score, and answer review.
- **Progress:** practice counts, accuracy, topic coverage, exam scores, known cards, and review dates stay in local browser storage. No student accounts or leaderboard.

## Source and accuracy notes

Each card and question identifies the source slide. The answer key follows the supplied course deck. Several statistics or broad statements are marked **slide-reported claim**; this means they are reproduced as claims made by the deck and are not independently verified by this app. No outside corrections have been inserted into the answer key. Follow instructors, placement policy, and current authoritative guidance for care practice.

The PowerPoint is not included in this repository. This is an independent practice resource, not an official assessment, clinical protocol, or substitute for instruction.

## Run locally

Open `index.html` in a modern browser. The site has no build step, external runtime dependencies, analytics, or network calls. Progress is saved locally in that browser.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the repository root on pushes to `main`. In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions** once, then the workflow will publish subsequent changes. The workflow exposes the deployed URL in the Pages deployment environment and Actions run.

## Contents

- `index.html` — app shell and navigation
- `app.js` — quizzes, flashcards, review scheduling, progress, and exam simulation
- `data.js` — slide-linked question/card bank
- `style.css` — responsive visual design
- `.github/workflows/pages.yml` — static Pages deployment

