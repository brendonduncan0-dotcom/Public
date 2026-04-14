// Converter for Fantasy Statblocks to Foundry VTT D&D 5e format

interface StatblockMonster {
    name: string;
    size: string;
    type: string;
    alignment: string;
    ac: number;
    hp: number;
    hit_dice: string;
    speed: string;
    stats: number[];
    saves?: any[];
    skillsaves?: any[];
    damage_resistances?: string;
    damage_immunities?: string;
    condition_immunities?: string;
    senses: string;
    languages: string;
    cr: number;
    traits?: any[];
    actions?: any[];
    bonus_actions?: any[];
    reactions?: any[];
    legendary_actions?: any[];
    source?: string;
    layout?: string;
}

interface FoundryActor {
    name: string;
    type: string;
    system: any;
    items: any[];
    effects: any[];
    folder: null;
    sort: number;
    ownership: any;
    flags: any;
    _stats: any;
}

export class StatblockConverter {
    
    /**
     * Convert a Fantasy Statblock monster to Foundry VTT D&D 5e actor format
     */
    static convertToFoundry(monster: StatblockMonster): FoundryActor {
        const abilities = this.convertAbilities(monster.stats);
        const skills = this.convertSkills(monster.skillsaves);
        const saves = this.convertSaves(monster.saves, abilities);
        
        return {
            name: monster.name,
            type: "npc",
            system: {
                abilities: abilities,
                attributes: {
                    ac: {
                        flat: monster.ac,
                        calc: "flat",
                        formula: ""
                    },
                    hp: {
                        value: monster.hp,
                        max: monster.hp,
                        temp: 0,
                        tempmax: 0,
                        formula: monster.hit_dice
                    },
                    movement: this.convertMovement(monster.speed),
                    senses: this.convertSenses(monster.senses),
                    spellcasting: ""
                },
                details: {
                    biography: {
                        value: "",
                        public: ""
                    },
                    alignment: monster.alignment,
                    race: "",
                    type: {
                        value: monster.type,
                        subtype: "",
                        swarm: "",
                        custom: ""
                    },
                    cr: monster.cr,
                    spellLevel: 0,
                    source: monster.source || "Obsidian Import",
                    xp: {
                        value: this.getCRXP(monster.cr)
                    }
                },
                traits: {
                    size: this.convertSize(monster.size),
                    di: this.convertResistances(monster.damage_immunities),
                    dr: this.convertResistances(monster.damage_resistances),
                    dv: { value: [], custom: "" },
                    ci: this.convertConditions(monster.condition_immunities),
                    languages: {
                        value: [],
                        custom: monster.languages
                    }
                },
                currency: {
                    pp: 0, gp: 0, ep: 0, sp: 0, cp: 0
                },
                skills: skills,
                saves: saves,
                resources: {
                    legact: {
                        value: this.hasLegendaryActions(monster) ? 3 : 0,
                        max: this.hasLegendaryActions(monster) ? 3 : 0
                    },
                    legres: {
                        value: 0,
                        max: 0
                    },
                    lair: {
                        value: false,
                        initiative: 20
                    }
                }
            },
            items: this.convertActions(monster),
            effects: [],
            folder: null,
            sort: 0,
            ownership: {
                default: 0
            },
            flags: {
                "obsidian-import": {
                    source: "Fantasy Statblocks",
                    layout: monster.layout
                }
            },
            _stats: {
                systemId: "dnd5e",
                systemVersion: "5.2.4",
                coreVersion: "13.351",
                createdTime: Date.now(),
                modifiedTime: Date.now(),
                lastModifiedBy: "obsidian-exporter"
            }
        };
    }

    /**
     * Convert stats array [STR, DEX, CON, INT, WIS, CHA] to Foundry abilities format
     */
    private static convertAbilities(stats: number[]): any {
        const abilityNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const abilities: any = {};
        
        stats.forEach((value, index) => {
            abilities[abilityNames[index]] = {
                value: value,
                proficient: 0,
                bonuses: {
                    check: "",
                    save: ""
                }
            };
        });
        
        return abilities;
    }

    /**
     * Convert saving throw bonuses
     */
    private static convertSaves(saves: any[] | undefined, abilities: any): any {
        const result: any = {};
        const abilityNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        
        abilityNames.forEach(ability => {
            result[ability] = {
                value: 0,
                proficient: 0
            };
        });
        
        if (saves) {
            saves.forEach(save => {
                const ability = Object.keys(save)[0];
                const bonus = save[ability];
                const abilityMod = Math.floor((abilities[ability].value - 10) / 2);
                
                // Calculate if proficient based on bonus
                result[ability] = {
                    value: 0,
                    proficient: bonus > abilityMod ? 1 : 0
                };
            });
        }
        
        return result;
    }

