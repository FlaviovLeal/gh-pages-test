<script>
import { genEnconter } from "./genEnconter";
import { displayDifficulty, allSets, getElementsfromSet, UpdateAllElementsFromSet } from "./auxiliar"
import { allElements } from "./data.js"
    import { element } from "svelte/internal";

let difficult = 10
let moduleNumber = 2
let enconterGenerated = false
let enconter
let solo = true

function setEnconter(){
  enconter = genEnconter({difficulty:difficult, moduleNumber:moduleNumber, solo:solo})
  enconterGenerated = true
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
  <p>Number of players</p>
  <input type="checkbox" bind:checked={solo}>
  <p>{#if solo} Solo {:else} Multiplayer {/if}</p>

  {#each allSets($allElements) as set}
  <b>{set.name}</b>
  <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, true)} }> select all </button>
  <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, false)} }> select none </button><br>
    {#each $allElements as element}
      {#if element.set === set.name}
        {element.name} <input type="checkbox" bind:checked={element.enabled}><br>
      {/if}
    {/each}
  {/each}
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
