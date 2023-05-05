const skeleton = {
  "h2": (data, _h3) => {
    return /*html*/`
      <a a href="#collapse-${_h3}" class="text-decoration-none link-body-emphasis" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapse-${_h3}">
        <h2 class="display-6 text-center mb-4">${data}</h2>
      </a>
    `
  },
  "h3": (data, _div, _h3) => {
    return /*html*/`
      <div id="collapse-${_h3}" class="collapse">
        <a href="#collapse-${_div}" class="text-decoration-none link-body-emphasis" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapse-${_div}">
          <h3 class="text-center mb-4">${data}</h3>
        </a>
      </div>
    `
  },
  "div": (data) => {
    return /*html*/`
      <div id="collapse-${data}" class="collapse mb-5">
        <div id="chapter-list-${data}" class="list-group d-grid gap-2 border-0 mx-auto"></div>
      </div>
    `
  },
  "list": (data, index) => {
    return /*html*/`
      <a href="${data.path}" target="_blank" class="list-group-item list-group-item-light list-group-item-action rounded-3 py-3">
        Chapter ${index}
        <span class="d-block small opacity-50">${data.title}</span>
      </a>
    `
  }
}

function setCollapseAttribute(data) {}

function formatTitle(sentence) {
  return sentence.replace(/\s+/g, "_").toLowerCase()
}

function insertElement(id, data) {
  document.getElementById(id).innerHTML += data
}

function buildContent(key, value) {
  var section_id = formatTitle(key);
  insertElement(section_id, skeleton.h2(key, section_id))
  value.forEach(object => {
    var div_id = formatTitle(object.title)
    insertElement(section_id, skeleton.h3(object.title, div_id, section_id))
    if (object["chapter"].length === 0) return
    insertElement(section_id, skeleton.div(div_id))
    object["chapter"].forEach((item, index) => {
      insertElement(`chapter-list-${div_id}`, skeleton.list(item, (index+1)))
    })
  });
}

export default function Template(data) {
  for (const key in data) {
    var section_id = formatTitle(key);
    insertElement("content", /*html*/`<section id="${section_id}"></section>`)
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      buildContent(key, value)
    }
  }
}

