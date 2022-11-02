<script>
import { genEnconter } from "./genEnconter";

let difficult = 10
let moduleNumber = 2
let enconterGenerated = false
let Enconter = {}
let Modules = {}
let Adjustment = {}

function setEnconter(){
  let enconterJson = genEnconter({"difficulty":difficult, 'moduleNumber':moduleNumber})
  console.log(enconterJson)
  enconterGenerated = true
  Enconter = enconterJson["Enconter"]
  Modules = enconterJson["Modules"]
  Adjustment = enconterJson["Adjustment"]

}

</script>

<main>
<div>
  <p>Dificult setting</p>
  <input type="range" bind:value={difficult} min="1" max="40" class="slider" id="myRange">
  <p>{difficult}</p>

  <p>Module Number</p>
  <input type="range" bind:value={moduleNumber} min="1" max="10" class="slider" id="myRange">
  <p>{moduleNumber}</p>

  <button on:click={setEnconter}>Generate Enconter</button>
</div>

{#if enconterGenerated}
<p>Enconter: {Enconter["name"] + Enconter["solo"] }</p>
<p>Modules: {Modules.map(module=>module['name']).join(', ')}</p>
<p>Adjustment: {Adjustment["name"]}</p>
<p>Enconter Difficulty: {Enconter['difficulty'] + Modules.reduce((a, b) => a + b['difficulty'], 0) + Adjustment['difficulty']}</p>
{/if}

</main>

<style>

</style>
