import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../src/components/ProductCard.jsx';

const tick = () => new Promise(r => setTimeout(r, 0));

describe('ProductCard', () => {
  let container, root;

  const product = {
    id: 77,
    nombre: 'Polera Test',
    precio: 9990,
    imagen: 'https://via.placeholder.com/300?text=img',
    imagenHover: 'https://via.placeholder.com/300?text=hover'
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    flushSync(() => root.unmount());
    container.remove();
  });

  it('renderiza nombre y precio', () => {
    flushSync(() => {
      root.render(
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      );
    });
    const text = container.textContent || '';
    expect(text).toContain('Polera Test');
    expect(text.replace(/\./g, '')).toContain('9990'); // acepta 9.990 o 9990
  });

  it('cambia la imagen en hover si existe imagenHover', async () => {
    flushSync(() => {
      root.render(
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      );
    });

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toContain('text=img');

    // Dispara ambas variantes por compatibilidad y espera al DOM
    img.dispatchEvent(new Event('mouseover', { bubbles: true }));
    img.dispatchEvent(new Event('mouseenter', { bubbles: true }));
    await tick();
    expect(img.src).toContain('text=hover');

    img.dispatchEvent(new Event('mouseout', { bubbles: true }));
    img.dispatchEvent(new Event('mouseleave', { bubbles: true }));
    await tick();
    expect(img.src).toContain('text=img');
  });
});
