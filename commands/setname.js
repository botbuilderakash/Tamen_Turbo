module.exports = {
    name: "setname",
    aliases: ["changename", "groupname"],
    description: "গ্রুপ চ্যাটের নাম পরিবর্তন করুন",
    adminOnly: true,

    execute({ api, message, args }) {
        const newName = args.join(" ");
        if (!newName) {
            return api.sendMessage("❌ নতুন নামটি লিখুন। উদাহরণ: !setname বন্ধুদের আড্ডা", message.threadID, message.messageID);
        }

        api.setTitle(newName, message.threadID, (err) => {
            if (err) return api.sendMessage("❌ গ্রুপের নাম পরিবর্তন করা যায়নি। নিশ্চিত করুন আমি অ্যাডমিন কি না।", message.threadID, message.messageID);
        });
    }
};
