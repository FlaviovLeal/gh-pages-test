import { allAdjustments, allVillains, allModules } from './data.js'

class Enconter {
  constructor () {
    this.villain = undefined
    this.module = []
    this.adjustment = undefined
  };

  calc_difficulty () {
    let difficulty = 0
    if (this.villain !== undefined) { difficulty = difficulty + this.villain.difficulty }
    for (let i = 0; i < this.module.length; i++) { difficulty = difficulty + this.module[i].difficulty }
    if (this.adjustment !== undefined) { difficulty = difficulty + this.adjustment.difficulty }
    return difficulty
  };

  addVillain (villain) { this.villain = villain };
  addModule (module) { this.module.push(module) };
  addAdjustment (adjustment) { this.adjustment = adjustment };
}

/**
 * Pick random element from list between target error.
 * Otherwise, closest element.
 * @param  {{difficulty: number}[]} elementList [List of objects with difficulty attribute]
 * @param  {number} target [target difficulty]
 * @param  {number} error [Acceptable error]
 * @return {object}      [Object]
 */
function pickElement (elementList, target = undefined, error = undefined) {
  let filteredList = []

  // Pick random target inside range
  if (target === undefined || error === undefined) {
    filteredList = elementList
  } else {
    filteredList.map(item => (item.difficulty >= target - error && item.difficulty <= target + error))
  }

  if (filteredList.length > 0) {
    return filteredList[Math.floor(Math.random() * filteredList.length)]
  }

  // Pick next best option
  let diff = Math.abs(target - elementList[0].difficulty)
  let bestAdjustments = elementList[0]

  for (let i = 0; i < elementList.length; i++) {
    if (Math.abs(target - elementList[i].difficulty) < diff) {
      bestAdjustments = elementList[i]
      diff = target - elementList[i].difficulty
    }
  }
  return bestAdjustments
}

export function genEnconter (settings) {
  const difficulty = settings.difficulty
  const moduleNumber = settings.moduleNumber
  const modulesCopy = [...allModules]
  const enconter = new Enconter()

  let maxAdjustment = allAdjustments[0].difficulty
  let minAdjustment = allAdjustments[0].difficulty
  for (let i = 0; i < allAdjustments.length; i++) {
    const adjustment = allAdjustments[i]
    if (adjustment.difficulty > maxAdjustment) { maxAdjustment = adjustment.difficulty }
    if (adjustment.difficulty < minAdjustment) { minAdjustment = adjustment.difficulty }
  }
  const filteredVillains = allVillains.filter(enconter => (enconter.difficulty <= difficulty + maxAdjustment && enconter.difficulty >= difficulty + minAdjustment))

  enconter.addVillain(pickElement(filteredVillains))

  for (let i = 0; i < Math.round(moduleNumber * 2 / 3); i++) {
    const index = Math.floor(Math.random() * modulesCopy.length)
    enconter.addModule(modulesCopy[index])
    modulesCopy.splice(index, 1)
  }

  let target = difficulty - enconter.calc_difficulty()
  enconter.addAdjustment(pickElement(allAdjustments, target, 2))

  for (let i = 0; i < Math.round(moduleNumber * 1 / 3); i++) {
    target = difficulty - enconter.calc_difficulty()
    const module = pickElement(modulesCopy, target, 2)
    const index = allModules.findIndex(i => i.name === module.name)

    enconter.addModule(module)
    modulesCopy.splice(index, 1)
  }

  return enconter
}
