import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

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

// Note on Modals in DOM and React Portals
// A feature that allows us to render an element outside of the parent component's DOM structure, while still keeping the element in the original position of the component tree
// With a portal we can render a component in any location that we want in the DOM tree, while keeping it stable in the component tree so that things like props keep working normally
// Modal windows, tooltips, menus; things we want to display on top of other elements

// We render the modal as a result of calling createPortal, a react-dom fn
// the first arg is the JSX we want to render
// the second arg is the DOM node where we want to render it

// the modal now lives outside the DOM structure while keeping its position within the component tree
// any dom node can be used, even selected with document.querySelector(), etc.

// WHY?
// Avoid conflicts with the css property 'overflow' set to 'hidden'
// If it is reused somewhere where the overflow hidden would cut it off, guarantees it stays intact stylistically in the future

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
