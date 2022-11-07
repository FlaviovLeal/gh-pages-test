
export function displayDifficulty (difficult) {
  if (difficult <= 4) { return 'Beginner' };
  if (difficult <= 10) { return 'Standard!' };
  if (difficult <= 16) { return 'Hard!!' };
  if (difficult <= 22) { return 'Heroic!!!' };
  return 'Impossible!!!!'
}

export function allSets (elements) { return [...new Set(elements.map(element => element.set))].map(element => { return { name: element, enabled: true } }) }

export function getElementsfromSet (elements, set) {
  return elements.filter(element => set === element.set)
}

export function UpdateAllElementsFromSet (elements, set, enabled) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].set === set && elements[i].type !== 'standard' && elements[i].type !== 'expert' && elements[i].type !== 'skirmish') {
      elements[i].enabled = enabled
    }
  }
  return elements
}
