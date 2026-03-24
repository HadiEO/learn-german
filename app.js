const state = {
  showBangla: true,
  level: "all",
  rowsPerPage: 20
};

const banglaToggle = document.getElementById("bangla-toggle");
const levelFilter = document.getElementById("level-filter");
const rowsPerPage = document.getElementById("rows-per-page");
const printButton = document.getElementById("print-button");
const sheetContainer = document.getElementById("sheet-container");
const wordCount = document.getElementById("word-count");
const goalCount = document.getElementById("goal-count");
const progressCount = document.getElementById("progress-count");
const progressNote = document.getElementById("progress-note");
const visibleCount = document.getElementById("visible-count");
const pageCount = document.getElementById("page-count");
const viewMode = document.getElementById("view-mode");
const TARGET_WORD_COUNT = 1000;
const numberFormatter = new Intl.NumberFormat("en-US");

const curatedVocabulary = Array.isArray(window.vocabularyData) ? window.vocabularyData : [];
const extraVocabulary = Array.isArray(window.extraVocabularyData) ? window.extraVocabularyData : [];
const fullVocabulary = Array.isArray(window.fullVocabularyData) ? window.fullVocabularyData : [];
const vocabulary = [...curatedVocabulary, ...extraVocabulary, ...fullVocabulary];

wordCount.textContent = `${numberFormatter.format(vocabulary.length)} words`;
goalCount.textContent = `${numberFormatter.format(TARGET_WORD_COUNT)} words`;
progressCount.textContent = `${Math.round((vocabulary.length / TARGET_WORD_COUNT) * 100)}%`;
progressNote.textContent = `Currently loaded: ${numberFormatter.format(vocabulary.length)} words. Target: ${numberFormatter.format(TARGET_WORD_COUNT)} words.`;

banglaToggle.addEventListener("change", (event) => {
  state.showBangla = event.target.checked;
  renderSheets();
});

levelFilter.addEventListener("change", (event) => {
  state.level = event.target.value;
  renderSheets();
});

rowsPerPage.addEventListener("change", (event) => {
  state.rowsPerPage = Number(event.target.value);
  renderSheets();
});

printButton.addEventListener("click", () => {
  window.print();
});

function renderSheets() {
  const filtered = vocabulary.filter((entry) => {
    return state.level === "all" ? true : entry.level === state.level;
  });

  visibleCount.textContent = numberFormatter.format(filtered.length);
  viewMode.textContent = state.showBangla ? "Bangla enabled" : "Bangla hidden";

  if (!filtered.length) {
    pageCount.textContent = "0";
    sheetContainer.innerHTML = `
      <div class="empty-state">
        <h2>No words match this filter</h2>
        <p>Try switching the level filter back to "All levels".</p>
      </div>
    `;
    return;
  }

  const pages = chunk(filtered, state.rowsPerPage);
  pageCount.textContent = String(pages.length);

  sheetContainer.innerHTML = pages
    .map((entries, index) => createSheet(entries, index, pages.length))
    .join("");
}

function createSheet(entries, index, totalPages) {
  const categories = [...new Set(entries.map((entry) => entry.category))].join(", ");
  const levels = [...new Set(entries.map((entry) => entry.level))].join(", ");

  return `
    <article class="sheet">
      <div class="sheet-header">
        <div>
          <h2 class="sheet-title">Study Sheet ${index + 1}</h2>
          <p class="sheet-subtitle">${escapeHtml(categories)}</p>
          <p class="tagline">Levels: ${escapeHtml(levels)} • ${vocabulary.length}-word live deck on the path to ${numberFormatter.format(TARGET_WORD_COUNT)}</p>
        </div>
        <p class="sheet-page">Page ${index + 1} of ${totalPages}</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>German Word</th>
              <th>English Pronunciation</th>
              ${state.showBangla ? "<th>Bangla Pronunciation</th>" : ""}
              <th>English Meaning</th>
              ${state.showBangla ? "<th>Bangla Meaning</th>" : ""}
              <th>Example in Context</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map((entry) => createRow(entry)).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

function createRow(entry) {
  const pluralLine = entry.plural
    ? `<span class="word-meta">Plural: ${escapeHtml(entry.plural)}</span>`
    : `<span class="word-meta">${escapeHtml(entry.level)} • ${escapeHtml(entry.category)}</span>`;

  return `
    <tr>
      <td class="word-cell">
        <strong>${escapeHtml(entry.german)}</strong>
        ${pluralLine}
        <div class="badge-row">
          <span class="badge">${escapeHtml(entry.level)}</span>
          <span class="badge">${escapeHtml(entry.category)}</span>
        </div>
      </td>
      <td>${escapeHtml(entry.pronunciationEn)}</td>
      ${state.showBangla ? `<td>${escapeHtml(entry.pronunciationBn)}</td>` : ""}
      <td>${escapeHtml(entry.meaningEn)}</td>
      ${state.showBangla ? `<td>${escapeHtml(entry.meaningBn)}</td>` : ""}
      <td class="example-cell">
        <strong>${escapeHtml(entry.exampleDe)}</strong>
        <span>${escapeHtml(entry.exampleEn)}</span>
      </td>
    </tr>
  `;
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

renderSheets();
