import { useEffect, useState } from "react";
import { TabButtonGemProps } from "../../models/tab";

function TabButtonGem({
  tabs,
  value,
  onChange,
  classNameContainer,
  classNameButton,
}: TabButtonGemProps) {
  const [activeTab, setActiveTab] = useState<string | number | undefined>(
    tabs[0].value
  );

  const handleTabClick = (value: string | number) => {
    setActiveTab(value);
    onChange?.(value);
  };

  useEffect(() => {
    setActiveTab(value);
  }, [value]);

  return (
    <div
      className={`w-35 rounded-lg bg-secondary p-0.5 flex items-center ${classNameContainer}`}
    >
      {tabs?.map((tab) => (
        <button
          key={tab.value}
          className={`flex-1 text-center font-medium text-xs rounded-md leading-5 py-1.5 ${
            activeTab === tab.value
              ? "text-active bg-primary"
              : "text-tertiary bg-transparent"
          } ${classNameButton}`}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabButtonGem;
