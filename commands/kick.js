module.exports = {
    name: "kick",
    aliases: ["removemember", "out"],
    description: "গ্রুপের কোনো মেম্বারকে বের করে দিন (মেনশন বা রিপ্লাই করে ব্যবহার করুন)",
    adminOnly: true, // শুধুমাত্র আপনার config.json এ থাকা অ্যাডমিনরা এটি করতে পারবেন

    execute({ api, message }) {
        let targetID = null;

        if (message.type === "message_reply") {
            targetID = message.messageReply.senderID;
        } else if (Object.keys(message.mentions).length > 0) {
            targetID = Object.keys(message.mentions)[0];
        }

        if (!targetID) {
            return api.sendMessage("❌ দয়া করে যাকে কিক করতে চান তাকে মেনশন করুন অথবা তার মেসেজে রিপ্লাই দিয়ে কমান্ডটি লিখুন।", message.threadID, message.messageID);
        }

        if (targetID == api.getCurrentUserID()) {
            return api.sendMessage("❌ আমি নিজেকে গ্রুপ থেকে বের করতে পারব না!", message.threadID, message.messageID);
        }

        // ফেসবুক গ্রুপ থেকে মেম্বার রিমুভ করার অফিশিয়াল মেথড
        api.removeUserFromGroup(targetID, message.threadID, (err) => {
            if (err) {
                return api.sendMessage("❌ মেম্বারটিকে রিমুভ করা যায়নি। নিশ্চিত করুন আমি এই গ্রুপের অ্যাডমিন কি না।", message.threadID, message.messageID);
            }
        });
    }
};
