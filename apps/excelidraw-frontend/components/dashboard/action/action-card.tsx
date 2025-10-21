"use client";

import React from "react";

interface RoomCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ActionCard: React.FC<RoomCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      className="hover:border-primary flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
      onClick={onClick}
      aria-label={title}
    >
      <span className="w-fit rounded-xl bg-gray-200 p-3">{icon}</span>
      <div className="text-start">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ActionCard;
