export type Tab = {
  label: string | number;
  value: string | number;
};

export type TabButtonGemProps = {
  tabs: Tab[];
  classNameContainer?: string;
  classNameButton?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
};
