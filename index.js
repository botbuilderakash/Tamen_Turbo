const login = require("facebook-chat-api");

// সরাসরি ফাইল থেকে না পড়ে, এটি হোস্টিং সার্ভারের সিকিউর এনভায়রনমেন্ট থেকে অ্যাপস্টেট নিবে
const appStateString = process.env.APPSTATE;

if (!appStateString) {
    console.error("Error: APPSTATE environment variable is missing!");
    process.exit(1);
}

const credentials = { appState: JSON.parse(appStateString) };

const BOT_CONFIG = {
    prefix: "/", 
    botName: "Watashi-Bot" 
};

login(credentials, (err, api) => {
    if (err) return console.error("Error logging in:", err);

    console.log(`${BOT_CONFIG.botName} is now online! Yosh, ikuzo!`);

    api.listenMqtt((err, message) => {
        if (err) return console.error(err);

        if (message.type === "message" && message.body) {
            const input = message.body.trim();

            if (input.startsWith(BOT_CONFIG.prefix)) {
                const args = input.slice(BOT_CONFIG.prefix.length).split(/ +/);
                const command = args.shift().toLowerCase();

                // === COMMANDS ===
                if (command === "help") {
                    const helpText = `🤖 [ ${BOT_CONFIG.botName} - System Menu ]\n\n` +
                                     `📌 ${BOT_CONFIG.prefix}ping - Check bot status\n` +
                                     `📌 ${BOT_CONFIG.prefix}say [text] - Make the bot talk`;
                    api.sendMessage(helpText, message.threadID);
                }

                else if (command === "ping") {
                    api.sendMessage("Ore wa online active! Daijoubu desu yo! ⚡", message.threadID);
                }

                else if (command === "say") {
                    const speech = args.join(" ");
                    if (!speech) {
                        api.sendMessage(`⚠️ Baka! Input some text. Example: ${BOT_CONFIG.prefix}say Konnichiwa`, message.threadID);
                    } else {
                        api.sendMessage(speech, message.threadID);
                    }
                }

                else {
                    api.sendMessage(`❌ Gomen, ore wa don't know this command. Type ${BOT_CONFIG.prefix}help to see the menu.`, message.threadID);
                }
            }
        }
    });
});
