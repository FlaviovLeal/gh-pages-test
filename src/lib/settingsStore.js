import { writable } from 'svelte/store'

export const settingObligatoryModule = writable(JSON.parse(window.localStorage.getItem('settingObligatoryModule') ?? 'false'))

settingObligatoryModule.subscribe(value => {
  console.log('Saving settingObligatoryModule to localStorage', value)
  window.localStorage.setItem('settingObligatoryModule', JSON.stringify(value))
})
