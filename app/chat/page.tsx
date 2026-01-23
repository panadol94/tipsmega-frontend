import ChatRoom from "../ui/ChatRoom";

export default function ChatPage() {
    return (
        <main className="w-full flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
            <ChatRoom />
        </main>
    );
}
