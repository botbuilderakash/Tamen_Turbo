module.exports = {
    name: "game",
    description: "কয়েন ফ্লিপ করে হেড বা টেইল ভাগ্য পরীক্ষা করুন",
    adminOnly: false,

    execute({ api, message }) {
        const outcomes = ["🪙 HEAD (হেড)", "🪙 TAIL (টেইল)"];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];
        
        api.sendMessage("🪙 কয়েনটি বাতাসে ঘুরছে...", message.threadID, (err, info) => {
            // ১.৫ সেকেন্ড পর ফলাফল দেখাবে (Real effect দেওয়ার জন্য)
            setTimeout(() => {
                api.sendMessage(`🎯 **ফলাফল:**\n\nআপনার ভাগ্যে এসেছে: ${result}`, message.threadID, message.messageID);
            }, 1500);
        });
    }
};
