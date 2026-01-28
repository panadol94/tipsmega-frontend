import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { AUTO_MESSAGES, AUTO_USERNAMES } from "../data/autoMessages";

const LAST_MESSAGE_TIME_KEY = "chat_last_auto_message";
const MESSAGE_HISTORY_KEY = "chat_auto_message_history";
const MIN_INTERVAL = 90 * 60 * 1000; // 90 minutes in milliseconds
const MAX_INTERVAL = 240 * 60 * 1000; // 240 minutes
const ACTIVE_HOURS_START = 9; // 9 AM
const ACTIVE_HOURS_END = 23; // 11 PM

type User = {
    username: string;
    token: string;
} | null;

function isActiveHours(): boolean {
    const now = new Date();
    const hour = now.getHours();
    return hour >= ACTIVE_HOURS_START && hour < ACTIVE_HOURS_END;
}

function getRandomInterval(): number {
    return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
}

function selectRandomMessage(): typeof AUTO_MESSAGES[0] {
    // Get message history
    const historyStr = localStorage.getItem(MESSAGE_HISTORY_KEY);
    const history: string[] = historyStr ? JSON.parse(historyStr) : [];

    // Filter out recently used messages (last 10)
    const availableMessages = AUTO_MESSAGES.filter(msg => !history.includes(msg.id));

    // If all messages have been used, reset history
    const messagesToUse = availableMessages.length > 0 ? availableMessages : AUTO_MESSAGES;

    // Weighted random selection
    const totalWeight = messagesToUse.reduce((sum, msg) => sum + msg.weight, 0);
    let random = Math.random() * totalWeight;

    for (const msg of messagesToUse) {
        random -= msg.weight;
        if (random <= 0) {
            return msg;
        }
    }

    return messagesToUse[0]; // fallback
}

function selectRandomUsername(): string {
    return AUTO_USERNAMES[Math.floor(Math.random() * AUTO_USERNAMES.length)];
}

function updateMessageHistory(messageId: string) {
    const historyStr = localStorage.getItem(MESSAGE_HISTORY_KEY);
    const history: string[] = historyStr ? JSON.parse(historyStr) : [];

    // Add new message and keep only last 10
    history.push(messageId);
    const trimmedHistory = history.slice(-10);

    localStorage.setItem(MESSAGE_HISTORY_KEY, JSON.stringify(trimmedHistory));
}

function shouldSendMessage(lastTimeStr: string | null, now: number): boolean {
    if (!isActiveHours()) {
        return false;
    }

    if (!lastTimeStr) {
        // First time - send immediately
        return true;
    }

    const lastTime = parseInt(lastTimeStr);
    const elapsed = now - lastTime;
    const randomInterval = getRandomInterval();

    return elapsed >= randomInterval;
}

export function useAutoMessages(socket: Socket | null, roomId: string, user: User) {
    useEffect(() => {
        // Only run for non-logged-in users to avoid spam from multiple tabs
        if (!socket || user?.username !== "Guest") return;

        const checkAndSendMessage = () => {
            const lastTime = localStorage.getItem(LAST_MESSAGE_TIME_KEY);
            const now = Date.now();

            if (shouldSendMessage(lastTime, now)) {
                const message = selectRandomMessage();
                const username = selectRandomUsername();

                // Send via socket as a regular message
                socket.emit("send_message", {
                    roomId,
                    sender: username,
                    content: message.text,
                });

                // Update localStorage
                localStorage.setItem(LAST_MESSAGE_TIME_KEY, now.toString());
                updateMessageHistory(message.id);

                console.log(`🤖 Auto-message sent: "${message.text}" by ${username}`);
            }
        };

        // Check on mount and every 30 minutes
        checkAndSendMessage();
        const interval = setInterval(checkAndSendMessage, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, [socket, roomId, user]);
}
