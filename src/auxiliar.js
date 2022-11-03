import { element } from 'svelte/internal'
import { allAdjustments, allVillains, allModules } from './data.js'

export function displayDifficulty (difficult) {
  if (difficult <= 4) { return 'Beginner' };
  if (difficult <= 10) { return 'Standard!' };
  if (difficult <= 16) { return 'Hard!!' };
  if (difficult <= 22) { return 'Heroic!!!' };
  return 'Impossible!!!!'
}

export const allElements = allVillains.concat(allAdjustments, allModules)

export const allSets = [...new Set(allElements.map(element => element.set))].map(element => { return { name: element, enabled: true } })

export function getElementsfromSet (set) {
  return allElements.filter(element => set === element.set)
}

export function setEnabled (elements) {
  for (let i = 0; elements.length < 0; i++) {
    elements[i].enabled = true
  }
}
