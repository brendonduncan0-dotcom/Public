---
title: The Relic of Ilvaris
tags: [dnd, npc]
oneshot: "[[Oneshot 5 - The Answered Prayer]]"
---

**Role:** Generic enemy (boss Phase 2)
**Appears in:** Act 3 — [[The Relic Unbound]]

```statblock
name: The Relic of Ilvaris
size: Large
type: celestial
alignment: Unaligned
ac: 15
hp: 120
hit_dice: 16d10 + 32
speed: 0 ft., fly 30 ft. (hover)
stats: [18, 14, 14, 8, 14, 18]
source: ai-homebrew
cr: 5
saves:
  - con: 5
  - wis: 5
damage_vulnerabilities: necrotic
damage_immunities: radiant
condition_immunities: blinded, charmed, exhaustion, frightened, prone
senses: passive Perception 12
languages: understands Celestial but can't speak
traits:
  - name: Hunger for Noon
    desc: "The Relic's defences depend on the sanctum's **Light Level**. **5 or more:** resistance to all damage except force, necrotic, and psychic, and it regains 10 hit points at the start of each of its turns. **3–4:** resistance to bludgeoning, piercing, and slashing damage, and it regains 5 hit points at the start of each of its turns. **1–2:** no resistances or regeneration. **0 (Starved):** its speed is halved, it has Disadvantage on attack rolls, and it can't use Eternal Noon."
  - name: Radiant Absorption
    desc: Whenever the Relic would take radiant damage, it instead regains hit points equal to the damage.
  - name: Anchored
    desc: The Relic can't leave the sanctum while the reliquary's crystal remains within it.
actions:
  - name: Multiattack
    desc: The Relic makes two Light Lash attacks.
  - name: Light Lash
    desc: "Melee Attack Roll: +7, reach 10 ft. Hit: 13 (2d8 + 4) Radiant damage."
  - name: Eternal Noon (Recharge 5–6)
    desc: "The Relic blazes like the summer sun. Each creature within 30 feet of it that is in bright light makes a DC 14 Constitution saving throw. Failure: 18 (4d8) Radiant damage and the Blinded condition until the end of its next turn. Success: half damage only. Then every snuffed lantern within 30 feet relights (maximum +2 Light Level)."
  - name: Tear the Dome
    desc: The Relic rips open a section of the dome above it, letting in a new shaft of noon sunlight. This creates a new light source (Light Level +1) that can be blocked only by smoke, magical darkness, or a cloth thrown over the opening from the gallery.
bonus_actions:
  - name: Kindle
    desc: The Relic relights one snuffed lantern or mirror-lantern stand within 60 feet, raising the Light Level by 1.
  - name: Draw the Light
    desc: "The Relic reaches for Captain, if Captain is within 60 feet and in bright light. Captain dims visibly; the Relic regains 15 hit points. After the third time, Captain's light fades entirely: the cat goes limp and still, and the patron's presence withdraws from Rook until the Relic is destroyed (see The Relic Unbound)."
```

## Tactics

The Relic is the caged deva-light twisted into pure hunger for eternal noon. It isn't evil so much as starving and frightened, and it wants to be *bright*.

- **Light first, enemies second.** Each turn it uses Kindle if any lantern is snuffed. If the Light Level is 2 or lower at the start of its turn, it uses Tear the Dome instead of attacking.
- **Eternal Noon** whenever it's recharged and two or more creatures are standing in bright light.
- **Draw the Light** on Captain whenever possible: Captain's light is the brightest thing in the room, and the Relic craves it. It ignores Captain only if Captain is in dim light or darkness.
- **Target priority for Light Lash:** whoever is smothering a light source, then whoever is protecting Captain, then whoever hit it hardest last round.
- **It never retreats.** If reduced to 0 hit points, it collapses inward into the cracked crystal on the altar, a faint pulse of light the size of a heartbeat. Run [[The Choice]].

**Describe it as:** a towering shape of white light, taller than the doorframe, roughly winged, with a face that keeps almost becoming kind and then losing it. Wherever it passes, wood bleaches silver-white and stone glazes like kiln-glass. It makes a sound like a choir holding one note forever.
