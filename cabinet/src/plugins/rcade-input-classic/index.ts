import { MessageChannelMain, MessagePortMain } from "electron";

const MAP = {
    "ArrowUp": { type: "button", player: 1, button: "UP" },
    "ArrowDown": { type: "button", player: 1, button: "DOWN" },
    "ArrowLeft": { type: "button", player: 1, button: "LEFT" },
    "ArrowRight": { type: "button", player: 1, button: "RIGHT" },
    "ControlLeft": { type: "button", player: 1, button: "A" },
    "AltLeft": { type: "button", player: 1, button: "B" },

    "KeyR": { type: "button", player: 2, button: "UP" },
    "KeyF": { type: "button", player: 2, button: "DOWN" },
    "KeyD": { type: "button", player: 2, button: "LEFT" },
    "KeyG": { type: "button", player: 2, button: "RIGHT" },
    "KeyA": { type: "button", player: 2, button: "A" },
    "KeyS": { type: "button", player: 2, button: "B" },

    "Digit1": { type: "system", player: 0, button: "ONE_PLAYER" },
    "Digit2": { type: "system", player: 0, button: "TWO_PLAYER" },
} as const;

async function main(web: Electron.WebContents, port: MessagePortMain) {
    web.on('before-input-event', (event, input) => {
        const mapping = MAP[input.code as keyof typeof MAP];

        if (mapping) {
            const message = {
                ...mapping,
                pressed: input.type === "keyDown"
            };

            port.postMessage(message);
        }
    })
}

export function rcadeInputClassic(web: Electron.WebContents): MessagePortMain {
    const channel = new MessageChannelMain();

    main(web, channel.port1)

    return channel.port2;
}