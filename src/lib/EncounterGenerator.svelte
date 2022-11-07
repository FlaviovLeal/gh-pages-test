<script>
    import { genEncounter } from "./genEncounter.js";
    import { displayDifficulty } from "./auxiliar.js"
    import { allElements } from "./data.js"

    let difficult = 10
    let moduleNumber = 2
    let encounterGenerated = false
    let encounter
    let solo = true

    function setEncounter(){
      encounter = genEncounter({difficulty:difficult, moduleNumber:moduleNumber, solo:solo}, $allElements)
      encounterGenerated = true
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
      <button on:click={setEncounter}>Generate Encounter</button>
      <p>Number of players</p>
      <input type="checkbox" bind:checked={solo}>
      <p>{#if solo} Solo {:else} Multiplayer {/if}</p>

    {#if encounterGenerated}
    <p>Encounter: {encounter.villain["name"] } - ({encounter.villain.set})</p>
    <p>Modules:</p>
    {#each encounter.module as module }
        <p>{module.name} - ({module.set})</p>
    {/each}
    <p>Mode: {encounter.adjustment.standard.name}</p>
    <p>Mode: {encounter.adjustment.expert.name}</p>
    <p>Mode: {encounter.adjustment.skirmish.name}</p>
    <p>Encounter Difficulty: {encounter.calc_difficulty(solo)}</p>
    {/if}

    </main>

    <style>

    </style>