    /**
     * Convert skill bonuses
     */
    private static convertSkills(skillsaves: any[] | undefined): any {
        const skills: any = {
            acr: { value: 0, ability: "dex", bonuses: { check: "", passive: "" } },
            ani: { value: 0, ability: "wis", bonuses: { check: "", passive: "" } },
            arc: { value: 0, ability: "int", bonuses: { check: "", passive: "" } },
            ath: { value: 0, ability: "str", bonuses: { check: "", passive: "" } },
            dec: { value: 0, ability: "cha", bonuses: { check: "", passive: "" } },
            his: { value: 0, ability: "int", bonuses: { check: "", passive: "" } },
            ins: { value: 0, ability: "wis", bonuses: { check: "", passive: "" } },
            itm: { value: 0, ability: "cha", bonuses: { check: "", passive: "" } },
            inv: { value: 0, ability: "int", bonuses: { check: "", passive: "" } },
            med: { value: 0, ability: "wis", bonuses: { check: "", passive: "" } },
            nat: { value: 0, ability: "int", bonuses: { check: "", passive: "" } },
            prc: { value: 0, ability: "wis", bonuses: { check: "", passive: "" } },
            prf: { value: 0, ability: "cha", bonuses: { check: "", passive: "" } },
            per: { value: 0, ability: "cha", bonuses: { check: "", passive: "" } },
            rel: { value: 0, ability: "int", bonuses: { check: "", passive: "" } },
            slt: { value: 0, ability: "dex", bonuses: { check: "", passive: "" } },
            ste: { value: 0, ability: "dex", bonuses: { check: "", passive: "" } },
            sur: { value: 0, ability: "wis", bonuses: { check: "", passive: "" } }
        };
        
        // Map skill names to Foundry abbreviations
        const skillMap: any = {
            'acrobatics': 'acr',
            'animal handling': 'ani',
            'arcana': 'arc',
            'athletics': 'ath',
            'deception': 'dec',
            'history': 'his',
            'insight': 'ins',
            'intimidation': 'itm',
            'investigation': 'inv',
            'medicine': 'med',
            'nature': 'nat',
            'perception': 'prc',
            'performance': 'prf',
            'persuasion': 'per',
            'religion': 'rel',
            'sleight of hand': 'slt',
            'stealth': 'ste',
            'survival': 'sur'
        };
        
        if (skillsaves) {
            skillsaves.forEach(skill => {
                const skillName = Object.keys(skill)[0];
                const foundrySkill = skillMap[skillName.toLowerCase()];
                if (foundrySkill) {
                    skills[foundrySkill].value = 1; // Mark as proficient
                }
            });
        }
        
        return skills;
    }

