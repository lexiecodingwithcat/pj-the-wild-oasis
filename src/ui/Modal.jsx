import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
/*eslint-disable  react/prop-types */
/*eslint-diable react/no-unused-vars */
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//1. create context API
const ModalContext = createContext();
//2. create parent component
function Modal({ children }) {
  //we need to track which is the currentlt open window
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  // const open = () => setOpenName;
  return (
    <ModalContext.Provider value={{ setOpenName, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
}
//3. create children components
function Open({ children, openWindowName }) {
  const { setOpenName } = useContext(ModalContext);
  //we can use cloneElemnt to clone the children elements
  // so that we can add onClick to the child element
  //because we are not able to pass the onClick function directly to the button
  return cloneElement(children, { onClick: () => setOpenName(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  useEffect(function () {
    //we need to define the function cuz we need to clean it up later
    function handleClick(e) {
      //if there is a DOM stored in the ref, which means that the styledModal exists
      //and the element we clicked is not inside of the ref DOM
      if (ref.current && !ref.current.contains(e.target)) {
        //close the window
        close();

      }
    }
    //trigger the event in capture phase instead of bubble phase
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  if (name !== openName) return null;
  return createPortal(
    //1. the JSX we want to render
    <Overlay>
      <StyledModal ref={ref}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        <Button onClick={close}>
          <HiXMark />
        </Button>
      </StyledModal>
    </Overlay>,
    //where  we want to render
    document.body
  );
}

//4.set children components as properties of the parent components
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
