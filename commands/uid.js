module.exports = {
    name: "uid",
    description: "আপনার বা অন্য কারো ফেসবুক ইউজার আইডি (UID) দেখুন",
    adminOnly: false,

    execute({ api, message, args }) {
        // যদি কাউকে মেনশন করা হয়
        if (Object.keys(message.mentions).length > 0) {
            let replyMessage = "";
            for (let id in message.mentions) {
                replyMessage += `👤 ${message.mentions[id].replace("@", "")}\n🆔 UID: ${id}\n\n`;
            }
            return api.sendMessage(replyMessage.trim(), message.threadID, message.messageID);
        }
        
        // যদি কোনো মেসেজে রিপ্লাই দিয়ে !uid লেখা হয়
        if (message.type === "message_reply") {
            return api.sendMessage(`🆔 রিপ্লাই করা ইউজারের UID: ${message.messageReply.senderID}`, message.threadID, message.messageID);
        }

        // নিজের UID
        api.sendMessage(`🆔 আপনার ফেসবুক UID: ${message.senderID}`, message.threadID, message.messageID);
    }
};
