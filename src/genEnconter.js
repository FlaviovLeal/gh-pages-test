import { allElements, extractType } from './data.js'

class Enconter {
  constructor () {
    this.villain = undefined
    this.module = []
    this.adjustment = undefined
  };

  calc_difficulty (solo) {
    return this.villain.getDifficulty(solo) + this.module.reduce((a, b) => a + b.getDifficulty(solo), 0) + this.adjustment.getDifficulty(solo)
  };

  addVillain (villain) { this.villain = villain };
  addModule (module) { this.module.push(module) };
  addAdjustment (adjustment) { this.adjustment = adjustment };
}

/**
 * Pick random element from list between target error.
 * Otherwise, closest element.
 */
function pickElement (elementList, target = undefined, error = undefined, solo) {
  let filteredList = []

  // Pick random target inside range
  if (target === undefined || error === undefined) {
    filteredList = elementList
  } else {
    filteredList.map(item => (item.getDifficulty(solo) >= target - error && item.getDifficulty(solo) <= target + error))
  }

  if (filteredList.length > 0) {
    return filteredList[Math.floor(Math.random() * filteredList.length)]
  }

  // Pick next best option
  let diff = Math.abs(target - elementList[0].getDifficulty(solo))
  let bestAdjustments = elementList[0]

  for (let i = 0; i < elementList.length; i++) {
    if (Math.abs(target - elementList[i].getDifficulty(solo)) < diff) {
      bestAdjustments = elementList[i]
      diff = target - elementList[i].getDifficulty(solo)
    }
  }
  return bestAdjustments
}

export function genEnconter (settings) {
  const difficulty = settings.difficulty
  const moduleNumber = settings.moduleNumber
  const solo = settings.solo
  const allModules = extractType(allElements, 'modules')
  const allAdjustments = extractType(allElements, 'adjustments')
  const allVillains = extractType(allElements, 'villain')
  const enconter = new Enconter()

  let maxAdjustment = allAdjustments[0].getDifficulty(solo)
  let minAdjustment = allAdjustments[0].getDifficulty(solo)
  for (let i = 0; i < allAdjustments.length; i++) {
    const adjustment = allAdjustments[i]
    if (adjustment.getDifficulty(solo) > maxAdjustment) { maxAdjustment = adjustment.getDifficulty(solo) }
    if (adjustment.getDifficulty(solo) < minAdjustment) { minAdjustment = adjustment.getDifficulty(solo) }
  }
  let filteredVillains = allVillains.filter(enconter => (enconter.getDifficulty(solo) <= difficulty + maxAdjustment && enconter.getDifficulty(solo) >= difficulty + minAdjustment))
  filteredVillains = filteredVillains.filter(villain => settings.solo === villain.solo)

  enconter.addVillain(pickElement(filteredVillains))

  for (let i = 0; i < Math.round(moduleNumber * 2 / 3); i++) {
    const index = Math.floor(Math.random() * allModules.length)
    enconter.addModule(allModules[index])
    allModules.splice(index, 1)
  }

  let target = difficulty - enconter.calc_difficulty()
  enconter.addAdjustment(pickElement(allAdjustments, target, 2))

  for (let i = 0; i < Math.round(moduleNumber * 1 / 3); i++) {
    target = difficulty - enconter.calc_difficulty()
    const module = pickElement(allModules, target, 2)
    const index = allModules.findIndex(i => i.name === module.name)

    enconter.addModule(module)
    allModules.splice(index, 1)
  }

  return enconter
}
