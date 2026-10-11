---
title: The Night Market Flare
tags: [dnd, encounter]
oneshot: "[[Oneshot 5 - The Answered Prayer]]"
act: 1
type: combat
---

**Act:** 1 — [[Act 1 - Lamp-Black]]
**Location:** [[Lantern Square]]
**Encounter type:** Combat

> [!info] Read Aloud
> The midnight market is in full swing: moonlight on stalls of glossy, too-perfect vegetables, a fiddler, children chasing each other around the well. Then, all at once, every lantern in the square flares white. Mirrors snap round on their posts. Light floods the square, bright as noon, and in the sudden glare a voice cries out from the bandstand, high and triumphant: "Now we'll *see* them! Now we'll see them coming!" It's Hollis Wick, holding a lever, beaming. Behind him, up on the hill, the temple windows answer with a pulse of light. And in the brightness, the air begins to ripple.

## Setup
[[Hollis Wick]] has secretly rigged all of Lantern Square with mirror-lanterns, convinced that flooding the market with light will expose the "sun-ghosts" so the town can fight them. He has done the opposite: he has created a pool of noon in the middle of the night, and the glarewights roosting in the temple come straight for it, and for the crowd.

**Four rig posts** surround the square (north, east, south, west), each linked to a master lever on the bandstand. While any post is lit, the area within 30 feet of it is **bright light**; the rest of the square is moonlit **dim light**.

- **Disabling a rig post:** an action to smash its mirrors (AC 11, 5 HP), a DC 12 thieves' tools check to disconnect it, or a soot cloth or smoke pot over the lanterns. Each disabled post turns its 30-foot area back to dim light.
- **The master lever:** on the bandstand. Pulling it back (an action) shuts down every rig at once, but Hollis is standing on it and won't move willingly.
- **The crowd:** about thirty townsfolk scattering in panic. Each round, any glarewight that doesn't have a PC within 10 feet of it attacks a fleeing villager instead (describe a near-miss, a scream, a bleached handprint on a coat). If three villagers are touched, one of them is killed: Town Trust −1, and Osric has another burial before dawn.

## Objectives
- Destroy or drive off the glarewights.
- Shut down the rigs (smash posts or pull the master lever).
- Protect the townsfolk.
- Talk Hollis down, or move him.

## Enemies
| Creature | CR | Count | Notes |
|---|---|---|---|
| [[Glarewight]] | 1 | 4 | Arrive in pairs (2 in round 1, 2 more in round 2); attack the crowd if no PC is near |

**Terrain features:** See [[Lantern Square]]. Market stalls and the well provide cover; the bandstand is raised; the alleys off the square are dark.

## Talking Hollis Down

Hollis believes completely that he's helping. He can be reached:

| Approach | Check | DC | Result |
|---|---|---|---|
| "They're hiding in the light, Hollis. You're feeding them." | Persuasion | 15 (Advantage if he was treated kindly in Oneshot 4) | Hollis looks, *really* looks, at the rippling air above the crowd. His face crumples. He pulls the lever himself. |
| Show him the journal or remind him of the solstice | — | — | Advantage on the Persuasion check. |
| Shove or grapple him off the lever | Athletics vs. his Athletics (+0) | — | The party can pull the lever, but Hollis fights them for it (no damage, just struggling) for 1 round. |

> [!warning] Scaling
> - **Weaker:** 3 glarewights; the crowd flees into the dark alleys in round 2 and is safe.
> - **Stronger:** All 4 glarewights arrive in round 1; Hollis relights a smashed post each round as a bonus action until he's dealt with.
> - **Allies:** If Town Trust is 2+, Mara and Garrick Fennimore join the fight from round 2 (Mara with her flour pouches; Garrick shepherding the crowd). [[Tam Fennimore]], if treated, helps carry children into the alleys.

## Possible Outcomes
- **Rigs down, crowd safe:** The square goes dark; the remaining glarewights are suddenly visible, glowing, and flee back toward the temple or are destroyed. The town has seen the party save them in person: Town Trust +1.
- **Hollis talked down:** He sits on the bandstand steps with his head in his hands. "I helped him build it. All of it. Every lens." If the party is gentle, Hollis becomes an ally: he knows the temple's mirror rigs better than anyone (counts as **Scout the temple** in [[Preparing for Noon]] for free), and in the finale he can be sent to cut the sanctum banners from the gallery (see [[The Noon Service]]).
- **Hollis humiliated or hurt:** He flees into the dark. He'll be in the temple at noon, kneeling beside Aldric, and he'll try to relight one lantern per round in Phase 1 until stopped.
- **Levity beat:** In the aftermath, a farmer picks a perfectly unharmed cabbage out of the wreckage of a stall, inspects it, and puts it back for sale.

## Initiative
```encounter
name: The Night Market Flare
creatures:
  - 4: Glarewight, 22, 12, 2
```
