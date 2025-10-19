import { useEffect, useRef, useState } from "react";
import MinusIcon from "../icons/Minus";
import PlusIcon from "../icons/plus";
import { InputGemProps } from "../../models/input";
import { TabEnum } from "../../enums/tab";

function InputGem({
  value,
  classNameInput,
  classNameContainer,
  classNameButton,
  onChange,
  unit,
}: InputGemProps) {
  const [valueInput, setValueInput] = useState<string>(String(value || 0));
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatValue = (inputValue: string): number => {
    const formattedValue = inputValue.replace(',', '.');
    
    // find first number in string (can be negative or positive)
    const match = formattedValue.match(/-?\d+\.?\d*/);
    if (!match) {
      return 0;
    }
    
    const numericValue = parseFloat(match[0]) || 0;

    if (unit === TabEnum.Percent) {
      if (numericValue > 100) {
        return 100;
      }
    }
    
    if (numericValue < 0) {
      return 0;
    }
    
    return numericValue;
  };

  const getMaxValue = (): number => {
    return unit === TabEnum.Percent ? 100 : Infinity;
  };

  const handleMinus = () => {
    const currentValue = formatValue(valueInput);
    if (currentValue <= 0) return;
    const newValue = currentValue - 1;
    setValueInput(String(newValue));
    onChange?.(newValue);
    setIsFocused(true);
  };
  
  const handlePlus = () => {
    const currentValue = formatValue(valueInput);
    const maxValue = getMaxValue();
    if (currentValue >= maxValue) return;
    const newValue = currentValue + 1;
    setValueInput(String(newValue));
    onChange?.(newValue);
    setIsFocused(true);
  };

  const handleMouseEnter = () => {
    if (isFocused) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.replace(',', '.');
    setValueInput(formattedValue);
  };

  const handleBlur = () => {
    const numericValue = formatValue(valueInput);
    
    setValueInput(String(numericValue));
    onChange?.(numericValue);
    setIsFocused(false);
  };

  useEffect(() => {
    setValueInput(String(value || 0));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setIsHovered(false);
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div
      ref={containerRef}
      className={`w-35 overflow-hidden ${
        isHovered ? "bg-hover" : "bg-secondary"
      } ${
        isFocused ? "border-1 border-focus" : ""
      } rounded-lg flex items-center justify-between ${classNameContainer}`}
    >
      <button
        className={`p-2 cursor-pointer hover:bg-hover disabled:bg-transparent ${classNameButton}`}
        onClick={handleMinus}
        disabled={formatValue(valueInput) <= 0}
      >
        <MinusIcon disabled={formatValue(valueInput) <= 0} />
      </button>
      <input
        data-testid="input-gem"
        type="text"
        className={`w-full bg-transparent outline-none text-active text-center text-xs mx-2 ${classNameInput}`}
        value={valueInput}
        onChange={handleInputChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className={`p-2 cursor-pointer hover:bg-hover disabled:bg-transparent ${classNameButton}`}
        onClick={handlePlus}
        disabled={formatValue(valueInput) >= getMaxValue()}
      >
        <PlusIcon disabled={formatValue(valueInput) >= getMaxValue()} />
      </button>
    </div>
  );
}

export default InputGem;
