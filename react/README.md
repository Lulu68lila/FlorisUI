🌸 FlorisUI React
==================

Composants React pour FlorisUI — un langage de design où les interfaces évoluent comme une fleur.

### Installation

```bash
npm install florisui-react
```

### Utilisation

```tsx
import { Button, Toggle, Slider, Card, Accordion, Input } from 'florisui-react';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('🌸')}>
        Click me
      </Button>

      <Toggle label="Activer" />

      <Slider min={0} max={100} defaultValue={50} />

      <Card icon="🌸" title="FlorisUI" description="Interfaces that bloom" />

      <Accordion items={[
        { id: '1', icon: '🌸', title: 'Design vivant', content: 'Les interfaces respirent.' },
      ]} />

      <Input label="Votre message" maxCount={20} />
    </div>
  );
}
```

### Composants

| Composant | Props principales |
|-----------|-------------------|
| Button | variant, glow, onClick |
| Toggle | checked, onChange, label |
| Slider | min, max, value, onChange |
| Accordion | items: [{id, icon, title, content}] |
| Input | label, maxCount |
| Card | icon, title, description, tilt |
