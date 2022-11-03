<script>
import { genEnconter } from "./genEnconter";

let difficult = 10
let moduleNumber = 2
let enconterGenerated = false
let enconter

function setEnconter(){
  enconter = genEnconter({"difficulty":difficult, 'moduleNumber':moduleNumber})
  enconterGenerated = true
}

function displayDifficulty(difficult){
  if (difficult <= 4){return 'Beginner'};
  if (difficult <= 10){return 'Standard!'};
  if (difficult <= 16){return 'Hard!!'};
  if (difficult <= 22){return 'Heroic!!!'};
  return 'Impossible!!!!';
}

$: textDifficulty = displayDifficulty(difficult)


</script>

<main>
<div>
  <p>Dificult setting</p>
  <input type="range" bind:value={difficult} min="1" max="30" class="slider" id="myRange">
  <p>{difficult}</p>
  <p>{textDifficulty}</p>

  <p>Module Number</p>
  <input type="range" bind:value={moduleNumber} min="1" max="10" class="slider" id="myRange">
  <p>{moduleNumber}</p>

  <button on:click={setEnconter}>Generate Enconter</button>
</div>

{#if enconterGenerated}
<p>Enconter: {enconter.villain["name"] + enconter.villain["solo"] }</p>
<p>Modules: {enconter.module.map(module=>module['name']).join(', ')}</p>
<p>Adjustment: {enconter.adjustment["name"]}</p>
<p>Enconter Difficulty: {enconter.calc_difficulty()}</p>
{/if}

</main>

<style>

</style>
