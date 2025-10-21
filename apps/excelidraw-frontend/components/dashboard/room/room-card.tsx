"use client";

import React, { useState } from "react";
import {
  Calendar,
  LogIn,
  Trash2,
  Clipboard,
  ClipboardCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import RoomParticipants from "./room-participants";
import { RoomData } from "@/hooks/useRooms";
import DeleteRoomDialogBox from "@/components/dialogbox/delete-room-dialogbox";
import useJoinRoomMutation from "@/hooks/useJoinRoom";

export interface RoomCardProps {
  username?: string;
  room: RoomData;
}

const RoomCard: React.FC<RoomCardProps> = ({ username, room }) => {
  const [copied, setCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formattedDate = new Date(room.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(room.roomId);
      setCopied(true);
      toast.success("Room ID copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const { mutate: joinRoom } = useJoinRoomMutation();

  const handleJoinRoom = (roomId: string) => {
    if (!roomId) {
      console.error("Room ID is required to join a room.");
      toast.error("Invalid Room ID.");
      return;
    }
    joinRoom(roomId);
  };

  return (
    <>
      <div className="hover:border-primary flex w-full flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-md transition hover:bg-gray-50 hover:shadow-lg sm:flex-row">
        {/* Room Details */}
        <div className="w-full flex-1 sm:w-auto">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {room.slug}
          </h3>
          <p
            className="mt-1 flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            onClick={handleCopy}
          >
            <span className="font-semibold">Room ID:</span>
            <span>
              {room.roomId.slice(0, 10)}
              {room.roomId.length > 10 ? "..." : ""}
            </span>
            {copied ? (
              <ClipboardCheck className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 text-gray-400 hover:text-green-500" />
            )}
          </p>
        </div>

        {/* Date & Participants */}
        <div className="flex w-full flex-wrap items-center justify-center gap-4 text-sm text-gray-500 sm:w-auto sm:flex-nowrap sm:justify-start">
          <p className="flex items-center gap-1 whitespace-nowrap">
            <Calendar className="h-4 w-4 text-gray-400" />
            {formattedDate}
          </p>
          <RoomParticipants
            participants={room.participants}
            noOfParticipants={room.noOfParticipants}
            username={username}
          />
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3 sm:w-auto">
          <button
            onClick={() => handleJoinRoom(room.roomId)}
            className="text-primary-chubb flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium transition hover:bg-blue-100 sm:w-auto sm:bg-transparent"
          >
            <LogIn className="h-4 w-4" />
            Join
          </button>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:w-auto sm:bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Room Dialog */}
      {showDeleteDialog && (
        <DeleteRoomDialogBox
          roomId={room.roomId} // Pass room ID
          onClose={setShowDeleteDialog}
        />
      )}
    </>
  );
};

export default RoomCard;
