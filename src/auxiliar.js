import { allElements } from './data.js'

export function displayDifficulty (difficult) {
  if (difficult <= 4) { return 'Beginner' };
  if (difficult <= 10) { return 'Standard!' };
  if (difficult <= 16) { return 'Hard!!' };
  if (difficult <= 22) { return 'Heroic!!!' };
  return 'Impossible!!!!'
}

export const allSets = [...new Set(allElements.map(element => element.set))].map(element => { return { name: element, enabled: true } })

export function getElementsfromSet (set) {
  return allElements.filter(element => set === element.set)
}

export function UpdateAllElementsFromSet (set, enabled) {
  for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].set === set) { allElements[i].enabled = enabled }
  }
}

export function enableAllElementsFromSet (set) {
}
