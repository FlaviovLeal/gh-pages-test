import { writable } from 'svelte/store'

class EncounterElement {
  constructor (type, set, name, difficulty, difficultyMultiplayer, difficultySolo, obligatoryModules) {
    this.type = type
    this.set = set
    this.name = name
    this.difficulty = difficulty
    this.difficultyMultiplayer = difficultyMultiplayer
    this.difficultySolo = difficultySolo
    this.enabled = true
    this.obligatoryModules = obligatoryModules ?? []
  };

  getDifficulty (solo) {
    if (this.difficulty !== undefined) { return this.difficulty } else {
      if (solo) { return this.difficultySolo } else { return this.difficultyMultiplayer }
    }
  }
};

export function extractType (elementList, type) {
  return elementList.filter(item => item.type === type)
}

export const allElements = writable([
  new EncounterElement('villain', 'Core Set', 'Rhino', undefined, 6, 0),
  new EncounterElement('villain', 'Core Set', 'Klaw', undefined, 10, 3),
  new EncounterElement('villain', 'Core Set', 'Ultron', undefined, 9, 12),
  new EncounterElement('villain', 'Wrecking Crew', 'Wrecking Crew', undefined, -2, 2),
  new EncounterElement('villain', 'Green Goblin', 'Risky Business', undefined, 0, -1),
  new EncounterElement('villain', 'Green Goblin', 'Mutagen Formula', undefined, 11, 10),
  new EncounterElement('villain', 'Rise of Red Skull', 'Crossbones', undefined, 3, 0, ['Experimental Weapons']),
  new EncounterElement('villain', 'Rise of Red Skull', 'Absorbing Man', undefined, 2, -1),
  new EncounterElement('villain', 'Rise of Red Skull', 'Taskmaster', undefined, 4, 5, ['Hydra Patrol']),
  new EncounterElement('villain', 'Rise of Red Skull', 'Zola', undefined, 14, 9),
  new EncounterElement('villain', 'Rise of Red Skull', 'Red Skull', undefined, 14, 16),
  new EncounterElement('villain', 'Kang', 'Kang', undefined, 10, 9),
  new EncounterElement('villain', "Galaxy's Most Wanted", 'Brotherhood of Badoon', undefined, -1, 6, ['Ship Command']),
  new EncounterElement('villain', "Galaxy's Most Wanted", 'Infiltrate the Museum', undefined, 10, 8, ['Galactic Artifacts']),
  new EncounterElement('villain', "Galaxy's Most Wanted", 'Escape the Museum', undefined, 8, 10, ['Galactic Artifacts', 'Ship Command']),
  new EncounterElement('villain', "Galaxy's Most Wanted", 'Nebula', undefined, 13, 16, ['Ship Command']),
  new EncounterElement('villain', "Galaxy's Most Wanted", 'Ronan the Accuser', undefined, 23, 22, ['Ship Command']),
  new EncounterElement('villain', "Mad Titan's Shadow", 'Ebony Maw', undefined, 5, 9),
  new EncounterElement('villain', "Mad Titan's Shadow", 'Tower Defense', undefined, -2, -1),
  new EncounterElement('villain', "Mad Titan's Shadow", 'Thanos', undefined, 3, 4),
  new EncounterElement('villain', "Mad Titan's Shadow", 'Hela', undefined, 5, 3),
  new EncounterElement('villain', "Mad Titan's Shadow", 'Loki', undefined, 13, 13, ['Infinity Gauntlet']),
  new EncounterElement('villain', 'The Hood', 'The Hood', undefined, 6, 6),
  new EncounterElement('villain', 'Sinister Motives', 'Sandman', undefined, 3, 0, ['City in Chaos']),
  new EncounterElement('villain', 'Sinister Motives', 'Venom', undefined, 12, 1, ['Symbiotic Strength']),
  new EncounterElement('villain', 'Sinister Motives', 'Mysterio', undefined, -2, -3, ['Personal Nightmare']),
  new EncounterElement('villain', 'Sinister Motives', 'The Sinister Six', undefined, 6, 2),
  new EncounterElement('villain', 'Sinister Motives', 'Venom Goblin', undefined, 12, 15, ['Symbiotic Strength']),
  new EncounterElement('module', 'Core Set', 'Bomb Scare', -3),
  new EncounterElement('module', 'Core Set', 'Masters of Evil', 1),
  new EncounterElement('module', 'Core Set', 'Under Attack', 1),
  new EncounterElement('module', 'Core Set', 'Legions of Hydra', 4),
  new EncounterElement('module', 'Core Set', 'Doomsday Chair', 3),
  new EncounterElement('module', 'Green Goblin', 'Goblin Gimmicks', -4),
  new EncounterElement('module', 'Green Goblin', 'Mess of Things', 0),
  new EncounterElement('module', 'Green Goblin', 'Power Drain', -3),
  new EncounterElement('module', 'Green Goblin', 'Running Interference', -1),
  new EncounterElement('module', 'Green Goblin', 'Kree Fanatic', 8),
  new EncounterElement('module', 'Rise of Red Skull', 'Experimental Weapons', -2),
  new EncounterElement('module', 'Rise of Red Skull', 'Hydra Assault', -2),
  new EncounterElement('module', 'Rise of Red Skull', 'Hydra Patrol', -1),
  new EncounterElement('module', 'Rise of Red Skull', 'Weapon Master', 0),
  new EncounterElement('module', 'Kang', 'Temporal', -3),
  new EncounterElement('module', 'Kang', 'Master of Time', 0),
  new EncounterElement('module', 'Kang', 'Anachronauts', 1),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Band of Badoon', -3),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Menagerie Medley', 3),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Galactic Artifacts', 0),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Space Pirates', -1),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Kree Militants', -3),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Ship Command', 0),
  new EncounterElement('module', "Galaxy's Most Wanted", 'Badoon Headhunter', -2),
  new EncounterElement('module', "Mad Titan's Shadow", 'Black Order', 1),
  new EncounterElement('module', "Mad Titan's Shadow", 'Armies of Titan', -3),
  new EncounterElement('module', "Mad Titan's Shadow", 'Children of Thanos', 3),
  new EncounterElement('module', "Mad Titan's Shadow", 'Legions of Hel', -2),
  new EncounterElement('module', "Mad Titan's Shadow", 'Frost Giants', 3),
  new EncounterElement('module', "Mad Titan's Shadow", 'Enchantress', 6),
  new EncounterElement('module', "Mad Titan's Shadow", 'Infinity Gauntlet', 7),
  new EncounterElement('module', 'The Hood', 'Beasty Boys', 1),
  new EncounterElement('module', 'The Hood', 'Brothers Grimm', 1),
  new EncounterElement('module', 'The Hood', "Crossfire's Crew", 2),
  new EncounterElement('module', 'The Hood', 'Mister Hyde', -3),
  new EncounterElement('module', 'The Hood', 'Ransacked Armory', -3),
  new EncounterElement('module', 'The Hood', 'Sinister Syndicate', 0),
  new EncounterElement('module', 'The Hood', 'State of Emergency', 0),
  new EncounterElement('module', 'The Hood', 'Streets of Mayhem', 2),
  new EncounterElement('module', 'The Hood', 'Wrecking Crew', 2),
  new EncounterElement('module', 'Sinister Motives', 'City in Chaos', 4),
  new EncounterElement('module', 'Sinister Motives', 'Down to Earth', -2),
  new EncounterElement('module', 'Sinister Motives', 'Goblin Gear', 5),
  new EncounterElement('module', 'Sinister Motives', 'Guerrilla Tactics', 2),
  new EncounterElement('module', 'Sinister Motives', 'Osborn Tech', 0),
  new EncounterElement('module', 'Sinister Motives', 'Personal Nightmare', 2),
  new EncounterElement('module', 'Sinister Motives', 'Symbiotic Strength', 4),
  new EncounterElement('module', 'Sinister Motives', 'Whispers of Paranoia', 4),
  new EncounterElement('module', 'Hero Packs', 'Armadillo', 2),
  new EncounterElement('module', 'Hero Packs', 'Zzzax', -1),

  new EncounterElement('standard', 'Core Set', 'Standard I', 0),
  new EncounterElement('standard', 'The Hood', 'Standard II', 7),

  new EncounterElement('expert', 'Core Set', 'No Expert set', 0),
  new EncounterElement('expert', 'Core Set', 'Expert I', 5),
  new EncounterElement('expert', 'The Hood', 'Expert II', 14),

  // new EncounterElement('heroic', 'Core Set', 'Heroic', 9),

  new EncounterElement('skirmish', 'Core Set', 'No Skirmish', 0),
  new EncounterElement('skirmish', 'Core Set', 'Skirmish Level 1', -16),
  new EncounterElement('skirmish', 'Core Set', 'Skirmish Level 2', -6)
])
