const data = {
  "course": {
    "HTML and CSS Tutorials": [
      {
        "title": "Learn HTML – Full Tutorial for Beginners (2022)",
        "chapter": [
          {
            "title": "Getting Started",
            "path": "https://github.com/sofaemha/freeCodeCamp/tree/master/course/HTML%20and%20CSS%20Tutorials/Learn%20HTML%20%E2%80%93%20Full%20Tutorial%20for%20Beginners%20(2022)/chapter%201"
          },
          {
            "title": "Head Element",
            "path": "https://github.com/sofaemha/freeCodeCamp/tree/master/course/HTML%20and%20CSS%20Tutorials/Learn%20HTML%20%E2%80%93%20Full%20Tutorial%20for%20Beginners%20(2022)/chapter%202"
          },
          {
            "title": "Text Basics",
            "path": "https://github.com/sofaemha/freeCodeCamp/tree/master/course/HTML%20and%20CSS%20Tutorials/Learn%20HTML%20%E2%80%93%20Full%20Tutorial%20for%20Beginners%20(2022)/chapter%203"
          },
          {
            "title": "List Types",
            "path": "https://github.com/sofaemha/freeCodeCamp/tree/master/course/HTML%20and%20CSS%20Tutorials/Learn%20HTML%20%E2%80%93%20Full%20Tutorial%20for%20Beginners%20(2022)/chapter%204"
          }
        ]
      },
      {
        "title": "Learn HTML & CSS – Full Course for Beginners",
        "chapter": []
      }
    ],
    "CSS3 in 30 Days": []
  }
}

const skeleton = {
  "h2": (data) => {
    return /*html*/`
      <h2 class="display-6 text-center mb-4">${data}</h2>
    `
  },
  "h3": (data) => {
    return /*html*/`
      <h3 class="text-center mb-4">${data}</h3>
    `
  },
  "div": (data) => {
    return /*html*/`
      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div id="chapter-list-${data}" class="list-group d-grid gap-2 border-0">
        </div>
      </div>
    `
  },
  "list": (data, index) => {
    return /*html*/`
      <a href="${data.path}" class="list-group-item list-group-item-light list-group-item-action rounded-3 py-3">
        Chapter ${index}
        <span class="d-block small opacity-50">${data.title}</span>
      </a>
    `
  }
}

function formatTitle(sentence) {
  return sentence.replace(/\s+/g, "_").toLowerCase()
}

function insertElement(id, data) {
  document.getElementById(id).innerHTML += data
}

function buildContent(key, value) {
  var section_id = formatTitle(key);
  insertElement(section_id, skeleton.h2(key))
  value.forEach(object => {
    var div_id = formatTitle(object.title)
    insertElement(section_id, skeleton.h3(object.title))
    if (object["chapter"].length === 0) return
    insertElement(section_id, skeleton.div(div_id))
    object["chapter"].forEach((item, index) => {
      insertElement(`chapter-list-${div_id}`, skeleton.list(item, (index+1)))
    })
  });
}

function Template(data) {
  for (const key in data) {
    var section_id = formatTitle(key);
    insertElement("content", /*html*/`<section id="${section_id}"></section>`)
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      buildContent(key, value)
    }
  }
}

(() => {
    Template(data.course)
})()
