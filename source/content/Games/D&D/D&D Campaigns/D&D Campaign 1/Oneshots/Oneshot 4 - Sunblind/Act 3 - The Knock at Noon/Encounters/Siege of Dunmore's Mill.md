---
title: Siege of Dunmore's Mill
tags: [dnd, encounter]
oneshot: "[[Oneshot 4 - Sunblind]]"
act: 3
type: combat
---

**Act:** 3 — [[Act 3 - The Knock at Noon]]
**Location:** [[Dunmore's Mill]]
**Encounter type:** Combat

> [!info] Read Aloud
> On the east wall, the wood of a shutter begins to change. It goes pale at the centre, then silver-grey, then bone-white, spreading outward like frost in fast motion, until the whole shutter is the colour of driftwood. Then it simply crumbles, falling away in a puff of pale dust, and a blade of pure white noon light stabs across the dark floor. In the light, the air ripples. Something is coming in.

## Setup
The glarewights besiege the mill to get at the party and at Captain. The mill interior starts in **darkness** with every shutter closed. The fight is about controlling light: the glarewights open the mill to the sun, and the party shuts it out again.

**The shutters.** The mill has **six shutters** (see [[Dunmore's Mill]]) plus the big **loading door** on the south wall.
- **Bleaching a shutter:** a glarewight outside, adjacent to a closed shutter, can use its action to bleach it. The shutter turns white at once (visible from inside) and **crumbles at the start of that glarewight's next turn**, which gives the party one round to respond.
- **Bracing a shutter:** a PC can use an action to brace a closed or bleaching shutter with a grain sack. A braced shutter takes two more rounds of bleaching before it crumbles.
- **Covering a broken shutter:** a PC can use an action to jam a grain sack, tarp or plank into an open window (DC 10 Strength (Athletics) check if a glarewight is within 5 feet). That window's light shaft goes out.
- **Light shafts:** each open window throws a shaft of **bright light** 10 feet wide and 30 feet long across the floor. Everywhere else in the mill is **darkness** (or dim light within the party's own light sources, which they'll probably want to shutter).
- **The loading door:** barred. A glarewight needs 2 consecutive rounds of bleaching to open it; once open, the whole southern half of the mill is bright light. Closing it again needs two PCs' actions (it's heavy).

**Flour.** The mill is full of it. Any PC can use an action to throw a scoop or burst a sack: every glarewight in a 10-foot cube is revealed and can't hide (see [[Glarewight]]).

> [!warning] Flour Dust Is Explosive
> Telegraph this clearly before the fight (Ned Dunmore warned them: "No flame near the flour. *No flame.*"; anyone with alchemist's supplies or a DC 10 Intelligence check knows it). If fire touches a cloud of thrown flour, it explodes: each creature within 10 feet makes a DC 13 Dexterity save, taking 3d6 Fire damage on a failure or half on a success, and the area becomes **bright light** until the end of the next round. Clever players may use it deliberately, and the flash cost should feel like a real trade-off.

**Aldric** stays outside the loading door the whole fight, singing a hymn in a warm baritone. He does not enter or attack. If anyone opens the door to attack him, he simply steps back, smiling.

**Corwin.** One glarewight wears a **tin wedding ring** that flashes in the light. It is Corwin Thatch, Mara's husband. If the party destroys it in darkness and recovers the ring (it drops, mirror-bright, from the flare), they can return it to Mara.

## Objectives
- Survive and destroy or drive off the glarewights.
- Keep the grain safe. Hobb's forty sacks are in the north store room, and glarewight light bleaches anything it touches. Each sack hit by a stray Searing Touch or exposed in a light shaft for 3+ rounds is spoiled (bleached to pale, weightless husks).
- **Bonus:** destroy Corwin and recover the ring.

## Enemies
| Creature | CR | Count | Notes |
|---|---|---|---|
| [[Glarewight]] | 1 | 4 | Two bleach shutters while two enter through light shafts; one wears a tin ring (Corwin). They don't flee at low HP in this fight; Aldric's song holds them. |

**Terrain features:** See [[Dunmore's Mill]]. The millstone and grain chute provide cover; the stacked grain sacks are both cover and the objective.

> [!tip] DM Note: Pacing the Siege
> - **Round 1:** Two shutters are bleaching (east wall, west wall). Two glarewights wait outside them.
> - **Round 2:** Unbraced shutters crumble. Light shafts appear; wights enter and Glare Stealth inside the shafts. They strike anyone standing in or adjacent to the light.
> - **Round 3+:** Each round, any glarewight not inside bleaches another shutter. If the party is holding the shutters well, have one try the loading door.
> - Every time the party closes a shaft with a glarewight inside it, that glarewight is suddenly *in darkness*: glowing, visible, vulnerable. Describe it like a fish thrown onto a riverbank. **This is the payoff for everything the party learned.**

> [!warning] Scaling
> - **Weaker:** Only 3 glarewights; start with only one shutter bleaching; let Ned's daughter shout from the cellar hatch which shutter is going next.
> - **Stronger:** If Wendel rose and wasn't destroyed in [[Before Dawn]], he joins as a fifth glarewight in round 3. Or have Aldric's hymn grant all glarewights +1 to attack rolls while he sings (a PC can interrupt it by shouting "Ilvaris!" through the door: the song falters for 1 round).
> - **Party in real trouble:** Ned bursts out of the cellar with a lit lamp and *carries it outside*, drawing two glarewights after him into the sun. He survives; everyone hears about it at dusk.

## Possible Outcomes
- **Victory:** The last glarewight flares and is gone. Outside, the hymn stops. A long silence. Then footsteps walking slowly away. The party has the afternoon to rest and lick their wounds; run [[Dusk at the Mill Door]].
- **Corwin laid to rest:** The tin ring drops to the floor, scoured mirror-bright. Returning it to Mara at dusk resolves her arc; she weeps, then laughs, then hugs whoever hands it to her and tells them never to mention it.
- **Grain spoiled:** Each spoiled sack is −8 gp from Hobb's reward (he docks it apologetically).
- **The party abandons the mill:** They can flee through the cellar (Ned's family knows a drainage tunnel to the stream). The grain is lost and Hobb pays nothing for it, but the party survives, and the town still needs them.

## Initiative
```encounter
name: Siege of Dunmore's Mill
creatures:
  - 4: Glarewight, 22, 12, 2
```
