const fs = require('fs-extra');
const login = require('fca-unofficial');

// কনফিগ ও অ্যাপস্টেট লোড
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const appState = JSON.parse(fs.readFileSync('./appstate.json', 'utf8'));

const commands = new Map();
const aliases = new Map(); // লেটেস্ট GoatBot-এর উপনাম (Alias) সিস্টেম

// কমান্ড ও অ্যালিয়াস লোড করার মেকানিজম
if (!fs.existsSync('./commands')) fs.mkdirSync('./commands');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name && command.execute) {
        commands.set(command.name.toLowerCase(), command);
        
        // যদি কমান্ডের কোনো অল্টারনেটিভ নাম (aliases) থাকে
        if (command.aliases && Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
                aliases.set(alias.toLowerCase(), command.name.toLowerCase());
            }
        }
        console.log(`[ LOADED ] Command: ${command.name}`);
    }
}

// ফেসবুকে লগইন
login({ appState: appState }, (err, api) => {
    if (err) return console.error("[ LOGIN ERROR ]", err);

    // লেটেस्ट GoatBot সিকিউরিটি অপশনস (অ্যাকাউন্ট সেফ রাখার জন্য)
    api.setOptions({
        listenEvents: true,
        selfListen: false,
        forceLogin: true,
        autoMarkDelivery: true, // মেসেজ ডেলিভারি মার্ক করা (হিউম্যান বিহেভিয়ার ইমুলেট করতে)
        onlineStatus: true      // বটকে সবসময় অনলাইনে দেখাবে
    });

    console.log(`[ SUCCESS ] ${config.botName} is successfully synchronized with GoatBot Architecture!`);

    api.listenMqtt((err, message) => {
        if (err) return console.error("[ LISTENER ERROR ]", err);
        if (!message || !message.body) return;

        const messageBody = message.body.trim();

        // প্রিফিক্স চেক
        if (messageBody.startsWith(config.prefix)) {
            const args = messageBody.slice(config.prefix.length).split(/ +/);
            let commandName = args.shift().toLowerCase();

            // যদি মেইন কমান্ড না পেয়ে অ্যালিয়াস (Alias) ম্যাচ করে
            if (!commands.has(commandName) && aliases.has(commandName)) {
                commandName = aliases.get(commandName);
            }

            if (commands.has(commandName)) {
                const command = commands.get(commandName);

                // অ্যাডমিন প্যানেল ভেরিফিকেশন
                if (command.adminOnly && !config.adminUIDs.includes(message.senderID)) {
                    return api.sendMessage(`🛑 [ ACCESS DENIED ] এই কমান্ডটি শুধু অ্যাডমিনদের জন্য রিজার্ভড।`, message.threadID, message.messageID);
                }

                // টাইপিং ইফেক্ট (Latest GoatBot Style)
                // কমান্ড রান করার আগে বট চ্যাটে "typing..." দেখাবে
                api.sendTypingIndicator(message.threadID, (err) => {
                    try {
                        command.execute({ api, message, args, config });
                    } catch (error) {
                        console.error(`[ EXECUTION ERROR ] ${commandName}:`, error);
                        api.sendMessage(`❌ এই কমান্ডটি রান করার সময় ব্যাকএন্ডে ক্র্যাশ করেছে!`, message.threadID, message.messageID);
                    }
                });
            }
        }
    });
});
