"use client";

import React, { useState } from "react";
import { Input } from "../forms/input";
import { useRooms } from "@/hooks/useRooms";
import { toast } from "react-hot-toast";

interface CreateRoomDialogBoxProps {
  onClose: (e: boolean) => void;
}

const CreateRoomDialogBox = ({ onClose }: CreateRoomDialogBoxProps) => {
  const [roomName, setRoomName] = useState("");
  const { createRoom } = useRooms();

  const handleCreateRoom = async () => {
    onClose(false);
    if (!roomName.trim()) return;
    setRoomName("");

    toast.promise(
      createRoom(roomName),
      {
        loading: <span className="text-gray-800">Creating room...</span>,
        success: (
          <span className="text-green-600">Room created successfully!</span>
        ),
        error: (err) => (
          <span className="text-red-600">
            {err.message || "Failed to create room"}
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
      onClick={() => onClose(false)} // Close when clicking outside
    >
      <div
        className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-secondary mb-2 text-2xl font-semibold">
          Create New Room
        </h2>

        {/* Input Field */}
        <Input
          placeholder="Room name"
          title="Enter a name for your room"
          type="text"
          required={true}
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2 font-bold">
          <button
            className="cursor-pointer rounded-lg border px-4 py-2 text-gray-600 transition hover:bg-gray-100"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary-darker hover:bg-primary-chubb cursor-pointer rounded-lg px-4 py-2 text-white transition"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateRoomDialogBox;
