---
title: Glarewight
tags: [dnd, npc]
oneshot: "[[Oneshot 4 - Sunblind]]"
---

**Role:** Generic enemy
**Appears in:** Act 1 — [[Cooper's Row Ambush]]; Act 3 — [[Before Dawn]], [[Siege of Dunmore's Mill]]

```statblock
name: Glarewight
size: Medium
type: celestial
alignment: Unaligned
ac: 12
hp: 22
hit_dice: 5d8
speed: 40 ft., fly 40 ft. (hover)
stats: [6, 14, 12, 6, 10, 8]
source: ai-homebrew
cr: 1
skillsaves:
  - stealth: 4
damage_vulnerabilities: necrotic
damage_immunities: radiant
condition_immunities: exhaustion, frightened
senses: passive Perception 10
languages: understands Celestial but can't speak
traits:
  - name: Light-Bound Form
    desc: "The glarewight's defences depend on the light it occupies. **Bright light:** immune to bludgeoning, piercing, and slashing damage from nonmagical attacks, and it has a +2 bonus to Stealth checks. **Dim light:** resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks; it appears as a visible heat-haze shimmer and can't use Glare Stealth. **Darkness:** no special defences; it glows faintly, shedding dim light in a 5-foot radius. An attack counts as magical if it comes from a spell, a magic weapon, or a soot-blackened weapon."
  - name: Glare Stealth
    desc: "While in bright light, the glarewight can take the Hide action as a Bonus Action even while observed, succeeding automatically; its Stealth check total sets the DC to find it. This is camouflage, not magic: See Invisibility and truesight don't reveal it, but blindsight and tremorsense do, and a creature can take the Search action and make a Wisdom (Perception) check against that DC to pinpoint it. It stops being hidden when it attacks or leaves bright light."
  - name: Revealed
    desc: "If the glarewight is covered in flour, dust, ash, smoke, paint, or similar matter, or is outlined by Faerie Fire, it can't be hidden until the coating is removed (a creature can use an action to wash it off; a glarewight usually doesn't bother)."
  - name: Radiant Absorption
    desc: "Whenever the glarewight would take radiant damage, it instead regains hit points equal to the damage."
actions:
  - name: Searing Touch
    desc: "Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Radiant damage. The target must succeed on a DC 11 Constitution saving throw or have the Blinded condition until the end of its next turn and its Constitution score is reduced by 1 (sun sickness). A creature that succeeds on this save, or whose blindness ends, is immune to this blindness (but not the Constitution reduction) for 1 minute. A creature whose Constitution is reduced to 0 dies and rises as a glarewight at the next dawn unless buried properly before then."
bonus_actions:
  - name: Glare Stealth
    desc: The glarewight takes the Hide action (see Glare Stealth trait). Only in bright light.
```

## Tactics

Glarewights are fragments of a deva's light with a hunger for warmth and life, and very little mind. They fight like a flock of predatory birds:

- **Stay in the light.** A glarewight never willingly leaves bright light. If shoved, grappled or dragged into dim light or darkness, it spends its next turn trying to fly back into the sun.
- **Strike and vanish.** Each turn: move to a target in bright light, Searing Touch (with advantage while hidden), then Glare Stealth again.
- **Target priority:** whoever is standing in the sun; then whoever is blinded; then whoever is carrying a light source. They ignore anyone in darkness unless that creature attacks them.
- **Flee:** A glarewight reduced to 5 HP or less, or one that ends its turn in darkness, retreats toward the nearest bright light. They never flee bright light itself.
- **Radiant spells** are an invitation: glarewights drift *toward* whoever casts them.

**Tells to describe (fair warnings for players):** rippling heat haze where nothing is hot; dust motes flaring like sparks as one passes; frost melting in a patch for no reason; a stretch of ground slightly too bright, like a shadow cast in reverse; the cat staring at empty air.

**Sun sickness symptoms:** peeling, blistered skin; unquenchable thirst; no sweat. At 3 or more points of Constitution lost, the victim's skin glows faintly in darkness, which makes hiding harder. Lost Constitution returns on a long rest, or `dice: 1d4` points return when [[Mara Thatch]]'s night-time remedy is applied. Remember that lost Constitution can lower a PC's Constitution modifier, which lowers their maximum HP and their Constitution saves.
