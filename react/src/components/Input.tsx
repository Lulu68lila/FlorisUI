import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  maxCount?: number;
}

export const Input: React.FC<InputProps> = ({ label, maxCount = 20, ...props }) => {
  const [val, setVal] = React.useState('');

  return (
    <div className="bloom-field" style={{ width: '100%', maxWidth: 260 }}>
      <div className="bloom-field__border" />
      <input
        className="bloom-field__input"
        placeholder=" "
        maxLength={maxCount}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        {...props}
      />
      <label className="bloom-field__label">{label}</label>
      <span className="bloom-field__glow" />
      <span className={`bloom-field__counter ${val.length >= maxCount - 2 ? 'full' : ''}`}>
        {val.length}/{maxCount}
      </span>
    </div>
  );
};
