module.exports = {
    name: "unsend",
    aliases: ["del", "remove"], // নতুন GoatBot স্টাইল অ্যালিয়াস
    description: "বটের পাঠানো যেকোনো মেসেজ আনসেন্ড করুন (মেসেজে রিপ্লাই দিয়ে ব্যবহার করুন)",
    adminOnly: false,

    execute({ api, message }) {
        // চেক করা হচ্ছে মেসেজটি কোনো রিপ্লাই মেসেজ কি না
        if (message.type !== "message_reply") {
            return api.sendMessage("❌ বটের যে মেসেজটি আনসেন্ড করতে চান, সেটির ওপর রিপ্লাই দিয়ে এই কমান্ডটি লিখুন।", message.threadID, message.messageID);
        }

        // চেক করা হচ্ছে রিপ্লাই করা মেসেজটি বটের নিজের কি না
        if (message.messageReply.senderID != api.getCurrentUserID()) {
            return api.sendMessage("❌ আমি অন্য কারো মেসেজ আনসেন্ড করতে পারব না, শুধুমাত্র আমার পাঠানো মেসেজ আনসেন্ড করতে পারব।", message.threadID, message.messageID);
        }

        // মেসেজ আনসেন্ড করার অফিশিয়াল মেথড
        api.unsendMessage(message.messageReply.messageID, (err) => {
            if (err) return api.sendMessage("❌ মেসেজটি আনসেন্ড করা সম্ভব হয়নি।", message.threadID, message.messageID);
        });
    }
};
