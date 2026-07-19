module.exports = {
    name: "clean",
    aliases: ["clear", "মুছেফেলো"],
    description: "চ্যাটবক্স পরিষ্কার বা ক্লিয়ার করুন (ফাঁকা স্পেস পাঠিয়ে)",
    adminOnly: true,

    execute({ api, message }) {
        // ৫০টি ফাঁকা লাইন তৈরি করা
        const blankLines = "\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌\n‌";
        api.sendMessage(`🧹 **চ্যাট পরিষ্কার করা হচ্ছে...**${blankLines}✨ চ্যাটবক্স সফলভাবে জটমুক্ত করা হয়েছে!`, message.threadID);
    }
};
