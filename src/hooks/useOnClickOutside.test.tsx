// FILEPATH: /Users/mavrickduchamp/programming/perso/js/playground/src/hooks/useOnClickOutside.test.tsx
import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useOnClickOutside from './useOnClickOutside';

const handler = jest.fn();

function TestComponent() {
  const ref = useRef(null);
  useOnClickOutside(ref, handler);

  return (
    <div>
      <div ref={ref}>Inside</div>
      <div>Outside</div>
    </div>
  );
}

describe('useOnClickOutside', () => {
  afterEach(() => {
    handler.mockReset();
  });

  it('calls the handler when a click is outside the ref', () => {
    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText('Outside'));
    expect(handler).toHaveBeenCalled();
  });

  it('does not call the handler when a click is inside the ref', () => {
    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText('Inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('calls the handler when the Escape key is pressed', () => {
    render(<TestComponent />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handler).toHaveBeenCalled();
  });

  it('does not call the handler when a key other than Escape is pressed', () => {
    render(<TestComponent />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(handler).not.toHaveBeenCalled();
  });
});
