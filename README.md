# HCA Study Arcade

## Comprehensive Super-Quiz

Open [the Super-Quiz](super-quiz/) for all 758 reviewed questions across pre-learning and Chapters 2, 3, 4, 5, 6, 10, 13 and 23. The editorial layer substantially revises 180 items, converts all binary items to four-choice questions, and retains source IDs and explanations. Answers stay hidden until submission. Progress saves locally; marking is exact, results show chapter and topic performance, and retries retain the latest full result. See [review notes](super-quiz/REVIEW.md) for the per-question register and content limits.

Development checks: npm install, then npm test. Run node build-super-quiz.cjs to regenerate the reviewed bank. No installation is needed to use the quiz.

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

