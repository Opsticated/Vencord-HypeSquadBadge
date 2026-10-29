import definePlugin from "@utils/types";
import { showNotification } from "@api/Notifications";
import { ApplicationCommandInputType } from "@api/Commands";

const notificationTitle = "HypeSquad Badge";

/**
 * Sets the HypeSquad badge for the user.
 * @param num 0 - Remove badge, 1 - Bravery, 2 - Brilliance, 3 - Balance
 */
async function setBadge(num: 0 | 1 | 2 | 3): Promise<boolean> {
    // @ts-ignore
    const webpackRequire = webpackChunkdiscord_app.push([
        [Symbol()],
        {},
        (r: any) => r,
    ]);
    // @ts-ignore
    webpackChunkdiscord_app.pop();
    let modules = webpackRequire.m;
    let cache = webpackRequire.c;

    function findByCode(src: string) {
        for (const [id, mod] of Object.entries(modules))
            // @ts-ignore
            if (mod.toString().includes(src))
                return cache[id].exports;
        return null;
    }

    function findObjectFromKey(exports: any, key: string) {
        if (!exports) return;
        for (const exportKey in exports) {
            const obj = exports[exportKey];
            if (obj && obj[key]) return obj;
        }
    }

    const api = findObjectFromKey(findByCode('.set("X-Audit-Log-Reason",'), "patch");

    const res = (num === 0) ? await api.del({ url: "/hypesquad/online" }) :
        await api.post({ url: "/hypesquad/online", body: { house_id: num } });

    return res.ok;
}

export default definePlugin({
    name: "HypeSquadBadge",
    description: "Adds a slash command that let's the user set the HypeSquad badge since that's no longer possible via user settings." +
        " Use it by typing /hypesquad and selecting one of the houses.",
    authors: [{ name: "David2379", id: 681245724691660828n }],

    commands: [
        {
            name: "hypesquad",
            description: "Sets the HypeSquad badge.",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [
                {
                    name: "house",
                    description: "Choose which HypeSquad house to set your badge to.",
                    type: 3,
                    required: true,
                    choices: [
                        { name: "Bravery", value: "bravery", label: "Bravery House" },
                        { name: "Brilliance", value: "brilliance", label: "Brilliance House" },
                        { name: "Balance", value: "balance", label: "Balance House" },
                        { name: "Remove HypeSquad", value: "remove", label: "Remove HypeSquad Badge" }
                    ]
                }
            ],

            execute: async (args) => {
                const selected = args.find(
                    arg => arg.name === "house"
                )?.value;

                let res: boolean | undefined;

                switch (selected) {

                    /** GIVE BRAVERY BADGE */
                    case "bravery":
                        res = await setBadge(1)
                        break;

                    /** GIVE BRILLIANCE BADGE */
                    case "brilliance":
                        res = await setBadge(2)
                        break;

                    /** GIVE BALANCE BADGE */
                    case "balance":
                        res = await setBadge(3)
                        break;

                    /** REMOVE BADGE */
                    case "remove":
                        res = await setBadge(0)
                        break;

                    /** INVALID HOUSE */
                    default:
                        void showNotification({
                            title: notificationTitle,
                            body: "Invalid house selected.",
                        });
                        break;
                }

                if (res) {
                    const name = `${selected?.charAt(0).toUpperCase()}${selected?.slice(1)}`;
                    if (selected === "remove") void showNotification({
                        title: notificationTitle,
                        body: "Removed HypeSquad badge.",
                    })
                    else void showNotification({
                        title: notificationTitle,
                        body: `Given ${name} HypeSquad badge.`,
                    })
                }
                else void showNotification({
                    title: notificationTitle,
                    body: "Failed to set HypeSquad badge.",
                })

                return;
            }
        }
    ]
});
