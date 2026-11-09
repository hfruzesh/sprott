# Question quality and control review

All 758 prompts and choice sets were read for spelling, grammar, clarity and answer cues. 180 questions have substantive revisions. Every two-choice and true-or-false item is now a four-choice question. Eight select-all questions remain. Canadian spelling is standardized; strong existing scenarios and essential terminology recall are retained. Difficulty is a design intention, not a measured psychometric result.

editorial-overrides.json records authored revisions and reasons. editorial-review.json lists the disposition of every question. Original source records and IDs remain traceable. The builder rejects changed source prompts, unused overrides, invalid keys and duplicate choices. Rebuild with node build-super-quiz.cjs.

The original Chapter 5 living-will item made an overbroad claim about Canada. The super-quiz now tests the need to check a document and the applicable legal process rather than infer authority from its label. The revised explanation links to the [Public Guardian and Trustee of BC](https://www.trustee.bc.ca/adults/personal-planning-tools). The original chapter bank is retained as the source record; students should discuss the distinction with their instructor. This is not an independent legal or clinical audit of every course claim. Slide-reported figures remain explicitly attributed.

The revised interface updates progress on selection, validates saved question and option orders, rejects answers from older content revisions, guards rapid repeated navigation, supports keyboard operation, confirms submission and replacement within the page, paginates answer review, and retains the latest full result during retries. Save failures are shown. Old saved data remains untouched under its original storage key.
