async function Data(property) {
  var array = []
  await fetch("./data.json")
    .then((response) => response.json())
    .then((json) => array.push(json))
  if (property in array[0]) return array[0][property]
  return {"error": "something went wrong"}
}

(() => {
  Data("iniData")
    .then((object) => console.log(object))
})()
