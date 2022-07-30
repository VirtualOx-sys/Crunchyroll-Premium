const globalDefault = { 'webvideocaster': false, 'cooldown': false, 'aseguir': true, 'forcemp4': 5 }
const globalVariables = Object.keys(globalDefault)

chrome.storage.sync.get(globalVariables, function (items) {
  globalVariables.forEach(popupElement => {
    const value = items[popupElement] === undefined ? globalDefault[popupElement] : items[popupElement]
    setValue(popupElement, value)
  })
})

globalVariables.forEach(popupElement => {
  document.getElementById(popupElement).addEventListener("input", () => {
    let syncValue = {}
    syncValue[popupElement] = getValue(popupElement)

    chrome.storage.sync.set(syncValue);
  })
})

function getValue(id) {
  const element = document.getElementById(id)
  if (element.type === 'checkbox') return element.checked
  else return element.value
}

function setValue(id, value) {
  const element = document.getElementById(id)
  if (element.type === 'checkbox') element.checked = value
  else element.value = value
}
