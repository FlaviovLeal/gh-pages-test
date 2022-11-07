<script>
    import { allSets, UpdateAllElementsFromSet } from "./auxiliar.js"
    import { allElements } from "./data.js"
    console.log($allElements.length)
    for (let i = 0; i < $allElements.length; i++){
      let localStorageEnableList = JSON.parse(localStorage.getItem('enabledHeroes') ?? '[]')
      if (localStorageEnableList.some(item => item.name === $allElements[i].name && item.type === $allElements[i].type)){
        $allElements[i].enabled = false
      }
    }


    function updateStorage () {
      let notEnabled = []
      for (let i = 0; i < $allElements.length; i++){
        if (!$allElements[i].enabled){
          notEnabled.push({name: $allElements[i].name, type: $allElements[i].type})
        }
      }
      console.log(JSON.stringify(notEnabled))
      localStorage.setItem('enabledHeroes', JSON.stringify(notEnabled))
    }

    </script>

    <main>
    <div>
      <button on:click={() => {updateStorage()} }> Save modifications </button><br>
      {#each ['standard','expert','skirmish'] as type}
      <b>Pick at least one</b><br>
      {#each $allElements as element}
        {#if element.type === type}
          {element.name} <input type="checkbox" bind:checked={element.enabled}><br>
        {/if}
      {/each}
      {/each}

      {#each allSets($allElements) as set}
      <b>{set.name} </b>
      <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, set.name, true)} }> select all </button>
      <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, set.name, false)} }> select none </button><br>
        {#each $allElements as element}
          {#if element.set === set.name && (element.type === 'villain' || element.type === 'module')}
            {element.name} <input type="checkbox" bind:checked={element.enabled}> <br>
          {/if}
        {/each}
      {/each}
    </div>

    </main>
    <style>
    </style>
