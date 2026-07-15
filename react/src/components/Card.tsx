import React from 'react';

interface CardProps {
  icon?: string;
  title: string;
  description: string;
  tilt?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ icon, title, description, tilt = true, className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy * -6;
    const ry = (x - cx) / cx * 6;
    ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!tilt || !ref.current) return;
    ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={`principle-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: tilt ? 'default' : undefined }}
    >
      {icon && <div className="principle-card__icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
