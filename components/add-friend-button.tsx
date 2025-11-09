'use client'

import {User} from "@/app/generated/prisma";
import AddFriend from "@/functions/AddFriend";

export default function AddFriendButton({user}: {user: User}) {
    const handleAddFriend = async () => {
        await AddFriend(user.name, user.username)
    }

    return (
        <button
            onClick={handleAddFriend}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
            Add Friend
        </button>
    )
}