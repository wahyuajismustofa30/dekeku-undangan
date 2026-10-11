import { getUniqueId } from "https://cdn.jsdelivr.net/gh/wahyuajismustofa/dekeku@2e0e0138a771860121389aca5ce8e596ca72089a/assets/js/dom/utils.js";


function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// bikin options <select>
function renderOptions(options = [], value = "") {
  return options.map(opt => `
    <option value="${escapeHtml(opt.value)}" ${opt.value === value ? "selected" : ""}>
      ${escapeHtml(opt.label)}
    </option>
  `).join("");
}

// wrapper label
function renderLabel(name, label) {
  return label ? `<label for="${getUniqueId(name)}">${escapeHtml(label)}</label>` : "";
}

// render icon kiri
function renderIconLeft(iconClass) {
  return iconClass ? `
    <div class="input-group-prepend">
      <span class="input-group-text"><span class="${iconClass}"></span></span>
    </div>` : "";
}

// render icon kanan
function renderIconRight(iconClass) {
  return iconClass ? `
    <div class="input-group-append">
      <span class="input-group-text"><span class="${iconClass}"></span></span>
    </div>` : "";
}

function renderInputWrapper(input, innerFieldHtml) {
  return `
    <div class="form-group mb-4">
      ${renderLabel(input.name, input.label)}
      <div class="input-group">
        ${renderIconLeft(input.iconLeft)}
        ${innerFieldHtml}
        ${renderIconRight(input.iconRight)}
      </div>
      ${renderHelpText(input.name, input.helpText)}
    </div>
  `;
}

function renderHelpText(name, helpText) {
  return helpText 
    ? `<small id="${name}Help" class="form-text text-muted">${escapeHtml(helpText)}</small>` 
    : "";
}

function renderValueAttr(value) {
  return value ? `value="${escapeHtml(value)}"` : "";
}

function renderDescribedByAttr(name, helpText) {
  return helpText ? `aria-describedby="${name}Help"` : "";
}

function renderBasicInput(type, input) {
  return renderInputWrapper(input, `
    <input type="${type}" 
           class="form-control" 
           name="${input.name}" 
           id="${getUniqueId(input.name)}"
           placeholder="${input.placeholder || ""}" 
           ${renderValueAttr(input.value)} 
           ${renderDescribedByAttr(input.name, input.helpText)} />
  `);
}
// =====================
// Input Templates
// =====================
const inputTemplates = {
  // Basic input types
  text:      (input) => renderBasicInput("text", input),
  email:     (input) => renderBasicInput("email", input),
  number:    (input) => renderBasicInput("number", input),
  password:  (input) => renderBasicInput("password", input),
  url:       (input) => renderBasicInput("url", input),
  tel:       (input) => renderBasicInput("tel", input),
  search:    (input) => renderBasicInput("search", input),

  // Date & time inputs
  date:      (input) => renderBasicInput("date", input),
  datetime:  (input) => renderBasicInput("datetime-local", input),
  month:     (input) => renderBasicInput("month", input),
  week:      (input) => renderBasicInput("week", input),
  time:      (input) => renderBasicInput("time", input),

// File upload
file: (input) => renderInputWrapper(input, `
  <div class="custom-file">
    <input type="file"
           class="custom-file-input"
           name="${input.name}"
           id="${getUniqueId(input.name)}"
           ${input.accept ? `accept="${input.accept}"` : ""}
           ${input.multiple ? "multiple" : ""}
           ${renderDescribedByAttr(input.name, input.helpText)} />
    <label class="custom-file-label" for="${getUniqueId(input.name)}">
      ${input.placeholder || "Choose file"}
    </label>
  </div>
`),

// Checkbox
checkbox: (input) => `
  <div class="col-lg-3 col-md-6"><!-- Checkboxes -->
    <div class="mb-3">
      <span class="h6 font-weight-bold">${escapeHtml(input.label || "Checkboxes")}</span>
    </div>
    ${(input.options || []).map((opt, index) => {
      const id = getUniqueId(`${input.name}-${index}`);
      return `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" 
                 name="${input.name}" 
                 id="${id}" 
                 value="${opt.value || ""}" 
                 ${opt.checked ? "checked" : ""} 
                 ${opt.disabled ? "disabled" : ""} 
                 ${renderDescribedByAttr(input.name, input.helpText)} />
          <label class="form-check-label" for="${id}">
            ${escapeHtml(opt.label || "")}
          </label>
        </div>
      `;
    }).join("")}
  </div>
`,

  // Radio
radio: (input) => `
  <fieldset>
    <legend class="h6">${escapeHtml(input.label || "Radios")}</legend>
    ${(input.options || []).map((opt, index) => {
      const id = getUniqueId(`${input.name}-${opt.value}-${index}`);
      return `
        <div class="form-check">
          <input class="form-check-input" type="radio" 
                 name="${input.name}" 
                 id="${id}" 
                 value="${opt.value}" 
                 ${opt.value === input.value ? "checked" : ""} 
                 ${opt.disabled ? "disabled" : ""} 
                 ${renderDescribedByAttr(input.name, input.helpText)} />
          <label class="form-check-label" for="${id}">
            ${escapeHtml(opt.label || "")}
          </label>
        </div>
      `;
    }).join("")}
  </fieldset>
`,

  // Select
  select: (input) => renderInputWrapper(input, `
    <select class="form-control" 
            name="${input.name}" 
            id="${getUniqueId(input.name)}"
            ${renderDescribedByAttr(input.name, input.helpText)}>
      ${renderOptions(input.options, input.value)}
    </select>
  `),

  // Textarea
  textarea: (input) => renderInputWrapper(input, `
    <textarea class="form-control" 
              name="${input.name}" 
              id="${getUniqueId(input.name)}"
              rows="${input.rows || 3}"
              ${renderDescribedByAttr(input.name, input.helpText)}>${input.value || ""}</textarea>
  `),

// Range (slider) sesuai tema
range: (input) => {
  const min = input.min ?? 100;
  const max = input.max ?? 500;
  const lowValue = input.lowValue ?? 200;

  return `
<div class="input-slider-container">
  <div id="input-slider-forms" class="input-slider"
       data-range-value-min="${min}"
       data-range-value-max="${max}">
  </div>
  <!-- Input slider values -->
  <div class="row mt-3 d-none">
    <div class="col-6">
      <span class="range-slider-value" data-range-value-low="${lowValue}"></span>
    </div>
  </div>
</div>
  `;
},


  // Color picker
  color: (input) => renderBasicInput("color", input),

  // Hidden
  hidden: (input) => `
    <input type="hidden" 
           name="${input.name}" 
           value="${input.value || ""}" />
  `
};




export default inputTemplates;
