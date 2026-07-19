const fs = require('fs-extra');

module.exports = {
    name: "help",
    description: "বটের সমস্ত কমান্ডের তালিকা এবং ব্যবহার বিধি",
    adminOnly: false, // এটি false থাকায় সাধারণ ইউজাররাও ব্যবহার করতে পারবে

    execute({ api, message, args, config }) {
        let helpMessage = `🤖 ━━━━ [ ${config.botName} HELP ] ━━━━ 🤖\n\n`;
        helpMessage += `📌 বটের প্রিফিক্স (Prefix): "${config.prefix}"\n`;
        helpMessage += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
        helpMessage += `💡 উপলব্ধ কমান্ডসমূহের তালিকা:\n\n`;

        // commands ফোল্ডার থেকে ফাইলগুলোর নাম ও বিবরণ রিড করা
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        
        let count = 1;
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.name) {
                const description = command.description || "কোনো বিবরণ দেওয়া নেই।";
                const role = command.adminOnly ? "🛑 Admin Only" : "👥 All Users";
                
                helpMessage += `${count}. 【 ${config.prefix}${command.name} 】\n`;
                helpMessage += `   🔹 বিবরণ: ${description}\n`;
                helpMessage += `   🔹 পারমিশন: ${role}\n\n`;
                count++;
            }
        }

        helpMessage += `━━━━━━━━━━━━━━━━━━━━━\n`;
        helpMessage += `📝 যেকোনো কমান্ড ব্যবহার করতে প্রথমে প্রিফিক্সটি ব্যবহার করুন (যেমন: ${config.prefix}help)`;

        api.sendMessage(helpMessage, message.threadID, message.messageID);
    }
};
