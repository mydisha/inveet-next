import { useEffect } from 'react';

interface FontLoaderProps {
  fonts: string[];
}

export function FontLoader({ fonts }: FontLoaderProps) {
  useEffect(() => {
    // Load Google Fonts dynamically
    const loadFont = (fontFamily: string) => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    // Load each font
    fonts.forEach(font => {
      if (font && !document.querySelector(`link[href*="${font.replace(/\s+/g, '+')}"]`)) {
        loadFont(font);
      }
    });
  }, [fonts]);

  return null;
}

export default FontLoader;
