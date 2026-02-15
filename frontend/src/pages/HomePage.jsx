import { useChatStore } from "../store/UseChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>

    </div>
  );
}

export default HomePage;
