import React from "react";

interface Props {
  tabs: string[];
}

export const Tabs = ({ tabs }: Props) => {
  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`whitespace-nowrap px-4 py-2 rounded-full ${
              index === 0 ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
};
