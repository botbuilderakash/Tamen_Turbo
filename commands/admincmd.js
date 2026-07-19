module.exports = {
    name: "admincmd",
    description: "শুধুমাত্র বটের অ্যাডমিনদের জন্য বিশেষ কমান্ড",
    adminOnly: true, // এটি true থাকায় index.js ফাইল অটোমেটিক অ্যাডমিন চেক করবে

    execute({ api, message, args, config }) {
        // বটের অ্যাডমিনদের একটি স্বাগতম মেসেজ পাঠানো
        const adminName = config.botOwners && config.botOwners[0] ? config.botOwners[0] : "অ্যাডমিন";
        
        let responseMessage = `⚙️ [ ADMIN PANEL ACTIVE ] ⚙️\n\n`;
        responseMessage += `স্বাগতম ${adminName}!\n`;
        responseMessage += `আপনার আইডি সফলভাবে অ্যাডমিন প্যানেলে ভেরিফাই হয়েছে।\n\n`;
        responseMessage += `বটের বর্তমান নাম: ${config.configName || config.botName}\n`;
        responseMessage += `টোটাল অ্যাডমিন সংখ্যা: ${config.adminUIDs.length} জন।`;

        api.sendMessage(responseMessage, message.threadID, message.messageID);
    }
};
