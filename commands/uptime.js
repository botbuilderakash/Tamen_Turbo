module.exports = {
    name: "uptime",
    aliases: ["up", "status"],
    description: "বটটি একটানা কতক্ষণ ধরে অনলাইনে অ্যাক্টিভ আছে তা দেখুন",
    adminOnly: false,

    execute({ api, message, config }) {
        // প্রসেস চালু হওয়ার সময় থেকে বর্তমান সময়ের ব্যবধান হিসাব করা
        const uptimeInSeconds = process.uptime();
        
        const hours = Math.floor(uptimeInSeconds / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeInSeconds % 60);

        let uptimeString = `🟢 [ ${config.botName} SYSTEM STATUS ] 🟢\n\n`;
        uptimeString += `⏱️ আপটাইম: ${hours} ঘণ্টা, ${minutes} মিনিট, ${seconds} সেকেন্ড\n`;
        uptimeString += `📊 সিস্টেম স্ট্যাটাস: সচল ও স্থিতিশীল\n`;
        uptimeString += `⚙️ ফ্রেমওয়ার্ক: কাস্টম গোটবট আর্কিটেকচার V2`;

        api.sendMessage(uptimeString, message.threadID, message.messageID);
    }
};
