"use client";

import { useRooms } from "@/hooks/useRooms";
import React from "react";
import { toast } from "react-hot-toast";

interface DeleteRoomDialogBoxProps {
  onClose: (success: boolean) => void;
  roomId: string;
}

const DeleteRoomDialogBox = ({ onClose, roomId }: DeleteRoomDialogBoxProps) => {
  const { leaveRoom } = useRooms();

  const handleDelete = async () => {
    onClose(false);
    if (!roomId.trim()) return;

    toast.promise(
      leaveRoom(roomId),
      {
        loading: <span className="text-gray-800">Deleting room...</span>,
        success: (
          <span className="text-green-600">Room Deleted successfully!</span>
        ),
        error: (err) => (
          <span className="text-red-600">
            {err.message || "Failed to delete room"}
          </span>
        ),
      },
      {
        style: {
          background: "#FAFAFA",
          color: "#1e1e1e",
          borderRadius: "12px",
          padding: "16px 20px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
          border: "2px solid #e5e7eb",
          maxWidth: "500px",
        },
        position: "top-center",
      },
    );
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={() => onClose(false)}
    >
      <div
        className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-secondary mb-2 text-2xl font-semibold">
          Delete Room
        </h2>
        <p className="text-gray-600">
          Are you sure you want to delete this room? This action cannot be
          undone.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2 font-bold">
          <button
            className="cursor-pointer rounded-lg border px-4 py-2 text-gray-600 transition hover:bg-gray-100"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-400 disabled:bg-red-300"
            onClick={handleDelete}
          >
            Delete Room
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteRoomDialogBox;
