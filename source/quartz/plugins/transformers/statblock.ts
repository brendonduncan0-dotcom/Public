import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { load } from "js-yaml"

export const StatblockTransformer: QuartzTransformerPlugin = () => {
  return {
    name: "StatblockTransformer",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, _file) => {
            visit(tree, "code", (node: any) => {
              if (node.lang === "statblock") {
                try {
                  // Parse YAML content
                  const data = load(node.value) as any

                  // Build HTML string
                  let html = '<div class="statblock">\n'

                  // Name
                  if (data.name) {
                    html += `  <h1 class="statblock-name">${data.name}</h1>\n`
                  }

                  // Size, type, alignment
                  if (data.size || data.type) {
                    html += `  <p class="statblock-meta"><em>`
                    if (data.size) html += `${data.size} `
                    if (data.type) html += `${data.type}`
                    if (data.subtype) html += ` (${data.subtype})`
                    if (data.alignment) html += `, ${data.alignment}`
                    html += `</em></p>\n`
                  }

                  html += `  <hr class="statblock-separator">\n`

                  // AC, HP, Speed
                  if (data.ac) {
                    html += `  <p><strong>Armor Class</strong> ${data.ac}</p>\n`
                  }
                  if (data.hp) {
                    html += `  <p><strong>Hit Points</strong> ${data.hp}`
                    if (data.hit_dice) html += ` (${data.hit_dice})`
                    html += `</p>\n`
                  }
                  if (data.speed) {
                    html += `  <p><strong>Speed</strong> ${data.speed}</p>\n`
                  }

                  html += `  <hr class="statblock-separator">\n`

                  // Ability Scores
                  if (data.stats && Array.isArray(data.stats) && data.stats.length === 6) {
                    const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
                    const modifiers = data.stats.map((score: number) => {
                      const mod = Math.floor((score - 10) / 2)
                      return mod >= 0 ? `+${mod}` : `${mod}`
                    })

                    html += `  <table class="statblock-abilities">\n`
                    html += `    <tbody>\n`
                    
                    // First row: ability names
                    html += `      <tr>\n`
                    abilities.forEach(ability => {
                      html += `        <th><strong>${ability}</strong></th>\n`
                    })
                    html += `      </tr>\n`
                    
                    // Second row: scores with modifiers
                    html += `      <tr>\n`
                    data.stats.forEach((score: number, i: number) => {
                      html += `        <td>${score} (${modifiers[i]})</td>\n`
                    })
                    html += `      </tr>\n`
                    
                    html += `    </tbody>\n`
                    html += `  </table>\n`
                  }

                  html += `  <hr class="statblock-separator">\n`

                  /*
                  // Saves, skills, resistances, immunities, senses, languages, CR
                  if (data.saves && Array.isArray(data.saves) && data.saves.length > 0) {
                    const saveNames = ["Str", "Dex", "Con", "Int", "Wis", "Cha"]
                    const nonZeroSaves = data.saves
                      .map((val: number, i: number) => val !== 0 ? `${saveNames[i]} +${val}` : null)
                      .filter(Boolean)
                    if (nonZeroSaves.length > 0) {
                      html += `  <p><strong>Saving Throws</strong> ${nonZeroSaves.join(", ")}</p>\n`
                    }
                  }
                  */

                  // Saves, skills, resistances, immunities, senses, languages, CR
                  if (data.saves && Array.isArray(data.saves) && data.saves.length > 0) {
                    const saveNames = ["Str", "Dex", "Con", "Int", "Wis", "Cha"]
                    const validSaves = data.saves
                      .map((val: any, i: number) => {
                        // Only include saves that have a valid number and aren't 0, null, undefined, or empty string
                        if (val !== null && val !== undefined && val !== '' && val !== 0) {
                          const bonus = typeof val === 'number' && val >= 0 ? `+${val}` : `${val}`
                          return `${saveNames[i]} ${bonus}`
                        }
                        return null
                      })
                      .filter(Boolean) // Remove all null/undefined entries
                    
                    if (validSaves.length > 0) {
                      html += `  <p><strong>Saving Throws</strong> ${validSaves.join(", ")}</p>\n`
                    }
                  }



                  if (data.skillsaves) {
                    const skills: string[] = []
                    
                    // Handle both object format and array format
                    if (Array.isArray(data.skillsaves)) {
                      // Array format: [{perception: 1}, {stealth: 4}]
                      data.skillsaves.forEach((skillObj: any) => {
                        for (const [skill, bonus] of Object.entries(skillObj)) {
                          const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1)
                          const bonusStr = typeof bonus === 'number' && bonus >= 0 ? `+${bonus}` : `${bonus}`
                          skills.push(`${capitalizedSkill} ${bonusStr}`)
                        }
                      })
                    } else if (typeof data.skillsaves === 'object') {
                      // Object format: {perception: 1, stealth: 4}
                      for (const [skill, bonus] of Object.entries(data.skillsaves)) {
                        const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1)
                        const bonusStr = typeof bonus === 'number' && bonus >= 0 ? `+${bonus}` : `${bonus}`
                        skills.push(`${capitalizedSkill} ${bonusStr}`)
                      }
                    }
                    
                    if (skills.length > 0) {
                      html += `  <p><strong>Skills</strong> ${skills.join(", ")}</p>\n`
                    }
                  }

                  if (data.damage_resistances) {
                    html += `  <p><strong>Damage Resistances</strong> ${data.damage_resistances}</p>\n`
                  }

                  if (data.damage_immunities) {
                    html += `  <p><strong>Damage Immunities</strong> ${data.damage_immunities}</p>\n`
                  }

                  if (data.condition_immunities) {
                    html += `  <p><strong>Condition Immunities</strong> ${data.condition_immunities}</p>\n`
                  }

                  if (data.senses) {
                    html += `  <p><strong>Senses</strong> ${data.senses}</p>\n`
                  }

                  if (data.languages) {
                    html += `  <p><strong>Languages</strong> ${data.languages}</p>\n`
                  }

                  if (data.cr) {
                    html += `  <p><strong>Challenge</strong> ${data.cr}</p>\n`
                  }

                  // Traits
                  if (data.traits && Array.isArray(data.traits)) {
                    html += `  <hr class="statblock-separator">\n`
                    data.traits.forEach((trait: any) => {
                      html += `  <p class="statblock-property">`
                      if (trait.name) {
                        html += `<strong><em>${trait.name}.</em></strong> `
                      }
                      if (trait.desc) {
                        html += `${trait.desc}`
                      }
                      html += `</p>\n`
                    })
                  }

                  // Actions
                  if (data.actions && Array.isArray(data.actions)) {
                    html += `  <h3 class="statblock-section-title">Actions</h3>\n`
                    data.actions.forEach((action: any) => {
                      html += `  <p class="statblock-property">`
                      if (action.name) {
                        html += `<strong><em>${action.name}.</em></strong> `
                      }
                      if (action.desc) {
                        html += `${action.desc}`
                      }
                      html += `</p>\n`
                    })
                  }

                  // Legendary Actions
                  if (data.legendary_actions && Array.isArray(data.legendary_actions)) {
                    html += `  <h3 class="statblock-section-title">Legendary Actions</h3>\n`
                    if (data.legendary_desc) {
                      html += `  <p>${data.legendary_desc}</p>\n`
                    }
                    data.legendary_actions.forEach((action: any) => {
                      html += `  <p class="statblock-property">`
                      if (action.name) {
                        html += `<strong><em>${action.name}.</em></strong> `
                      }
                      if (action.desc) {
                        html += `${action.desc}`
                      }
                      html += `</p>\n`
                    })
                  }

                  // Reactions
                  if (data.reactions && Array.isArray(data.reactions)) {
                    html += `  <h3 class="statblock-section-title">Reactions</h3>\n`
                    data.reactions.forEach((reaction: any) => {
                      html += `  <p class="statblock-property">`
                      if (reaction.name) {
                        html += `<strong><em>${reaction.name}.</em></strong> `
                      }
                      if (reaction.desc) {
                        html += `${reaction.desc}`
                      }
                      html += `</p>\n`
                    })
                  }

                  html += `</div>`

                  // Replace the code node with an HTML node
                  node.type = "html"
                  node.value = html
                  delete node.lang
                } catch (error) {
                  console.error("Error parsing statblock:", error)
                }
              }
            })
          }
        },
      ]
    },
  }
}