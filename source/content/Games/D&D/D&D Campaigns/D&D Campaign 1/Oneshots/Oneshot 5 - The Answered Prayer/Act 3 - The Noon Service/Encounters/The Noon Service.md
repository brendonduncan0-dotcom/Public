---
title: The Noon Service
tags: [dnd, encounter]
oneshot: "[[Oneshot 5 - The Answered Prayer]]"
act: 3
type: combat
---

**Act:** 3 — [[Act 3 - The Noon Service]]
**Location:** [[The Sun Temple]]
**Encounter type:** Combat (Boss Phase 1)

> [!info] Read Aloud
> The sanctum is a furnace of light. Noon pours through three great lens-windows in the dome above, gathering into blazing shafts that cross on the altar, where a reliquary of mirrors and silver throws the light back out in a thousand needles. Long saffron banners hang beneath the east and west windows. Two lantern-stands blaze beside the altar. The pews are full of nothing: heat haze in rows, rippling gently, like a congregation breathing. On the floor before the altar, a pale glazed shape of two outspread wings. And above it, his feet not quite touching the stone, Father Aldric turns to you with his arms spread wide, white fire where his eyes should be. "Welcome," he says. "Oh, please. Please leave the light alone."

## Setup
This is Phase 1 of the finale. Aldric fights to protect the light; the party fights to make the sanctum dark. Use the **Light Level** track (see [[The Sun Temple]]): it starts at **6**. Put a d6 on the table showing the current Light Level; the players should see it fall.

**The six light sources:**

| # | Source | Ways to snuff it |
|---|---|---|
| 1 | East lens-window (sunbeam) | Cut the east banner's rope from the gallery (action) or with a ranged attack (AC 12); smash the lens (AC 13, 10 HP); pitch smoke pot (2 rounds); Darkness or Fog Cloud on the beam |
| 2 | West lens-window (sunbeam) | As east |
| 3 | South lens-window (above the doors) | No banner; smash the lens (AC 13, 10 HP), smoke pot, Darkness or Fog Cloud |
| 4 | North-east lantern stand | Snuff it (action, adjacent), knock it over (DC 12 Athletics), smash (AC 11, 5 HP), or cover with a soot cloth |
| 5 | North-west lantern stand | As north-east |
| 6 | The reliquary's mirror array | Cover it with a cloth (action, adjacent; DC 13 Sleight of Hand, or automatic with a soot cloth) or Darkness. Can't be destroyed in Phase 1. |

- **Aldric** relights lanterns (4 and 5) with Kindle and uses Guard the Light against anyone snuffing a source. He can't undo a cut banner, a smashed lens, or a covered reliquary.
- **The gallery:** a narrow wooden balcony along the east and west walls, reached by spiral stairs in the north-east and north-west corners. The banner ropes are tied off up there.
- **Glarewights** use the [[Glarewight]] stat block; their Light-Bound Form uses the local light: where Light Level is 4+ the whole sanctum is bright; at 2–3 the pews are dim; at 0–1 the sanctum is dark except where a source still burns.

**Allies (if earned):**
- **[[Hollis Wick]]**, if he was talked down in [[The Night Market Flare]], climbs to the gallery in round 2 and cuts one banner of the party's choice (Light −1). If he was humiliated, he's here kneeling beside Aldric and relights one lantern per round until stopped.
- **Captain** sits in the centre of the wing imprint, glowing faintly. Aldric will not attack the cat and is visibly distracted by it (Advantage on Twilight's Echo checks).

## Objectives
- Drive the Light Level down.
- Defeat Aldric, or talk him down (see Twilight's Echo in [[Aldric, the Radiant Revenant]]).

## Enemies
| Creature | CR | Count | Notes |
|---|---|---|---|
| [[Aldric, the Radiant Revenant]] | 4 | 1 | Protects the light; pleads while fighting; uses Kindle every turn |
| [[Glarewight]] | 1 | 2 | Roost in the pews; strike anyone snuffing a source |

**Terrain features:** See [[The Sun Temple]]. Pews give cover; the gallery gives height; the altar is raised two steps.

> [!tip] DM Note: Talking Him Down
> When the Light Level drops to 2 or less, describe Aldric faltering: the fire in his eyes gutters, his voice cracks, and he looks at them like a frightened old man. **This is the cue.** Any PC can use an action to plead with him (Twilight's Echo): DC 12 if he was reached at dawn, DC 20 if not. Saying "Ilvaris," showing the journal, or Captain at his feet each give Advantage. On a success, Aldric lowers his hands and whispers, "Help me let go." Go to the transition.

## The Transition

When Aldric drops to 0 HP **or** is talked down:

> [!info] Read Aloud
> Aldric's back arches. Light pours out of him, out of his mouth and eyes and hands, a river of noon flooding across the floor and up the altar steps into the reliquary. Every mirror on it shatters at once. The cracked crystal at its heart blazes, and the light *stands up*. It keeps rising, taller than the doorframe, taller than the banners, a shape of white fire with the ghost of wings, and a sound like a choir holding one note forever.

- **Talked down and reached:** Aldric tears the light out of himself on his own terms. He collapses, alive, burned, human. **The Relic starts with 90 HP instead of 120.**
- **Talked down, not reached:** Aldric collapses alive. The Relic starts at full HP.
- **Reduced to 0 HP:** Aldric is dying (see Last Light). The Relic starts at full HP.
- **Free moment:** every PC can take one free object interaction (re-coat a weapon, grab a smoke pot) before Phase 2 initiative.
- **Light Level carries over.** The reliquary is shattered, so source 6 is gone, but the Relic itself is now a source of light: it counts as **1 permanent source** that can't be snuffed.

Run [[The Relic Unbound]].

> [!warning] Scaling
> - **Party struggling:** Remove one glarewight; let Hollis or Captain act earlier; have Aldric hesitate for a whole round staring at Captain.
> - **Party cruising:** Aldric's Kindle can relight a lantern stand that was knocked over (a glarewight stands it back up).
> - **Retreat:** The party can always flee into the darkness of the garden porch. Aldric won't follow; he relights everything and resumes the service. The party can try again after a short rest.

## Initiative
```encounter
name: The Noon Service
creatures:
  - Aldric, the Radiant Revenant, 97, 15, 1
  - 2: Glarewight, 22, 12, 2
```
