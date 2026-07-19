module.exports = {
    name: "me",
    aliases: ["myinfo", "profile"],
    description: "আপনার নিজের ফেসবুক প্রোফাইলের তথ্য দেখুন",
    adminOnly: false,

    execute({ api, message }) {
        api.getUserInfo(message.senderID, (err, ret) => {
            if (err) return api.sendMessage("❌ তথ্য লোড করা যায়নি।", message.threadID, message.messageID);

            const user = ret[message.senderID];
            let profileMsg = `👤 ━━━━ [ YOUR PROFILE ] ━━━━ 👤\n\n`;
            profileMsg += `📛 নাম: ${user.name}\n`;
            profileMsg += `🆔 আইডি: ${message.senderID}\n`;
            profileMsg += `🌐 প্রোফাইল লিঙ্ক: https://facebook.com/${message.senderID}\n`;
            profileMsg += ` Gender: ${user.gender === 2 ? "পুরুষ" : user.gender === 1 ? "নারী" : "অজানা"}`;

            api.sendMessage(profileMsg, message.threadID, message.messageID);
        });
    }
};
