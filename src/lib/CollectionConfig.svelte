<script>
    import { allSets, UpdateAllElementsFromSet } from "./auxiliar.js"
    import { allElements } from "./data.js"


    </script>

    <main>
    <div>
      {#each allSets($allElements) as set}
      <b>{set.name}</b>
      <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, set.name, true)} }> select all </button>
      <button on:click={() => {$allElements = UpdateAllElementsFromSet($allElements, set.name, false)} }> select none </button><br>
        {#each $allElements as element}
          {#if element.set === set.name}
            {element.name} <input type="checkbox" bind:checked={element.enabled}><br>
          {/if}
        {/each}
      {/each}
    </div>

    </main>
    <style>
    </style>
