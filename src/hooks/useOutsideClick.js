import { useEffect } from 'react';

export function useOutsideClick(ref, onOutsideClick, active = true) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutsideClick, active]);
}
