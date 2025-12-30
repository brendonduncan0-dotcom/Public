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
                    html += `    <thead><tr>\n`
                    abilities.forEach(ability => {
                      html += `      <th>${ability}</th>\n`
                    })
                    html += `    </tr></thead>\n`
                    html += `    <tbody><tr>\n`
                    data.stats.forEach((score: number, i: number) => {
                      html += `      <td>${score} (${modifiers[i]})</td>\n`