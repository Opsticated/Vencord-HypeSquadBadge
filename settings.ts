import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export default definePluginSettings({
    checkForUpdates: {
        type: OptionType.BOOLEAN,
        description: "Check for updates to the plugin on startup.",
        default: true,
    },
});
