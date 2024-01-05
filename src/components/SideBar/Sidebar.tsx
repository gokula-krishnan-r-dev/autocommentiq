import React, { useState } from "react";

const Sidebar = ({ menus }: any) => {
  const [selectedMenu, setSelectedMenu] = useState<any>(null);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index === selectedMenu ? null : index);
  };

  return (
    <div className="bg-black text-white w-[300px]">
      <div className="">
        {menus.map((menu: any, index: number) => {
          const isSelected = index === selectedMenu;
          return (
            <div className="px-6" key={index}>
              <h1
                className={`py-4 mt-3 px-6 rounded-xl ${
                  isSelected ? "bg-blue-500 text-white" : "bg-gray-400"
                }`}
                onClick={() => handleMenuClick(index)}
              >
                {menu.heading}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
