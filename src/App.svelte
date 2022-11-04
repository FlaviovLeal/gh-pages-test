<script>
import CollectionConfig from './lib/CollectionConfig.svelte'
import EncounterGenerator from './lib/EncounterGenerator.svelte'
import About from './lib/About.svelte'
let page='EncounterGenerator'
function isActive (button) {if(page===button){return "active"}else{return "inactive"}}
</script>

<main>
  <div class="topnav">
    <button class={isActive('EncounterGenerator')} on:click={() => page='EncounterGenerator'}>Encounter Generator</button>
    <button class={isActive('CollectionConfig')} on:click={() => page='CollectionConfig'}>Collection Config</button>
    <button class={isActive('About')} on:click={() => page='About'}>About</button>
  </div>
<br>

{#if page==='EncounterGenerator'}
<EncounterGenerator/>
{/if}
{#if page==='CollectionConfig'}
<CollectionConfig/>
{/if}
{#if page==='About'}
<About/>
{/if}
</main>

<style>

</style>
