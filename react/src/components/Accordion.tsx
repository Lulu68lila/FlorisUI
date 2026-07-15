import React from 'react';

interface AccordionItem {
  id: string;
  icon: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div style={{ width: '100%' }}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`bloom-accordion ${isOpen ? 'open' : ''}`}>
            <button
              className="bloom-accordion__btn"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="bloom-accordion__icon">{item.icon}</span>
              <span className="bloom-accordion__label">{item.title}</span>
              <span className="bloom-accordion__petal">&nbsp;</span>
            </button>
            <div className={`bloom-accordion__reveal ${isOpen ? 'open' : ''}`}>
              <div className="bloom-accordion__inner">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
