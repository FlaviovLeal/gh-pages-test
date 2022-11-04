<script>
    import { genEnconter } from "./genEnconter.js";
    import { displayDifficulty } from "./auxiliar.js"
    import { allElements } from "./data.js"

    let difficult = 10
    let moduleNumber = 2
    let enconterGenerated = false
    let enconter
    let solo = true

    function setEnconter(){
      enconter = genEnconter({difficulty:difficult, moduleNumber:moduleNumber, solo:solo}, $allElements)
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

    {#if enconterGenerated}
    <p>Enconter: {enconter.villain["name"] } - ({enconter.villain.set})</p>
    <p>Modules:</p>
    {#each enconter.module as module }
        <p>{module.name} - ({module.set})</p>
    {/each}
    <p>Adjustment: {enconter.adjustment["name"]}</p>
    <p>Enconter Difficulty: {enconter.calc_difficulty()}</p>
    {/if}

    </main>

    <style>

    </style>
