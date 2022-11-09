<script>
import {settingObligatoryModule} from './settingsStore'
</script>
<main>

<p>Include required modules in the module count
<input type="checkbox" bind:checked={$settingObligatoryModule}></p>
<p>{#if $settingObligatoryModule} Including required modules  {:else} Not including required modules {/if}</p>

</main>