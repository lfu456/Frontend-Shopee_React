import {
  FloatingArrow,
  arrow,
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  useClick,
  useHover,
  safePolygon,
  type Placement
} from "@floating-ui/react";

import React, { ElementType, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FloatingPortal } from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  initalOpen?:boolean;
  placement?:Placement
}



export const Popover = ({ children, className, renderPopover, as: Element = 'div',initalOpen,placement ='bottom-end'}: Props) => {
  const [isOpen, setIsOpen] = useState(initalOpen || false);
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, context ,middlewareData} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({ element: arrowRef }),
      offset({ mainAxis: 10 }),
      flip(),
      shift(),
    ],
    placement: placement,
  });

  //bien hover nma luoi thay
  const click = useHover(context, {
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context, {});
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);
  const id = useId();

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={refs.setFloating}
              className="font-item"
              style={{
                position: strategy,
                left: x,
                top: y,
              }}
              {...getFloatingProps()}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill="white"
                width={28}
                height={10}
                strokeWidth={20}
                style={{
                   bottom: '99%'
                }}
              />

              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};
