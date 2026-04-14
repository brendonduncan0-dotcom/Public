import { Plugin, Notice, TFile, PluginSettingTab, App, Setting } from 'obsidian';
import { StatblockConverter } from './converter';
import { ModuleBuilder, ModuleConfig } from './module-builder';
const JSZip = require('jszip');

interface FoundryExporterSettings {
    moduleId: string;
    moduleTitle: string;
    moduleDescription: string;
    moduleVersion: string;
    moduleAuthor: string;
    foundryModulesPath: string;
    statblockSource: 'plugin' | 'vault' | 'both';
}

const DEFAULT_SETTINGS: FoundryExporterSettings = {
    moduleId: 'obsidian-creatures',
    moduleTitle: 'Obsidian Creatures',
    moduleDescription: 'Creatures exported from Obsidian Fantasy Statblocks',
    moduleVersion: '1.0.0',
    moduleAuthor: 'Obsidian User',
    foundryModulesPath: 'C:\\Users\\%USERNAME%\\AppData\\Local\\FoundryVTT\\Data\\modules',
    statblockSource: 'plugin'
};

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

interface StatblockData {
    monsters: [string, StatblockMonster][];
    defaultLayouts?: any;
    layouts?: any[];
    default?: string;
    useDice?: boolean;
    renderDice?: boolean;
    export?: boolean;
    showAdvanced?: boolean;
    version?: any;
    paths?: string[];
    autoParse?: boolean;
    disableSRD?: boolean;
    tryToRenderLinks?: boolean;
    debug?: boolean;
    notifiedOfFantasy?: boolean;
    hideConditionHelp?: boolean;
    alwaysImport?: boolean;
    defaultLayoutsIntegrated?: boolean;
    atomicWrite?: boolean;
}

export default class FoundryVTTExporterPlugin extends Plugin {
    settings: FoundryExporterSettings;

