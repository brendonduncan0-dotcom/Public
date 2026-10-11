---
title: Aldric, the Radiant Revenant
tags: [dnd, npc]
oneshot: "[[Oneshot 5 - The Answered Prayer]]"
act: 2
---

**Role:** Villain (tragic; boss Phase 1)
**First appears:** Act 2
**Location:** [[Ilvaris's Field]] (dawn); [[The Sun Temple]] (noon)

## Personality
- At noon: radiant, serene and immovable, a shepherd defending his flock and his "light" with sorrowful, absolute conviction
- At twilight: frightened, ashamed and painfully honest; a man with minutes to confess before he loses himself again
- Always: he loves Gildenfield, and he still believes, somewhere, that he did it for them

## Appearance
In the sanctum at noon, Aldric is a silhouette of white fire in saffron robes, his eyes two points of light, his feet not quite touching the floor.

## Motivation
See [[Father Aldric]] for his history and routine. By this point, the deva-light inside him is close to overwhelming him. At noon he wants only to protect the light: keep the lamps lit, keep the windows bright, keep the reliquary safe. He pleads with the party to "leave the light alone" even as he fights them.

At twilight, he wants the opposite: for someone to stop him. He'll tell the party everything he knows (see [[The Twilight Confession]]).

## Secret
Aldric is holding back most of the deva-light by sheer will. He doesn't fully know it, but when he falls, the light he has been containing pours out into the reliquary and becomes [[The Relic of Ilvaris]], something far worse than him. If he is reached at twilight and talked down rather than killed, he can choose to tear the light out of himself on his own terms, weakening the entity, and survive as a burned, humbled, ordinary man.

## Stat Block

```statblock
name: Aldric, the Radiant Revenant
size: Medium
type: celestial
alignment: Lawful Good
ac: 15
hp: 97
hit_dice: 13d8 + 39
speed: 30 ft., fly 30 ft. (hover)
stats: [12, 12, 16, 12, 18, 16]
source: ai-homebrew
cr: 4
saves:
  - con: 5
  - wis: 6
  - cha: 5
damage_immunities: radiant
condition_immunities: blinded, frightened
senses: passive Perception 14
languages: Common, Celestial
traits:
  - name: Vessel of Ilvaris
    desc: "Aldric's defences depend on the sanctum's **Light Level** (the number of lit light sources; see The Sun Temple). **5–6 (Blazing):** resistance to all damage except force and necrotic, and Sunflare recharges on a 4–6. **3–4 (Bright):** resistance to bludgeoning, piercing, and slashing damage. **1–2 (Dimmed):** no resistances; his lucidity surfaces (see Twilight's Echo). **0 (Dark):** no resistances, and he has Disadvantage on attack rolls."
  - name: Radiant Absorption
    desc: Whenever Aldric would take radiant damage, he instead regains hit points equal to the damage.
  - name: Twilight's Echo
    desc: "While the Light Level is 2 or lower, a creature within 30 feet that Aldric can hear can take an action to plead with him, making a Charisma (Persuasion) check: DC 12 if the party reached him at twilight, DC 20 otherwise. On a success, Aldric stops fighting and Phase 2 begins (see The Noon Service). Saying the name Ilvaris, showing his journal, or Captain's presence each grant Advantage on this check (maximum once each per fight)."
  - name: Last Light
    desc: When Aldric drops to 0 hit points or stops fighting, the reliquary shatters and the light in him pours out to form the Relic of Ilvaris. If he was talked down, he survives, unconscious. If he was reduced to 0 hit points, he is dying; he can be stabilised, but he never wakes unless Ilvaris is freed.
actions:
  - name: Multiattack
    desc: Aldric makes two Searing Palm or Sunbeam attacks.
  - name: Searing Palm
    desc: "Melee Attack Roll: +6, reach 5 ft. Hit: 11 (2d6 + 4) Radiant damage, and the target must succeed on a DC 13 Constitution saving throw or have the Blinded condition until the end of its next turn."
  - name: Sunbeam
    desc: "Ranged Attack Roll: +6, range 60 ft. Hit: 13 (2d8 + 4) Radiant damage."
  - name: Sunflare (Recharge 5–6)
    desc: "Light erupts from Aldric. Each creature within 15 feet of him makes a DC 14 Constitution saving throw. Failure: 13 (3d8) Radiant damage and the Blinded condition until the end of its next turn. Success: half damage only. This ignores any immunity to blindness granted by a glarewight's Searing Touch."
bonus_actions:
  - name: Kindle
    desc: Aldric relights one snuffed lantern or mirror-lantern stand within 30 feet of him, raising the Light Level by 1. He can't restore a covered window, a fallen banner, or a covered reliquary.
reactions:
  - name: Guard the Light
    desc: When a creature within 30 feet that Aldric can see takes an action to snuff, cover, or break a light source, Aldric moves up to half his speed toward it without provoking Opportunity Attacks, then makes one Searing Palm attack against it if it is within reach.
```

## Tactics

- **Protect the light, not himself.** Aldric's priority is always the creature trying to darken the room. He uses Guard the Light every round it's available and Kindle every turn there's a snuffed lantern within 30 feet.
- **Plead while fighting.** Every turn, give him a line: "Please, leave the light alone." "It keeps them safe." "Don't you see how beautiful it is?" As the Light Level drops, his lines become more frightened and more himself: "I can't — it's so loud — *Ilvaris*, I'm sorry —"
- **Sunflare** when two or more enemies are within 15 feet, especially anyone carrying soot cloth or smoke pots.
- **He never targets Captain.** If Captain is present, Aldric avoids it and occasionally stares at it, distracted, which gives the party an opening.
- **He doesn't flee.** He has nowhere else to be.
