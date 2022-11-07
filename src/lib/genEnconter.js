import { extractType } from './data.js'

class Enconter {
  constructor () {
    this.villain = undefined
    this.module = []
    this.adjustment = undefined
  };

  calc_difficulty (solo) {
    let villainDifficult
    let adjustmentDifficult
    if (this.villain !== undefined) { villainDifficult = this.villain.getDifficulty(solo) } else { villainDifficult = 0 }
    const moduleDifficult = this.module.reduce((previosValue, currentValue) => previosValue + currentValue.getDifficulty(solo), 0)
    if (this.adjustment !== undefined) { adjustmentDifficult = this.adjustment.getDifficulty(solo) } else { adjustmentDifficult = 0 }
    console.log('Dificuldade calculada vma', villainDifficult, moduleDifficult, adjustmentDifficult)
    return villainDifficult + moduleDifficult + adjustmentDifficult
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
  if (target !== undefined && error !== undefined) {
    console.log('Trying to find an ', elementList[0].constructor.name, 'error: ', error, 'target: ', target)

    filteredList = elementList
    filteredList = filteredList.filter(item => (item.getDifficulty(solo) >= target - error && item.getDifficulty(solo) <= target + error))
  }

  if (filteredList.length > 0) {
    console.log('random pick:', filteredList[0].type, filteredList.length)
    return filteredList[Math.floor(Math.random() * filteredList.length)]
  }

  console.log('best pick', elementList[0].type)
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

class AdjustmentPossibility {
  constructor (standard, expert, skirmish) {
    this.standard = standard
    this.expert = expert
    this.skirmish = skirmish
  }

  getDifficulty (solo) {
    return this.standard.difficulty + this.expert.difficulty + this.skirmish.difficulty
  }
}

function adjustmentPossibilities (allElements) {
  const adjustmentPossibilitiesList = []
  for (let standard = 0; standard < extractType(allElements, 'standard').length; standard++) {
    for (let expert = 0; expert < extractType(allElements, 'expert').length; expert++) {
      for (let skirmish = 0; skirmish < extractType(allElements, 'skirmish').length; skirmish++) {
        adjustmentPossibilitiesList.push(
          new AdjustmentPossibility(
            extractType(allElements, 'standard')[standard],
            extractType(allElements, 'expert')[expert],
            extractType(allElements, 'skirmish')[skirmish]
          )
        )
      }
    }
  }
  return adjustmentPossibilitiesList
}

export function genEnconter (settings, allElements) {
  const difficulty = settings.difficulty
  const moduleNumber = settings.moduleNumber
  const solo = settings.solo
  const enconter = new Enconter()
  allElements = allElements.filter(item => item.enabled)
  const allModules = extractType(allElements, 'module')
  const allVillains = extractType(allElements, 'villain')

  const adjustmentPossibilitiesList = adjustmentPossibilities(allElements)
  const maxAdjustment = Math.max(...adjustmentPossibilitiesList.map(item => item.getDifficulty(solo)))
  const minAdjustment = Math.min(...adjustmentPossibilitiesList.map(item => item.getDifficulty(solo)))
  console.log('maxAdjustment', maxAdjustment)
  console.log('minAdjustment', minAdjustment)

  let error = (maxAdjustment - minAdjustment) / 2
  let target = settings.difficulty - maxAdjustment + error
  if (error < 5) {
    error = 5
    target = difficulty
  }
  const villain = pickElement(allVillains, target, error, solo)
  enconter.addVillain(villain)
  console.log(villain.name, villain.getDifficulty(solo))

  let moduleAdjustment
  if (maxAdjustment - minAdjustment < 8) { moduleAdjustment = 1 / 3 } else { moduleAdjustment = 2 / 3 }

  for (let i = 0; i < Math.round(moduleNumber * moduleAdjustment); i++) {
    const index = Math.floor(Math.random() * allModules.length)
    console.log(allModules[index].name, allModules[index].getDifficulty(solo))
    enconter.addModule(allModules[index])
    allModules.splice(index, 1)
  }
  target = difficulty - enconter.calc_difficulty(solo)
  const adjustment = pickElement(adjustmentPossibilitiesList, target, 0, solo)
  enconter.addAdjustment(adjustment)
  console.log('adjustment', adjustment.getDifficulty(solo))

  for (let i = 0; i < Math.round(moduleNumber * (1 - moduleAdjustment)); i++) {
    console.log('Difficulty', difficulty)
    console.log('Enconter', enconter.calc_difficulty(solo))
    target = difficulty - enconter.calc_difficulty(solo)
    console.log('Target module')
    const module = pickElement(allModules, target, 1, solo)
    const index = allModules.findIndex(i => i.name === module.name)

    enconter.addModule(module)
    allModules.splice(index, 1)
    console.log(module.name, module.getDifficulty(solo))
  }
  return enconter
}
