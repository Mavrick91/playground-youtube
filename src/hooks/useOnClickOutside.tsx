import { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | KeyboardEvent) => {
      // Close the modal if a click is outside the modal or 'Escape' key is pressed
      if (
        (!ref.current || ref.current.contains(event.target as Node)) &&
        event.type !== 'keydown'
      ) {
        return;
      }

      if (
        event.type === 'keydown' &&
        (event as KeyboardEvent).key !== 'Escape'
      ) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('keydown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
