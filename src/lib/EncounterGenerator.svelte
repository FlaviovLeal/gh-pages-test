<script>
    import { genEncounter } from "./genEncounter.js";
    import { displayDifficulty } from "./auxiliar.js"
    import { allElements } from "./data.js"
    import {settingObligatoryModule} from './settingsStore'

    let difficult = 10
    let moduleNumber = 2
    let encounterGenerated = false
    let encounter
    let solo = true

    function setEncounter(){
      encounter = genEncounter({difficulty:difficult, moduleNumber:moduleNumber, solo:solo, settingObligatoryModule: $settingObligatoryModule}, $allElements)
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
      <p>{#if $settingObligatoryModule} Modular sets {:else} Extra modular sets {/if}</p>
      <input type="range" bind:value={moduleNumber} min="0" max="10" class="slider" id="myRange">
      <p>{moduleNumber}</p>
      <button on:click={setEncounter}>Generate Encounter</button>
      <p>Number of players</p>
      <input type="checkbox" bind:checked={solo}>
      <p>{#if solo} Solo {:else} Multiplayer {/if}</p>



    {#if encounterGenerated}
    <p><b>Encounter Difficulty:</b> {encounter.calc_difficulty(solo)}</p>
    <p><b>Encounter:</b> {encounter.villain["name"] } - ({encounter.villain.set})</p>
    <p><b>Modules:</b></p>
    {#each encounter.module as module }
        <p>{module.name} - ({module.set})</p>
    {/each}
    <p><b>Modes:</b></p>
    {#each ['standard', 'expert', 'skirmish', 'heroic'] as mode }
    {#if !['No Skirmish','No Heroic','No Expert'].includes(encounter.adjustment[mode].name) }
    <p>{encounter.adjustment[mode].name}</p>
    {/if}
    {/each}
    {/if}

    </main>

    <style>

    </style>
