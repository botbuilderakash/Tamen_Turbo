const fs = require('fs-extra');
const login = require('fca-unofficial');

// কনফিগ ও অ্যাপস্টেট ফাইল লোড করা
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const appState = JSON.parse(fs.readFileSync('./appstate.json', 'utf8'));

// কমান্ড ম্যাপ (GoatBot এর মতো মডিউলার সিস্টেম)
const commands = new Map();

// commands ফোল্ডার থেকে ফাইল লোড করার মেকানিজম
if (!fs.existsSync('./commands')) {
    fs.mkdirSync('./commands');
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name && command.execute) {
        commands.set(command.name.toLowerCase(), command);
        console.log(`[ LOADED ] Command: ${command.name}`);
    }
}

// ফেসবুকে লগইন প্রসেস
login({ appState: appState }, (err, api) => {
    if (err) return console.error("[ ERROR ] Login failed:", err);

    // বটের বেসিক সেটিংস
    api.setOptions({
        listenEvents: true,
        selfListen: false,
        forceLogin: true
    });

    console.log(`[ SUCCESS ] ${config.botName} is now online!`);

    // মেসেজ লিসেনার
    api.listenMqtt((err, message) => {
        if (err) return console.error("[ LISTENER ERROR ]", err);
        if (!message || !message.body) return;

        const messageBody = message.body.trim();

        // প্রিফিক্স চেক করা
        if (messageBody.startsWith(config.prefix)) {
            const args = messageBody.slice(config.prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();

            // কমান্ডটি আমাদের সিস্টেমে আছে কি না
            if (commands.has(commandName)) {
                const command = commands.get(commandName);

                // অ্যাডমিন প্যানেল ভেরিফিকেশন (GoatBot স্টাইল)
                if (command.adminOnly && !config.adminUIDs.includes(message.senderID)) {
                    return api.sendMessage(`[ ACCESS DENIED ] এই কমান্ডটি শুধুমাত্র বটের অ্যাডমিন ব্যবহার করতে পারবেন।`, message.threadID, message.messageID);
                }

                // কমান্ড এক্সিকিউট করা
                try {
                    command.execute({ api, message, args, config });
                } catch (error) {
                    console.error(`[ CMD ERROR ] ${commandName}:`, error);
                    api.sendMessage(`[ ERROR ] কমান্ডটি রান করতে অভ্যন্তরীণ সমস্যা হয়েছে!`, message.threadID, message.messageID);
                }
            }
        }
    });
});
