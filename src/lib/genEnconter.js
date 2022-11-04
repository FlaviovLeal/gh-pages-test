import { extractType } from './data.js'

class Enconter {
  constructor () {
    this.villain = undefined
    this.module = []
    this.adjustment = undefined
  };

  calc_difficulty (solo) {
    return this.villain.getDifficulty(solo) ?? 0 + this.module.reduce((a, b) => a + b.getDifficulty(solo), 0) ?? 0 + this.adjustment.getDifficulty(solo) ?? 0
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

export function genEnconter (settings, allElements) {
  const difficulty = settings.difficulty
  const moduleNumber = settings.moduleNumber
  const solo = settings.solo
  const enconter = new Enconter()
  allElements = allElements.filter(item => item.enabled)
  const allModules = extractType(allElements, 'module')
  const allAdjustments = extractType(allElements, 'adjustment')
  const allVillains = extractType(allElements, 'villain')

  let maxAdjustment = allAdjustments[0].getDifficulty(solo)
  let minAdjustment = allAdjustments[0].getDifficulty(solo)
  for (let i = 0; i < allAdjustments.length; i++) {
    const adjustment = allAdjustments[i]
    if (adjustment.getDifficulty(solo) >= maxAdjustment) { maxAdjustment = adjustment.getDifficulty(solo) }
    if (adjustment.getDifficulty(solo) <= minAdjustment) { minAdjustment = adjustment.getDifficulty(solo) }
  }
  const filteredVillains = allVillains.filter(enconter => (enconter.getDifficulty(solo) <= difficulty + maxAdjustment + 5 && enconter.getDifficulty(solo) >= difficulty + minAdjustment - 5))
  console.log(filteredVillains)
  enconter.addVillain(pickElement(filteredVillains))

  let moduleAdjustment
  if (maxAdjustment - minAdjustment < 8) { moduleAdjustment = 1 / 3 } else { moduleAdjustment = 2 / 3 }

  for (let i = 0; i < Math.round(moduleNumber * moduleAdjustment); i++) {
    const index = Math.floor(Math.random() * allModules.length)
    enconter.addModule(allModules[index])
    allModules.splice(index, 1)
  }
  let target = difficulty - enconter.calc_difficulty()
  enconter.addAdjustment(pickElement(allAdjustments, target, 2))

  for (let i = 0; i < Math.round(moduleNumber * (1 - moduleAdjustment)); i++) {
    target = difficulty - enconter.calc_difficulty()

    const module = pickElement(allModules, target, 2)
    const index = allModules.findIndex(i => i.name === module.name)

    enconter.addModule(module)
    allModules.splice(index, 1)
  }

  return enconter
}
