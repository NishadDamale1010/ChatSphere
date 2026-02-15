import { useEffect } from "react";
import { useChatStore } from "../store/UseChatStore";
import { Loader } from "lucide-react";

function Sidebar() {
    const {
        users,
        selectedUser,
        setSelectedUser,
        getUsers,
        isUsersLoading,
    } = useChatStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="w-80 bg-white border-r flex flex-col">

            {/* Header */}
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Chats</h2>
            </div>

            {/* Loading */}
            {isUsersLoading && (
                <div className="flex justify-center items-center flex-1">
                    <Loader className="animate-spin" />
                </div>
            )}

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
                {users.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`p-4 cursor-pointer hover:bg-gray-100 transition ${selectedUser?._id === user._id
                                ? "bg-blue-100"
                                : ""
                            }`}
                    >
                        <div className="flex items-center gap-3">

                            {/* Avatar */}
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                {user.fullName?.charAt(0).toUpperCase()}
                            </div>

                            {/* Name */}
                            <div>
                                <p className="font-medium">{user.fullName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
