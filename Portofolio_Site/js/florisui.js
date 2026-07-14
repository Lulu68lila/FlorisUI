export const version = '1.0.0';

export function init() {
  if (typeof window === 'undefined') return;

  const canvas = document.getElementById('particles-canvas');
  if (canvas) return;
}

export default { version, init };
