module.exports = {
    name: "nickname",
    aliases: ["setnick", "নামকরণ"],
    description: "গ্রুপের কোনো মেম্বারের ডাকনাম পরিবর্তন করুন (মেনশন করে নতুন নাম লিখুন)",
    adminOnly: true,

    execute({ api, message, args }) {
        if (Object.keys(message.mentions).length === 0) {
            return api.sendMessage("❌ দয়া করে যাকে নিকনেম দেবেন তাকে মেনশন করুন।", message.threadID, message.messageID);
        }

        const targetID = Object.keys(message.mentions)[0];
        const targetMention = Object.values(message.mentions)[0];
        const newNick = args.join(" ").replace(targetMention, "").trim();

        if (!newNick) {
            return api.sendMessage("❌ নতুন ডাকনামটি উল্লেখ করুন। উদাহরণ: !nickname @ইউজার বল্টু", message.threadID, message.messageID);
        }

        api.changeNickname(newNick, message.threadID, targetID, (err) => {
            if (err) return api.sendMessage("❌ ডাকনাম পরিবর্তন করা সম্ভব হয়নি।", message.threadID, message.messageID);
        });
    }
};
