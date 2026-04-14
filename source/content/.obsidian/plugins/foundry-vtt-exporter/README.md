# Foundry VTT Exporter for Obsidian

An Obsidian community plugin that exports Fantasy Statblocks to Foundry VTT as a module with compendiums.

## Features

- ✅ Basic plugin structure
- 🚧 Parse Fantasy Statblocks data.json
- 🚧 Convert statblocks to Foundry VTT format
- 🚧 Generate Foundry VTT module structure
- 🚧 Export as downloadable module

## Installation for Development

1. Clone this repo into your vault's `.obsidian/plugins/` folder:
   ```bash
   cd /path/to/your/vault/.obsidian/plugins
   git clone <your-repo-url> foundry-vtt-exporter
   cd foundry-vtt-exporter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Enable the plugin in Obsidian:
   - Open Settings → Community plugins
   - Reload plugins
   - Enable "Foundry VTT Exporter"

## Development

To run in development mode with auto-rebuild:
```bash
npm run dev
```

## Usage

1. Ensure you have the Fantasy Statblocks plugin installed and have created some creatures
2. Click the download icon in the ribbon, or use the command palette: "Export statblocks to Foundry VTT"
3. The plugin will create a Foundry VTT module from your statblocks

## Roadmap

### Version 0.1.0 (Current)
- [x] Basic plugin structure
- [x] Ribbon icon and command palette integration
- [ ] Locate and parse Fantasy Statblocks data.json

### Version 0.2.0
- [ ] Convert statblock format to Foundry VTT actor format
- [ ] Support for different game systems (D&D 5e, PF2e, etc.)

### Version 0.3.0
- [ ] Generate Foundry VTT module structure
- [ ] Create compendium files
- [ ] Generate module.json

### Version 0.4.0
- [ ] Export as downloadable .zip module
- [ ] Settings page for configuration

## License

MIT
