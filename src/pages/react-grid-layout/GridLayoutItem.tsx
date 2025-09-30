import { forwardRef, type ReactNode } from "react";

type GridLayoutItemProps = { children: ReactNode };

export const GridLayoutItem = forwardRef<HTMLDivElement, GridLayoutItemProps>(
    ({ children, ...rest }, ref) => (
        <div ref={ref} {...rest}>
            {children}
        </div>
    ),
);
