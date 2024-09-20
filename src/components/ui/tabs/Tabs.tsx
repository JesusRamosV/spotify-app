"use client";
import React from "react";

interface Props {
  tabs: { id: string; label: string }[];
  onChange: (tab: string) => void;
  itemTypeCurrent: string;
}

export const Tabs = ({ tabs, onChange, itemTypeCurrent }: Props) => {
  return (
    <nav className="mb-3">
      <ul className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab, index) => (
          <li
            onClick={() => onChange(tab.id)}
            key={index}
            className={`whitespace-nowrap px-2 text-[13px] py-[3px] cursor-pointer hover:bg-gray-700 rounded-full ${
              itemTypeCurrent === tab.id ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};