    /**
     * Convert movement speeds
     */
    private static convertMovement(speed: string): any {
        const movement: any = {
            burrow: 0,
            climb: 0,
            fly: 0,
            swim: 0,
            walk: 0,
            units: "ft",
            hover: false
        };
        
        // Parse speed string like "30 ft., fly 30 ft. (hover)"
        const parts = speed.split(',');
        
        parts.forEach(part => {
            part = part.trim().toLowerCase();
            
            if (part.includes('fly')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) movement.fly = parseInt(match[1]);
                if (part.includes('hover')) movement.hover = true;
            } else if (part.includes('swim')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) movement.swim = parseInt(match[1]);
            } else if (part.includes('climb')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) movement.climb = parseInt(match[1]);
            } else if (part.includes('burrow')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) movement.burrow = parseInt(match[1]);
            } else {
                const match = part.match(/(\d+)\s*ft/);
                if (match) movement.walk = parseInt(match[1]);
            }
        });
        
        return movement;
    }

    /**
     * Convert senses string to Foundry format
     */
    private static convertSenses(senses: string): any {
        const result: any = {
            darkvision: 0,
            blindsight: 0,
            tremorsense: 0,
            truesight: 0,
            units: "ft",
            special: ""
        };
        
        const parts = senses.split(',');
        
        parts.forEach(part => {
            part = part.trim().toLowerCase();
            
            if (part.includes('darkvision')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) result.darkvision = parseInt(match[1]);
            } else if (part.includes('blindsight')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) result.blindsight = parseInt(match[1]);
            } else if (part.includes('tremorsense')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) result.tremorsense = parseInt(match[1]);
            } else if (part.includes('truesight')) {
                const match = part.match(/(\d+)\s*ft/);
                if (match) result.truesight = parseInt(match[1]);
            } else if (!part.includes('passive perception')) {
                result.special = part;
            }
        });
        
        return result;
    }

    /**
     * Convert size to Foundry format
     */
    private static convertSize(size: string): string {
        const sizeMap: any = {
            'tiny': 'tiny',
            'small': 'sm',
            'medium': 'med',
            'large': 'lg',
            'huge': 'huge',
            'gargantuan': 'grg'
        };
        
        return sizeMap[size.toLowerCase()] || 'med';
    }

    /**
     * Convert damage resistances/immunities
     */
    private static convertResistances(resistances: string | undefined): any {
        if (!resistances) return { value: [], custom: "" };
        
        return {
            value: [],
            custom: resistances
        };
    }

    /**
     * Convert condition immunities
     */
    private static convertConditions(conditions: string | undefined): any {
        if (!conditions) return { value: [], custom: "" };
        
        return {
            value: [],
            custom: conditions
        };
    }

    /**
     * Check if monster has legendary actions
     */
    private static hasLegendaryActions(monster: StatblockMonster): boolean {
        return monster.legendary_actions && monster.legendary_actions.length > 0;
    }

    /**
     * Get XP value for CR
     */
    private static getCRXP(cr: number): number {
        const xpTable: any = {
            0: 10, 0.125: 25, 0.25: 50, 0.5: 100,
            1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800,
            6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900,
            11: 7200, 12: 8400, 13: 10000, 14: 11500, 15: 13000,
            16: 15000, 17: 18000, 18: 20000, 19: 22000, 20: 25000,
            21: 33000, 22: 41000, 23: 50000, 24: 62000, 25: 75000,
            26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000
        };
        
        return xpTable[cr] || 0;
    }

    /**
     * Convert all actions, traits, reactions, etc. to Foundry items
     */
    private static convertActions(monster: StatblockMonster): any[] {
        const items: any[] = [];
        
        // Convert traits
        if (monster.traits) {
            monster.traits.forEach(trait => {
                items.push(this.createFeatureItem(trait.name, trait.desc, 'feat'));
            });
        }
        
        // Convert actions
        if (monster.actions) {
            monster.actions.forEach(action => {
                items.push(this.createActionItem(action.name, action.desc));
            });
        }
        
        // Convert bonus actions
        if (monster.bonus_actions) {
            monster.bonus_actions.forEach(action => {
                items.push(this.createActionItem(action.name, action.desc, 'bonus'));
            });
        }
        
        // Convert reactions
        if (monster.reactions) {
            monster.reactions.forEach(reaction => {
                items.push(this.createActionItem(reaction.name, reaction.desc, 'reaction'));
            });
        }
        
        // Convert legendary actions
        if (monster.legendary_actions) {
            // Add the "Legendary Actions" header feature first
            items.push(this.createLegendaryActionsHeader());
            
            // Then add each individual legendary action
            monster.legendary_actions.forEach(action => {
                items.push(this.createLegendaryActionItem(action.name, action.desc));
            });
        }
        
        return items;
    }

    /**
     * Create a feature item (traits, legendary actions)
     */
    private static createFeatureItem(name: string, desc: string, type: string = 'feat'): any {
        return {
            name: name,
            type: type,
            system: {
                description: {
                    value: desc,
                    chat: "",
                    unidentified: ""
                },
                source: "",
                activation: {
                    type: "",
                    cost: 0,
                    condition: ""
                },
                duration: {
                    value: null,
                    units: ""
                },
                target: {
                    value: null,
                    width: null,
                    units: "",
                    type: ""
                },
                range: {
                    value: null,
                    long: null,
                    units: ""
                },
                uses: {
                    value: 0,
                    max: 0,
                    per: ""
                },
                consume: {
                    type: "",
                    target: "",
                    amount: null
                },
                ability: null,
                actionType: "",
                attackBonus: 0,
                chatFlavor: "",
                critical: {
                    threshold: null,
                    damage: ""
                },
                damage: {
                    parts: [],
                    versatile: ""
                },
                formula: "",
                save: {
                    ability: "",
                    dc: null,
                    scaling: "spell"
                },
                requirements: "",
                recharge: {
                    value: null,
                    charged: false
                }
            },
            effects: [],
            folder: null,
            sort: 0,
            ownership: {
                default: 0
            },
            flags: {}
        };
    }

    /**
     * Create the "Legendary Actions" header feature
     */
    private static createLegendaryActionsHeader(): any {
        return {
            name: "Legendary Actions",
            type: "feat",
            system: {
                description: {
                    value: "<p>[[lookup @resources.legact.label]]</p>",
                    chat: "<p>The creature can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The creature regains spent legendary actions at the start of its turn.</p>"
                },
                source: {
                    custom: "",
                    book: "",
                    page: "",
                    license: "",
                    rules: "2014"
                },
                uses: {
                    max: "",
                    spent: 0,
                    recovery: []
                },
                type: {
                    value: "",
                    subtype: ""
                },
                requirements: "",
                properties: [],
                activities: {},
                enchant: {},
                prerequisites: {
                    level: null,
                    items: [],
                    repeatable: false
                },
                identifier: "legendary-actions",
                advancement: [],
                crewed: false
            },
            effects: [],
            folder: null,
            sort: 0,
            ownership: {
                default: 0
            },
            flags: {}
        };
    }

    /**
     * Create a legendary action item
     */
    private static createLegendaryActionItem(name: string, desc: string): any {
        // Try to extract cost from name (e.g., "Ethereal Step (Costs 2 Actions)")
        let cost = 1; // Default cost
        const costMatch = name.match(/\(Costs?\s+(\d+)\s+Actions?\)/i);
        if (costMatch) {
            cost = parseInt(costMatch[1]);
        }
        
        return {
            name: name,
            type: "feat",
            system: {
                description: {
                    value: desc,
                    chat: ""
                },
                source: {
                    custom: "",
                    book: "",
                    page: "",
                    license: "",
                    rules: "2014"
                },
                uses: {
                    max: "",
                    recovery: [],
                    spent: 0
                },
                type: {
                    value: "",
                    subtype: ""
                },
                requirements: "",
                properties: [],
                activities: {
                    "dnd5eactivity000": {
                        "_id": "dnd5eactivity000",
                        "type": "utility",
                        "activation": {
                            "type": "legendary",
                            "value": cost,
                            "condition": "",
                            "override": false
                        },
                        "consumption": {
                            "targets": [],
                            "scaling": {
                                "allowed": false,
                                "max": ""
                            },
                            "spellSlot": true
                        },
                        "description": {
                            "chatFlavor": ""
                        },
                        "duration": {
                            "concentration": false,
                            "value": "",
                            "units": "",
                            "special": "",
                            "override": false
                        },
                        "effects": [],
                        "range": {
                            "units": "",
                            "special": "",
                            "override": false
                        },
                        "target": {
                            "template": {
                                "count": "",
                                "contiguous": false,
                                "type": "",
                                "size": "",
                                "width": "",
                                "height": "",
                                "units": ""
                            },
                            "affects": {
                                "count": "",
                                "type": "",
                                "choice": false,
                                "special": ""
                            },
                            "override": false
                        },
                        "uses": {
                            "spent": 0,
                            "recovery": []
                        }
                    }
                },
                enchant: {},
                prerequisites: {
                    level: null
                },
                identifier: ""
            },
            effects: [],
            folder: null,
            sort: 0,
            ownership: {
                default: 0
            },
            flags: {
                "obsidian-import": {
                    legendary: true
                }
            }
        };
    }

    /**
     * Create an action item
     */
    private static createActionItem(name: string, desc: string, activationType: string = 'action'): any {
        // Try to extract attack bonus and damage from description
        const attackMatch = desc.match(/[+\-](\d+)\s+to\s+hit/i);
        const damageMatch = desc.match(/(\d+d\d+(?:\s*[+\-]\s*\d+)?)/);
        
        const item: any = {
            name: name,
            type: 'weapon',
            system: {
                description: {
                    value: desc,
                    chat: "",
                    unidentified: ""
                },
                source: "",
                quantity: 1,
                weight: 0,
                price: 0,
                attunement: 0,
                equipped: true,
                rarity: "",
                identified: true,
                activation: {
                    type: activationType,
                    cost: 1,
                    condition: ""
                },
                duration: {
                    value: null,
                    units: ""
                },
                target: {
                    value: null,
                    width: null,
                    units: "",
                    type: ""
                },
                range: {
                    value: 5,
                    long: null,
                    units: "ft"
                },
                uses: {
                    value: 0,
                    max: 0,
                    per: ""
                },
                consume: {
                    type: "",
                    target: "",
                    amount: null
                },
                ability: "",
                actionType: "mwak",
                attackBonus: attackMatch ? parseInt(attackMatch[1]) : 0,
                chatFlavor: "",
                critical: {
                    threshold: null,
                    damage: ""
                },
                damage: {
                    parts: damageMatch ? [[damageMatch[1], ""]] : [],
                    versatile: ""
                },
                formula: "",
                save: {
                    ability: "",
                    dc: null,
                    scaling: "spell"
                },
                armor: {
                    value: 10
                },
                hp: {
                    value: 0,
                    max: 0,
                    dt: null,
                    conditions: ""
                },
                weaponType: "natural",
                properties: {},
                proficient: true
            },
            effects: [],
            folder: null,
            sort: 0,
            ownership: {
                default: 0
            },
            flags: {}
        };
        
        return item;
    }
}