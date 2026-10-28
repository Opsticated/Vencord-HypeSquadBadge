# HypeSquadBadge

Adds a slash command to change your Discord HypeSquad badge, since this option is no longer available through user settings.

## Disclaimer

**This plugin is for testing purposes only. Its behavior goes against Discord's Terms of Service, so it should not be used in the official Discord app.**

## Installation

This is a custom plugin for a Vencord build from source.

1. Pull this repository into `src/userplugins/`.
2. Quit Discord, rebuild Vencord and inject the new build into your client.
3. Enable **HypeSquadBadge** in Vencord's plugin settings.

## How to Use

Type `/hypesquad` in Discord and select the HypeSquad house you want to set your badge to.

Available houses:

- **Bravery** — Sets your badge to the Bravery House.
- **Brilliance** — Sets your badge to the Brilliance House.
- **Balance** — Sets your badge to the Balance House.

A notification will appear when the plugin processes your selection.

## Known Issues

- The plugin relies on Discord's internal webpack modules and API endpoints, which may change and cause the plugin to stop working.
- The plugin does not include explicit error handling for failed API requests.

## Credits

Credit to [1r97](https://github.com/1r97) for creating the base script used in this plugin.