    async onload() {
        console.log('Loading Foundry VTT Exporter plugin');
        
        // Load settings
        await this.loadSettings();

        // Add ribbon icon
        this.addRibbonIcon('download', 'Export to Foundry VTT (D&D 5e)', async () => {
            await this.exportToFoundry();
        });

        // Add command to command palette
        this.addCommand({
            id: 'export-to-foundry',
            name: 'Export statblocks to Foundry VTT (D&D 5e)',
            callback: async () => {
                await this.exportToFoundry();
            }
        });
        
        // Add settings tab
        this.addSettingTab(new FoundryExporterSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async exportToFoundry() {
        new Notice('Starting export process...');
        
        try {
            // Collect statblocks based on source setting
            let allMonsters: [string, StatblockMonster][] = [];
            
            if (this.settings.statblockSource === 'plugin' || this.settings.statblockSource === 'both') {
                // Load from Fantasy Statblocks plugin
                const statblockData = await this.loadStatblockData();
                if (statblockData && statblockData.monsters) {
                    allMonsters = allMonsters.concat(statblockData.monsters);
                    new Notice(`Found ${statblockData.monsters.length} statblock(s) from plugin data`);
                }
            }
            
            if (this.settings.statblockSource === 'vault' || this.settings.statblockSource === 'both') {
                // Load from vault files
                const vaultMonsters = await this.loadStatblocksFromVault();
                allMonsters = allMonsters.concat(vaultMonsters);
                new Notice(`Found ${vaultMonsters.length} statblock(s) from vault files`);
            }
            
            if (allMonsters.length === 0) {
                new Notice('No statblocks found to export.');
                return;
            }
            
            new Notice(`Total: ${allMonsters.length} statblock(s) to export!`);
            
            // Convert each monster to Foundry format
            const foundryActors: any[] = [];
            
            allMonsters.forEach(([name, monster]) => {
                console.log(`Converting: ${name}`, monster);
                const foundryActor = StatblockConverter.convertToFoundry(monster);
                foundryActors.push(foundryActor);
                console.log(`Converted ${name} to Foundry format:`, foundryActor);
            });
            
            new Notice(`Converted ${foundryActors.length} creature(s) to Foundry VTT format!`);
            
            // Create module configuration
            const moduleConfig: ModuleConfig = {
                id: this.settings.moduleId,
                title: this.settings.moduleTitle,
                description: this.settings.moduleDescription,
                version: this.settings.moduleVersion,
                author: this.settings.moduleAuthor
            };
            
            // Generate module structure
            const moduleFiles = ModuleBuilder.createModuleStructure(moduleConfig, foundryActors);
            
            // Log the generated files
            console.log('Generated module files:', moduleFiles);
            
            // Create zip file
            const zip = new JSZip();
            const moduleFolder = zip.folder(moduleConfig.id);
            
            if (!moduleFolder) {
                throw new Error('Failed to create module folder in zip');
            }
            
            // Add all module files to the zip
            for (const [filepath, content] of Object.entries(moduleFiles)) {
                moduleFolder.file(filepath, content);
            }
            
            // Generate the zip file
            new Notice('Creating module zip file...');
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            // Try to extract directly to Foundry modules folder
            try {
                // Check if we're in desktop app (has filesystem access)
                const adapter = this.app.vault.adapter;
                
                if (!(adapter as any).basePath) {
                    throw new Error('Not running in desktop app');
                }
                
                // Expand %USERNAME% in path
                let modulePath = this.settings.foundryModulesPath;
                const basePath = (adapter as any).basePath;
                const userMatch = basePath.match(/Users[\\\/]([^\\\/]+)/i);
                if (userMatch && modulePath.includes('%USERNAME%')) {
                    modulePath = modulePath.replace('%USERNAME%', userMatch[1]);
                }
                
                // Use Obsidian's adapter methods to write files
                const pathModule = require('path');
                const targetPath = pathModule.join(modulePath, moduleConfig.id);
                
                // Check if target directory exists using adapter
                const fsModule = (adapter as any).fs || require('fs');
                
                if (!fsModule.existsSync(modulePath)) {
                    throw new Error(`Foundry modules path does not exist: ${modulePath}`);
                }
                
                // Delete existing module directory if it exists
                if (fsModule.existsSync(targetPath)) {
                    new Notice('Clearing old module files...');
                    fsModule.rmSync(targetPath, { recursive: true, force: true });
                }
                
                // Create fresh module directory
                fsModule.mkdirSync(targetPath, { recursive: true });
                
                // Write all files
                for (const [filepath, content] of Object.entries(moduleFiles)) {
                    const fullPath = pathModule.join(targetPath, filepath);
                    const dir = pathModule.dirname(fullPath);
                    
                    // Create subdirectories if needed
                    if (!fsModule.existsSync(dir)) {
                        fsModule.mkdirSync(dir, { recursive: true });
                    }
                    
                    fsModule.writeFileSync(fullPath, content, 'utf8');
                }
                
                new Notice(`✅ Module installed to Foundry VTT!`);
                new Notice(`Location: ${targetPath}`, 5000);
                new Notice('💡 Reload Foundry VTT to see your creatures.');
                
            } catch (error) {
                // Fallback to download if direct installation fails
                console.error('Could not install directly to Foundry:', error);
                new Notice(`⚠️ Could not auto-install: ${error.message}`);
                new Notice('Downloading zip file instead...');
                
                const url = URL.createObjectURL(zipBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${moduleConfig.id}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                new Notice(`📦 Downloaded ${moduleConfig.id}.zip`);
            }
            
        } catch (error) {
            console.error('Export error:', error);
            new Notice(`Export failed: ${error.message}`);
        }
    }

    async loadStatblockData(): Promise<StatblockData | null> {
        // Try common locations for Fantasy Statblocks plugin data
        const possiblePaths = [
            '.obsidian/plugins/obsidian-5e-statblocks/data.json',
            '.obsidian/plugins/5e-statblocks/data.json',
            '.obsidian/plugins/fantasy-statblocks/data.json'
        ];

        for (const path of possiblePaths) {
            try {
                const adapter = this.app.vault.adapter;
                const exists = await adapter.exists(path);
                
                if (exists) {
                    console.log(`Found statblock data at: ${path}`);
                    const content = await adapter.read(path);
                    const data = JSON.parse(content);
                    return data;
                }
            } catch (error) {
                console.log(`Could not read ${path}:`, error);
            }
        }

        return null;
    }

    async loadStatblocksFromVault(): Promise<[string, StatblockMonster][]> {
        const monsters: [string, StatblockMonster][] = [];
        const files = this.app.vault.getMarkdownFiles();
        
        for (const file of files) {
            try {
                const content = await this.app.vault.read(file);
                const cache = this.app.metadataCache.getFileCache(file);
                
                // Check if file has 'statblock' property in frontmatter
                if (!cache?.frontmatter?.statblock) {
                    continue;
                }
                
                // Extract statblock from code block
                const statblockMatch = content.match(/```statblock\n([\s\S]*?)```/);
                if (!statblockMatch) {
                    console.log(`File ${file.path} has statblock property but no statblock code block`);
                    continue;
                }
                
                const statblockYaml = statblockMatch[1];
                
                // Parse YAML statblock (we'll need to handle this)
                const monster = this.parseStatblockYaml(statblockYaml);
                if (monster) {
                    monsters.push([monster.name, monster]);
                    console.log(`Loaded statblock from ${file.path}: ${monster.name}`);
                }
                
            } catch (error) {
                console.error(`Error reading statblock from ${file.path}:`, error);
            }
        }
        
        return monsters;
    }

    parseStatblockYaml(yaml: string): StatblockMonster | null {
        try {
            const lines = yaml.split('\n');
            const monster: any = {};
            
            let currentKey: string | null = null;
            let currentArray: any[] = [];
            let currentObject: any = null;
            let currentObjectKey: string | null = null;
            let indent = 0;
            let objectIndent = 0;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmed = line.trim();
                
                // Skip empty lines and comments
                if (!trimmed || trimmed.startsWith('#')) continue;
                
                // Calculate indentation
                const currentIndent = line.search(/\S/);
                
                // Line starts with '-' (array item)
                if (trimmed.startsWith('- ')) {
                    // Save previous object if exists
                    if (currentObject) {
                        currentArray.push(currentObject);
                    }
                    
                    const content = trimmed.substring(2).trim();
                    
                    // Check if it's "- key: value" format
                    if (content.includes(':')) {
                        const colonIndex = content.indexOf(':');
                        const key = content.substring(0, colonIndex).trim();
                        let value = content.substring(colonIndex + 1).trim();
                        
                        // Start new object
                        currentObject = {};
                        currentObjectKey = key;
                        objectIndent = currentIndent;
                        
                        // Handle value
                        if (value) {
                            if (!isNaN(Number(value))) {
                                currentObject[key] = Number(value);
                            } else {
                                currentObject[key] = value;
                            }
                        } else {
                            currentObject[key] = '';
                        }
                    } else {
                        // Simple array item
                        currentObject = null;
                        currentObjectKey = null;
                        currentArray.push(content);
                    }
                    
                    indent = currentIndent;
                    continue;
                }
                
                // Regular key: value line
                if (trimmed.includes(':')) {
                    const colonIndex = trimmed.indexOf(':');
                    const key = trimmed.substring(0, colonIndex).trim();
                    let value = trimmed.substring(colonIndex + 1).trim();
                    
                    // Check if we're inside an object (indented more than the array item)
                    if (currentObject && currentIndent > indent) {
                        // Add to current object
                        currentObjectKey = key;
                        
                        if (value) {
                            if (!isNaN(Number(value))) {
                                currentObject[key] = Number(value);
                            } else {
                                currentObject[key] = value;
                            }
                        } else {
                            currentObject[key] = '';
                        }
                        continue;
                    }
                    
                    // Save previous array/object if moving to new key
                    if (currentKey && (currentArray.length > 0 || currentObject)) {
                        if (currentObject) {
                            currentArray.push(currentObject);
                            currentObject = null;
                            currentObjectKey = null;
                        }
                        monster[currentKey] = currentArray;
                        currentArray = [];
                    }
                    
                    // New top-level key
                    if (!value || value === '') {
                        // This starts a new array/object section
                        currentKey = key;
                        currentArray = [];
                        currentObject = null;
                        currentObjectKey = null;
                        indent = currentIndent;
                    } else {
                        // Simple key-value pair
                        currentKey = null;
                        currentObject = null;
                        currentObjectKey = null;
                        
                        // Handle array notation [1, 2, 3]
                        if (value.startsWith('[') && value.endsWith(']')) {
                            const arrayContent = value.slice(1, -1);
                            const items = arrayContent.split(',').map(s => s.trim());
                            const parsedItems = items.map(item => {
                                const num = Number(item);
                                return isNaN(num) ? item : num;
                            });
                            monster[key] = parsedItems;
                        }
                        // Special handling for AC - extract number before parentheses
                        else if (key === 'ac' && value.includes('(')) {
                            const acMatch = value.match(/^(\d+)/);
                            if (acMatch) {
                                monster[key] = Number(acMatch[1]);
                            } else {
                                monster[key] = value;
                            }
                        }
                        // Convert numeric values
                        else if (!isNaN(Number(value))) {
                            monster[key] = Number(value);
                        } else {
                            monster[key] = value;
                        }
                    }
                } else {
                    // Line with no colon - might be a continuation of previous value
                    if (currentObject && currentObjectKey && currentIndent > objectIndent) {
                        // Append to the current object's last key value
                        if (currentObject[currentObjectKey]) {
                            currentObject[currentObjectKey] += ' ' + trimmed;
                        } else {
                            currentObject[currentObjectKey] = trimmed;
                        }
                    }
                }
            }
            
            // Save final array if exists
            if (currentKey && (currentArray.length > 0 || currentObject)) {
                if (currentObject) {
                    currentArray.push(currentObject);
                }
                monster[currentKey] = currentArray;
            }
            
            // Validate required fields
            if (!monster.name) {
                console.error('Statblock missing required field: name');
                return null;
            }
            
            // Ensure stats is an array with 6 values
            if (!Array.isArray(monster.stats)) {
                console.error(`Stats is not an array for ${monster.name}:`, monster.stats);
                monster.stats = [10, 10, 10, 10, 10, 10];
            } else if (monster.stats.length !== 6) {
                console.error(`Stats array has ${monster.stats.length} values instead of 6 for ${monster.name}`);
            }
            
            console.log('Parsed monster:', monster);
            return monster as StatblockMonster;
            
        } catch (error) {
            console.error('Error parsing statblock YAML:', error);
            return null;
        }
    }

    onunload() {
        console.log('Unloading Foundry VTT Exporter plugin');
    }
}

class FoundryExporterSettingTab extends PluginSettingTab {
    plugin: FoundryVTTExporterPlugin;

    constructor(app: App, plugin: FoundryVTTExporterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        containerEl.createEl('h2', {text: 'Foundry VTT Exporter Settings'});
        
        containerEl.createEl('p', {
            text: 'Configure the module metadata for your exports.',
            cls: 'setting-item-description'
        });

        new Setting(containerEl)
            .setName('Module ID')
            .setDesc('Unique identifier for the module (lowercase, no spaces)')
            .addText(text => text
                .setPlaceholder('obsidian-creatures')
                .setValue(this.plugin.settings.moduleId)
                .onChange(async (value) => {
                    this.plugin.settings.moduleId = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Module Title')
            .setDesc('Display name for the module')
            .addText(text => text
                .setPlaceholder('Obsidian Creatures')
                .setValue(this.plugin.settings.moduleTitle)
                .onChange(async (value) => {
                    this.plugin.settings.moduleTitle = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Module Description')
            .setDesc('Brief description of the module')
            .addTextArea(text => text
                .setPlaceholder('Creatures exported from Obsidian Fantasy Statblocks')
                .setValue(this.plugin.settings.moduleDescription)
                .onChange(async (value) => {
                    this.plugin.settings.moduleDescription = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Module Version')
            .setDesc('Version number (e.g., 1.0.0)')
            .addText(text => text
                .setPlaceholder('1.0.0')
                .setValue(this.plugin.settings.moduleVersion)
                .onChange(async (value) => {
                    this.plugin.settings.moduleVersion = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Module Author')
            .setDesc('Your name')
            .addText(text => text
                .setPlaceholder('Your Name')
                .setValue(this.plugin.settings.moduleAuthor)
                .onChange(async (value) => {
                    this.plugin.settings.moduleAuthor = value;
                    await this.plugin.saveSettings();
                }));

        containerEl.createEl('h3', {text: 'Foundry VTT Integration'});

        new Setting(containerEl)
            .setName('Statblock Source')
            .setDesc('Choose where to read statblocks from')
            .addDropdown(dropdown => dropdown
                .addOption('plugin', 'Fantasy Statblocks Plugin Data')
                .addOption('vault', 'Vault Files (YAML: statblock property)')
                .addOption('both', 'Both Plugin and Vault Files')
                .setValue(this.plugin.settings.statblockSource)
                .onChange(async (value: 'plugin' | 'vault' | 'both') => {
                    this.plugin.settings.statblockSource = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Foundry Modules Path')
            .setDesc('Path to your Foundry VTT modules folder. Use %USERNAME% for current user.')
            .addText(text => text
                .setPlaceholder('C:\\Users\\%USERNAME%\\AppData\\Local\\FoundryVTT\\Data\\modules')
                .setValue(this.plugin.settings.foundryModulesPath)
                .onChange(async (value) => {
                    this.plugin.settings.foundryModulesPath = value;
                    await this.plugin.saveSettings();
                })
                .inputEl.size = 60);

        containerEl.createEl('p', {
            text: 'When configured, the plugin will automatically install modules directly to Foundry instead of downloading a zip file.',
            cls: 'setting-item-description'
        });
    }
}