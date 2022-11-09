<script>
import CollectionConfig from './lib/CollectionConfig.svelte'
import EncounterGenerator from './lib/EncounterGenerator.svelte'
import Settings from './lib/Settings.svelte'
import About from './lib/About.svelte'
let page='EncounterGenerator'

</script>

<main>
  <div class="topnav"><nobr>
    <button class={page === 'EncounterGenerator' ? 'active' : 'inactive'} on:click={() => page='EncounterGenerator'}>Encounter Generator
    </button><button class={page === 'CollectionConfig' ? 'active' : 'inactive'} on:click={() => page='CollectionConfig'}>Collection Config
    </button><button class={page === 'Settings' ? 'active' : 'inactive'} on:click={() => page='Settings'}>Settings
    </button><button class={page === 'About' ? 'active' : 'inactive'} on:click={() => page='About'}>About</button>
  </nobr></div>
<br>

<br>

{#if page==='EncounterGenerator'}<EncounterGenerator/>{/if}
{#if page==='CollectionConfig'}<CollectionConfig/>{/if}
{#if page==='Settings'}<Settings/>{/if}
{#if page==='About'}<About/>{/if}
</main>

<style>

</style>
