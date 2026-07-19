module.exports = {
    name: "threadinfo",
    aliases: ["boxinfo", "gcinfo"],
    description: "বর্তমান গ্রুপ চ্যাটের বিস্তারিত তথ্য দেখুন",
    adminOnly: false,

    execute({ api, message }) {
        // গ্রুপের তথ্য নিয়ে আসার মেথড
        api.getThreadInfo(message.threadID, (err, info) => {
            if (err) return api.sendMessage("❌ গ্রুপের তথ্য লোড করা সম্ভব হয়নি।", message.threadID, message.messageID);

            const threadName = info.threadName || "নামহীন গ্রুপ";
            const memberCount = info.participantIDs.length;
            const messageCount = info.messageCount || "অজানা";
            const isGroup = info.isGroup ? "গ্রুপ চ্যাট" : "ব্যক্তিগত ইনবক্স";

            let infoMessage = `📊 ━━━━ [ GROUP INFORMATION ] ━━━━ 📊\n\n`;
            infoMessage += `📝 নাম: ${threadName}\n`;
            infoMessage += `🆔 থ্রেড আইডি: ${message.threadID}\n`;
            infoMessage += `👥 মোট মেম্বার: ${memberCount} জন\n`;
            infoMessage += `💬 মোট মেসেজ সংখ্যা: ${messageCount}\n`;
            infoMessage += `📌 ধরন: ${isGroup}`;

            api.sendMessage(infoMessage, message.threadID, message.messageID);
        });
    }
};
