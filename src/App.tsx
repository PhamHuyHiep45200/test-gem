import { useState } from "react";
import { TabButtonGem } from "./components";
import { InputGem } from "./components";
import { tabs } from "./constants/tab";
import { TabEnum } from "./enums/tab";

const App = () => {
  const [activeTab, setActiveTab] = useState<string | number | undefined>(
    TabEnum.Percent
  );
  const [inputValue, setInputValue] = useState<number>(0);

  const handleInputChange = (value: string | number) => {
    if (typeof value === "number") {
      setInputValue(value);
    }
  };

  const handleTabChange = (value: string | number) => {
    setActiveTab(value);
    if (value === TabEnum.Percent && inputValue > 100) {
      setInputValue(100);
    }
  };

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <label htmlFor="input-gem" className="text-tertiary">Unit</label>
        <TabButtonGem
          tabs={tabs}
          value={activeTab}
          onChange={handleTabChange}
        />
        </div>
        <br />
        <div className="flex items-center justify-between">
          <label htmlFor="input-gem" className="text-tertiary">Value</label>
        <InputGem
          value={inputValue}
          onChange={handleInputChange}
          unit={activeTab}
        />
        </div>
      </div>
    </div>
  );
};

export default App;
