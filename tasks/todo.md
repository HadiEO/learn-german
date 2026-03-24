# Vocabulary Website

## Plan

- [x] Inspect the repository and existing task notes.
- [x] Create a static GitHub Pages-friendly site structure.
- [x] Implement a printable vocabulary table layout.
- [x] Add a Bangla visibility toggle for pronunciation and meaning columns.
- [x] Seed the MVP with a representative starter vocabulary dataset.
- [x] Verify the site structure and behavior with local checks.
- [x] Document review notes and outcomes.
- [x] Expand the dataset significantly beyond the 56-word MVP.
- [x] Update the UI copy to show the real deck size versus the 1,000-word goal.
- [x] Re-verify the dataset count and preview behavior after the expansion.
- [x] Replace the partial deck with an exact 1,000-word total.
- [x] Expand the print rows selector to 10, 20, 30, 40, 50, ..., 100.
- [x] Re-verify the exact total count, page generation, and preview behavior after the full expansion.

## Review

- Built a no-build static site with `index.html`, `styles.css`, `app.js`, and `data.js`.
- Added print-oriented study sheets with repeated table headers, page counting, and rows-per-page control.
- Added a Bangla toggle that removes Bangla pronunciation and meaning columns before printing or studying.
- Seeded the MVP with 56 A2/B1 starter entries across home, people, food, travel, time, study, and communication vocabulary.
- Verified `app.js` syntax with `node --check app.js`.
- Verified `data.js` loads and exposes 56 entries with a Node VM check.
- Verified `index.html` references the expected assets and controls.
- Replaced the flaky detached Python preview server with a dedicated `server.js` Node static server.
- Confirmed `http://127.0.0.1:4173/`, `styles.css`, and `data.js` all respond with HTTP 200 and correct content types.
- Added `extra-data.js` with 160 additional generated entries, bringing the live deck total to 216 words.
- Updated the hero copy and metrics so the UI now shows the exact live deck size, the 1,000-word goal, and the current percentage progress.
- Re-verified with Node VM checks that the combined dataset count is `56 + 160 = 216`.
- Confirmed `http://127.0.0.1:4173/extra-data.js` responds with HTTP 200 from the local preview server.
- Added `full-data.js` with 784 additional entries, bringing the combined deck to exactly 1,000 words.
- Updated the print rows selector to `10, 20, 30, 40, 50, 60, 70, 80, 90, 100` with a new default of 20.
- Re-verified via Node VM checks that the combined total is `56 + 160 + 784 = 1,000`.
- Ran a runtime smoke test showing `1,000 words`, `100%` progress, `1,000` visible words, and `50` pages at the 20-row default.
- Confirmed `http://127.0.0.1:4173/full-data.js` responds with HTTP 200 from the local preview server.
