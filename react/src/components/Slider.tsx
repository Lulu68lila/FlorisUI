import React from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
}) => {
  const [internal, setInternal] = React.useState(defaultValue);
  const value = controlledValue ?? internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternal(val);
    onChange?.(val);
  };

  return (
    <div className="bloom-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="bloom-slider__input"
      />
      <div className="bloom-slider__track">
        <div className="bloom-slider__fill" style={{ width: `${value}%` }} />
        <div className="bloom-slider__thumb" style={{ left: `${value}%` }}>
          <span className="bloom-slider__value">{value}</span>
        </div>
      </div>
    </div>
  );
};
