export type AutoMessage = {
    id: string;
    category: "win" | "question" | "tip" | "activity" | "social";
    text: string;
    weight: number;
};

export const AUTO_MESSAGES: AutoMessage[] = [
    // Win Celebrations (30%)
    { id: "w1", category: "win", text: "Boss just menang RM8k dekat Great Blue! RTP memang padu hari ni 🔥", weight: 30 },
    { id: "w2", category: "win", text: "Alhamdulillah cuci RM12k tadi, terima kasih tips scanner! 💰", weight: 30 },
    { id: "w3", category: "win", text: "Safari Heat free spin 50x! Mantap betul 🎰", weight: 30 },
    { id: "w4", category: "win", text: "Menang RM5k sahaja tapi dah cukup untuk bayar bil bulan ni haha", weight: 30 },
    { id: "w5", category: "win", text: "Great Blue jackpot! RM15k masuk! Thanks scanner RTP 🙏", weight: 30 },
    { id: "w6", category: "win", text: "Game King bagi RM6k tadi, confirm hot period ni", weight: 30 },
    { id: "w7", category: "win", text: "Highway Kings x100 multiplier! Gila punya lucky 🚀", weight: 30 },
    { id: "w8", category: "win", text: "Dolphin Reef jackpot RM9k! Modal cuma RM200 je 😱", weight: 30 },

    // Questions/Discussions (25%)
    { id: "q1", category: "question", text: "Ada sesiapa try Game King tak? Worth it ke?", weight: 25 },
    { id: "q2", category: "question", text: "Bila best time main Safari Heat ah? Pagi ke malam?", weight: 25 },
    { id: "q3", category: "question", text: "RTP sekarang berapa percent? Nak scan dulu", weight: 25 },
    { id: "q4", category: "question", text: "Company mana paling cepat withdraw? Ada recommendation?", weight: 25 },
    { id: "q5", category: "question", text: "Great Blue atau Dolphin Reef better? Mana RTP lagi tinggi?", weight: 25 },
    { id: "q6", category: "question", text: "Bonus 100% tu worth it claim tak? Ada T&C ketat?", weight: 25 },
    { id: "q7", category: "question", text: "Minimum deposit berapa untuk dapat bonus welcome?", weight: 25 },
    { id: "q8", category: "question", text: "Ada group Telegram ke? Nak join community", weight: 25 },

    // Tips Sharing (20%)
    { id: "t1", category: "tip", text: "Pro tip: Scan RTP dulu before main, confirm menang lebih 💡", weight: 20 },
    { id: "t2", category: "tip", text: "Jangan main time RTP bawah 80%, rugi je guys", weight: 20 },
    { id: "t3", category: "tip", text: "Best main slot yang baru keluar, usually RTP high", weight: 20 },
    { id: "t4", category: "tip", text: "Set limit dulu sebelum main, jangan serakah nanti balik modal kosong", weight: 20 },
    { id: "t5", category: "tip", text: "Kalau RTP above 90%, tekan bet besar sikit confirm cuci!", weight: 20 },
    { id: "t6", category: "tip", text: "Main masa tengah malam RTP lagi stable, kurang player compete", weight: 20 },
    { id: "t7", category: "tip", text: "Jangan chase loss! Kalau rugi stop dulu, datang esok", weight: 20 },
    { id: "t8", category: "tip", text: "Guna scanner ni everyday, track pattern senang menang", weight: 20 },

    // Activity Updates (15%)
    { id: "a1", category: "activity", text: "Baru register dekat MBI8, bonus 100% gila! 🎁", weight: 15 },
    { id: "a2", category: "activity", text: "Ada group WhatsApp tak? Nak join komuniti", weight: 15 },
    { id: "a3", category: "activity", text: "Dah cuba 5 company, yang ni paling cepat withdraw", weight: 15 },
    { id: "a4", category: "activity", text: "First time guna scanner ni, so far accurate!", weight: 15 },
    { id: "a5", category: "activity", text: "Baru withdraw RM8k, dalam 15 minit dah masuk bank! Fast gila", weight: 15 },
    { id: "a6", category: "activity", text: "Claim daily bonus stars, dapat 5 free scans!", weight: 15 },
    { id: "a7", category: "activity", text: "Platform verified semua bayar, confirm legit", weight: 15 },
    { id: "a8", category: "activity", text: "Scanner prediction 98% accurate, memang power!", weight: 15 },

    // Gratitude/Social (10%)
    { id: "s1", category: "social", text: "Thanks admin sharing trusted list, semua platform bayar! 👍", weight: 10 },
    { id: "s2", category: "social", text: "Komuniti sini memang helpful, respect! 👊", weight: 10 },
    { id: "s3", category: "social", text: "Siapa online sekarang? Jom share tips", weight: 10 },
    { id: "s4", category: "social", text: "Terima kasih kepada yang share tips tadi! 🙏", weight: 10 },
    { id: "s5", category: "social", text: "Good luck semua! Moga menang besar hari ni 🍀", weight: 10 },
    { id: "s6", category: "social", text: "Newbie friendly ke sini? Nak belajar main", weight: 10 },
    { id: "s7", category: "social", text: "Scanner ni game changer! Menang rate naik 60%", weight: 10 },
    { id: "s8", category: "social", text: "Dah dapat WhatsApp admin, service 24/7 memang topnotch", weight: 10 },
];

export const AUTO_USERNAMES = [
    "Ahmad92",
    "SitiGamer",
    "Razak88",
    "FarahWin",
    "Danial777",
    "NurAlisa",
    "Hafiz_Pro",
    "Maya888",
    "Zul_MegaWin",
    "Aina_Slot",
    "Hakimi_Cuci",
    "Sofia_Lucky",
    "Imran_RTP",
    "Nadia_Jackpot",
    "Azman_Pro",
    "Lisa_Star",
    "Firdaus_88",
    "Bella_Menang",
    "Syukri_King",
    "Hana_Gamer",
    "Rizal_Padu",
    "Amira_Win",
    "Hakim_Pro88",
    "Zara_Mega",
    "Aiman_Lucky7"
];
