import React from 'react';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  const [internal, setInternal] = React.useState(false);
  const isChecked = checked ?? internal;

  const handleChange = () => {
    const next = !isChecked;
    setInternal(next);
    onChange?.(next);
  };

  return (
    <label className="bloom-toggle">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="bloom-toggle__track">
        <span className="bloom-toggle__thumb" />
      </span>
      {label && (
        <span style={{ marginLeft: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
    </label>
  );
};
