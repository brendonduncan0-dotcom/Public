---
title: The Vestry Heist
tags: [dnd, encounter]
oneshot: "[[Oneshot 4 - Sunblind]]"
act: 2
type: exploration
---

**Act:** 2 — [[Act 2 - The Town Wakes]]
**Location:** [[Temple Vestry]]
**Encounter type:** Exploration

> [!info] Read Aloud
> The temple stands pale on its hill above the sleeping-waking town, lantern-light spilling from every window into the night. Captain stops dead thirty feet from the doors and won't go a step further. Round the back, a low stone vestry leans against the temple wall, its single window dark. From somewhere inside the temple, faint and constant, someone is humming, the same seven notes, over and over.

## Setup
At night [[Father Aldric]] kneels motionless before the reliquary in the sanctum, humming, and doesn't sleep. His journal lies on the writing desk in the **vestry**, his private room adjoining the sanctum. [[Hollis Wick]] patrols the temple grounds on a slow round, trimming and relighting lanterns. The vestry is rigged with Aldric's own mirror-lantern tripwires, because he believes light protects him.

At night, glarewights not out hunting drift around the sanctum like moths around Aldric's light. They're visible and faintly glowing in the dark grounds, and docile unless disturbed.

**The heist in three beats:**

1. **Approach.** The party must cross the temple garden while Hollis does his rounds. Group Dexterity (Stealth) check against Hollis's passive Perception of 11. On failure, Hollis spots them; go to *Caught by Hollis* below.
2. **The vestry.** The door is locked (DC 13 thieves' tools, DC 15 Athletics to force it quietly) or the window can be jimmied (DC 12 Sleight of Hand). Inside, two mirror-lantern tripwires cross the floor (DC 13 Perception to spot each, DC 12 thieves' tools to disarm, or step over them once spotted).
3. **The journal.** On the desk, beside a half-burned candle and a pair of lens-grinding tools. Reading it properly takes 10 minutes (or skim the key pages in 1 minute with a DC 13 Investigation check).

**If a tripwire fires:** Lanterns flare behind mirrors and blaze bright light through the vestry and under the door into the sanctum. The humming stops. Two glarewights drift through the connecting door to investigate. The party can flee (they won't follow into darkness) or fight (the vestry is bright light). Aldric doesn't come; he simply resumes humming after a minute, which is somehow worse.

## Objectives
- Get Aldric's journal (or read it and leave it).
- Get out without a fight, ideally without being seen.

## Aldric's Journal

Hand these excerpts to the players as they read. They are the heart of the mystery: hopeful and methodical early, erratic later.

> *Year of the bad winter, Midwinter.* The dead walk from the barrow. I have prayed for three nights. If the Morninglord hears me, let Him send help, for we have none left.
>
> *Three days later.* He came. A stranger in white, tall as the doorframe, with a voice like warm bread. He walked into the barrow alone and the dead lay down. His name, he says, is **Ilvaris**.
>
> *Spring.* Ilvaris walks the fields. The wheat follows him. The sick are well. Old Tobin's leg is whole. The children follow him like ducklings. I have never been so happy.
>
> *Late summer.* Ilvaris says he must go. "Light is not meant to be kept," he says. I cannot bear it. What will we be without him? We will be what we were: cold, frightened, burying our children in winter.
>
> *Autumn.* I have begun the reliquary. Hollis grinds the lenses; he doesn't ask why. The mirror angles must be exact. A kind stranger at the market in Waterdeep taught me the geometry. He asked nothing in return. (Sketches of mirror angles.)
>
> *Solstice.* It is done. God forgive me, it is done. At noon the sun came through the lenses and I held the crystal and he *screamed*. A sliver of him is in the crystal now, warm as a heartbeat. The rest of him went away grey and small. I did it for them. I did it for them.
>
> *Midsummer (this year).* The storm. The crystal cracked. Light came out of it like water from a broken jar, and I put my hands over the crack to hold it in, and it came *into* me.
>
> *Later.* Warm. So warm. The light sings. My hands cast no shadows. The flock needs light. I must keep the lanterns lit.
>
> *Later, in shaky handwriting.* At dusk I am myself. I know what they are. I know what I have done. Someone must stop me. At noon I cannot stop myself. At noon I don't *want* to.
>
> *Final entry, in a neat, calm, too-perfect hand.* The light is good. The light is good. The light is good.

## Skill Challenge

| Check | DC | Success | Failure |
|---|---|---|---|
| Group Stealth (approach) | 11 (Hollis's passive Perception) | Unseen. | Caught by Hollis. |
| Perception (tripwires) | 13 | Each tripwire spotted. | Tripwire fires. |
| Thieves' tools (door) | 13 | Silent entry. | The lock clicks loudly; the humming pauses for a heartbeat, then resumes. |
| Investigation (skim journal) | 13 | Key entries found in 1 minute. | Takes 10 minutes. |
| Detect Magic (through the sanctum door) | — | Strong abjuration and evocation from something in the sanctum (the reliquary), and a lingering Hallow effect on the temple floor. | |

## Possible Outcomes
- **Clean heist:** The party has the journal and the truth: Aldric trapped a deva named Ilvaris, the crystal cracked, the light is in him, and at dusk he begs to be stopped. **This earns Hobb's 100 gp bonus.**
- **Caught by Hollis:** Hollis is horrified ("You're *robbing the Father*?") but not violent. He can be talked down (DC 13 Persuasion, or DC 10 if the party shows him the journal's solstice entry). If they show him the solstice entry and press gently, he breaks down: he saw Ilvaris screaming and has told himself for years that he imagined it. A fragile ally, which matters in [[Oneshot 5 - The Answered Prayer]]. If they're cruel to him, he runs to ring the alarm bell; the party must flee, and Town Trust −1.
- **Captain's reaction:** if Rook reads the solstice entry aloud, Captain, still sitting thirty feet from the temple, lets out a long, low, grieving yowl that carries across the whole town. Rook feels a pang of grief that isn't his.
- **Sequel hook:** the "kind stranger at the market in Waterdeep" who taught the mirror geometry is a loose thread for a future adventure. Don't explain it.

## Initiative
```encounter
name: The Vestry Heist (tripwire fired)
creatures:
  - 2: Glarewight, 22, 12, 2
```
