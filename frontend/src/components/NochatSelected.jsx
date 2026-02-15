import { MessageSquare } from "lucide-react";

function NoChatSelected() {
    return (
        <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">

                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={28} />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                    Welcome to ChatSphere
                </h2>

                <p className="text-gray-500">
                    Select a conversation to start chatting
                </p>
            </div>
        </div>
    );
}

export default NoChatSelected;
