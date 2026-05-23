import React from "react";

const FlavorController = ({
  flavors,
  activeFlavor,
  onSelect,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-black/30 p-2 backdrop-blur-xl ${className}`}
    >
      {flavors.map((flavor, index) => {
        const isActive = activeFlavor === index;

        return (
          <button
            key={flavor.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
              isActive ? "text-black" : "text-white/70 hover:text-white"
            }`}
            style={{
              background: isActive ? flavor.accentSoft : "transparent",
              boxShadow: isActive ? `0 0 24px ${flavor.accent}44` : "none",
            }}
          >
            {flavor.name}
          </button>
        );
      })}
    </div>
  );
};

export default FlavorController;
