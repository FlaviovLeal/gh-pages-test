import {allAdjustments, allEnconters, allModules} from "./data.js"


export function genEnconter(settings) {
    let difficulty = settings['difficulty']
    let moduleNumber = settings['moduleNumber']
    let modulesCopy = [...allModules]

    let max_adjustment = allAdjustments[0]['difficulty']
    let min_adjustment = allAdjustments[0]['difficulty']
    for (var i = 0; i < allAdjustments.length; i++)  {
        let adjustment = allAdjustments[i]
        if (adjustment['difficulty'] > max_adjustment) {max_adjustment = adjustment['difficulty']}
        if (adjustment['difficulty'] < min_adjustment) {min_adjustment = adjustment['difficulty']}
    }
    let filteredEnconters = allEnconters.filter(enconter => (enconter['difficulty'] <= difficulty + max_adjustment && enconter['difficulty'] >= difficulty + min_adjustment))

    const enconter = filteredEnconters[Math.floor(Math.random() * filteredEnconters.length)]

    let modules = []
    for( i = 0; i < moduleNumber; i++){
        let index = Math.floor(Math.random() * modulesCopy.length)
        modules.push(modulesCopy[index]) ;
        modulesCopy.splice(index,1)
    }

    let modules_difficulty = modules.reduce((a, b) => a + b['difficulty'], 0)
    console.log(difficulty)
    console.log("current", modules_difficulty + enconter['difficulty'])
    console.log("target_diff", modules_difficulty + enconter['difficulty'] - difficulty)
    


    let diff = Math.abs(allAdjustments[0]["difficulty"] + modules_difficulty + enconter['difficulty'] - difficulty) ;
    let bestAdjustments = allAdjustments[0];

    for (i = 0; i < allAdjustments.length; i++){
        console.log(
            allAdjustments[i]['name'], 
            diff,
            allAdjustments[i]["difficulty"],

            Math.abs(allAdjustments[i]["difficulty"] + modules_difficulty + enconter['difficulty'] - difficulty)
        )
        if (Math.abs(allAdjustments[i]["difficulty"] + modules_difficulty + enconter['difficulty'] - difficulty)  < diff) {bestAdjustments = allAdjustments[i]}
    }

    return {
      "Enconter":enconter,
      "Modules": modules,
      "Adjustment":bestAdjustments
    }
}

