---
name: dnd-campaign-builder
description: This skill provides a structured approach for building Dungeons & Dragons campaigns within an Obsidian vault.
---


# D&D Campaign Builder Skill

## Purpose
This skill provides a structured approach for building Dungeons & Dragons campaigns within an Obsidian vault.

## Version
0.1.0 - Initial Release

## When to Use This Skill
Use this skill when the user:
- Asks to create a new D&D campaign
- Mentions building/starting a campaign for D&D or Dungeons & Dragons
- Requests help organizing a D&D campaign in Obsidian

## Folder Structure
The skill ensures the following folder structure exists:

```
/Campaigns/
```

## Workflow

### 1. Campaign Creation Recognition
When a user requests to create a D&D campaign, Claude should:
1. Acknowledge the request
2. Confirm they want to proceed with campaign creation
3. Move to folder verification

### 2. Folder Structure Verification
Claude should check if the required folders exist:
- `/Campaigns/`

If any folders are missing, Claude should:
1. Inform the user which folders need to be created
2. Create the missing folders
3. Confirm successful creation

### 3. Next Steps
After folder verification, Claude should ask the user what they'd like to do next with their campaign.

## Implementation Notes
- Always use the `obsidian-mcp-tools:list_vault_files` to check existing structure
- Use `obsidian-mcp-tools:create_vault_file` to create folders (by creating a placeholder file inside them)
- Be conversational and helpful throughout the process

## Future Enhancements (Planned)
- Campaign metadata templates
- Session note templates
- NPC tracking
- Location management
- Quest/plot thread tracking
- Timeline management
