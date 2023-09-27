import { useEffect, useRef } from 'react';

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  // Detect click outside modal
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // the listenCapturing property prevents event bubbling of the click event by listening during the capturing phase, if set to false it will listen during the bubbling phase
      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
