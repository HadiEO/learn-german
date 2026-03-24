# MVP Vocabulary Website

## Plan

- [x] Inspect the repository and existing task notes.
- [x] Create a static GitHub Pages-friendly site structure.
- [x] Implement a printable vocabulary table layout.
- [x] Add a Bangla visibility toggle for pronunciation and meaning columns.
- [x] Seed the MVP with a representative starter vocabulary dataset.
- [x] Verify the site structure and behavior with local checks.
- [x] Document review notes and outcomes.

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
