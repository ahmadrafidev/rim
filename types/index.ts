export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  note?: string;
}

export interface RadiusDemoProps {
  outerRadius: number;
  innerRadius: number;
  padding: number;
  dimension: number;
}

export interface FloatingCalculatorPanelProps {
  borderRadius: number;
  innerRadius: number;
  setInnerRadius: (value: number) => void;
  padding: number;
  setPadding: (value: number) => void;
  dimension: number;
  setDimension: (value: number) => void;
  maxPadding: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
} 