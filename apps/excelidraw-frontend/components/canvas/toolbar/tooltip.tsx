import React from "react";

const Tooltip = ({ tooltip }: { tooltip: string }) => {
  return (
    <div className="bg-background absolute top-12 left-1/2 min-w-max -translate-x-1/2 scale-95 rounded border border-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
      {tooltip}
    </div>
  );
};

export default Tooltip;
