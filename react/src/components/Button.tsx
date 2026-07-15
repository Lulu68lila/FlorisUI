import React from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  glow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  glow = true,
  className = '',
  children,
  ...props
}) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      {...props}
    >
      {glow && (
        <span
          className="btn__glow"
          style={{ '--x': `${pos.x}px`, '--y': `${pos.y}px` } as React.CSSProperties}
        />
      )}
      {children}
    </button>
  );
};
