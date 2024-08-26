import { useEffect, useRef } from "react";

export function useOutsideClick( handler, listenCapturing = true ) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //if there is a DOM stored in the ref, which means that the styledModal exists
        //and the element we clicked is not inside of the ref DOM
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      //trigger the event in the capture phase instead of bublle phase
      document.addEventListener("click", handleClick, listenCapturing);
      //clean up the event listener
      return () => document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
