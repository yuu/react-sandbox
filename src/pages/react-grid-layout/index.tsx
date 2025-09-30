import * as R from "ramda";
import { Maybe } from "true-myth";
import { useState, useCallback, useMemo, forwardRef } from "react";
import ReactGridLayout, { Layout, ItemCallback } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const GRID_CELL_HEIGHT = 30;
export const GRID_CELL_VMARGIN = 8;
export const GRID_COLUMN_COUNT = 24;

export interface GridPos {
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
}

type GridItemProps = { children: React.ReactNode };
const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
    ({ children, ...rest }, ref) => (
        <div ref={ref} {...rest}>
            {children}
        </div>
    ),
);

type PanelProps = { panel: Layout };
const Panel = ({ panel }: PanelProps) => {
    return <div>Panel: {panel.i}</div>;
};

const usePanel = () => {
    const dpanels: Record<string, Layout> = {
        "3184": {
            i: "3184",
            w: 4,
            h: 3,
            x: 0,
            y: 4,
            moved: false,
            static: false,
        },
        "3232": {
            i: "3232",
            w: 8,
            h: 4,
            x: 0,
            y: 0,
            moved: false,
            static: false,
        },
        "3216": {
            i: "3216",
            w: 4,
            h: 9,
            x: 8,
            y: 0,
            moved: false,
            static: false,
        },
        "3196": {
            i: "3196",
            w: 4,
            h: 5,
            x: 4,
            y: 4,
            moved: false,
            static: false,
        },
    };
    const [panels, setPanels] = useState<Record<string, Layout>>(dpanels);

    const updateGridPos = useCallback(
        (panel: Layout, newPos: GridPos, manuallyUpdated = true) => {
            setPanels((prev) => ({ ...prev, [panel.i]: panel }));
        },
        [setPanels],
    );

    return { panels, updateGridPos };
};

type LayoutChangeCallback = (layout: Array<Layout>) => void;
const useGridLayout = () => {
    const { panels, updateGridPos } = usePanel();
    // TODO: conver to layout from panel
    const layouts = useMemo(() => R.values(panels), [panels]);

    const updateGridPosInner = (item: Layout, _layout: Array<Layout>) =>
        R.map((panel) => updateGridPos(panel, item), Maybe.of(panels[item.i]));

    const onDragStop: ItemCallback = useCallback(
        (layout: Layout[], _oldItem: Layout, newItem: Layout) => {
            updateGridPosInner(newItem, layout);
        },
        [updateGridPosInner],
    );
    const onResize: ItemCallback = useCallback(
        (layout: Layout[], _oldItem: Layout, newItem: Layout) => {
            updateGridPosInner(newItem, layout);
        },
        [updateGridPosInner],
    );
    const onResizeStop: ItemCallback = useCallback(
        (layout: Layout[], _oldItem: Layout, newItem: Layout) => {
            updateGridPosInner(newItem, layout);
        },
        [updateGridPosInner],
    );
    const onLayoutChange: LayoutChangeCallback = useCallback((layout) => {
        /*
        if (this.state.panelFilter) {
        return;
        }
        
        if (this.isLayoutInitialized) {
        this.isLayoutInitialized = true;
        }
        
        this.props.dashboard.sortPanelsByGridPos();
        this.forceUpdate();
        */

        for (const newPos of newLayout) {
            this.panelMap[newPos.i!].updateGridPos(
                newPos,
                this.isLayoutInitialized,
            );
        }
    }, []);

    return {
        panels,
        layouts,
        onDragStop,
        onResize,
        onResizeStop,
        onLayoutChange,
    };
};

const Example = () => {
    const {
        panels,
        layouts,
        onDragStop,
        onResize,
        onResizeStop,
        onLayoutChange,
    } = useGridLayout();

    return (
        <ReactGridLayout
            width={300}
            isDraggable={true}
            isResizable={true}
            containerPadding={[0, 0]}
            useCSSTransforms
            cols={GRID_COLUMN_COUNT}
            rowHeight={GRID_CELL_HEIGHT}
            layout={layouts}
            onDragStop={onDragStop}
            onResize={onResize}
            onResizeStop={onResizeStop}
            onLayoutChange={onLayoutChange}
        >
            {R.values(panels).map((panel) => (
                <GridItem key={panel.i}>
                    <Panel panel={panel} />
                </GridItem>
            ))}
        </ReactGridLayout>
    );
};

export const ReactGridLayoutPage = () => {
    return (
        <div>
            <h1>React Grid Layout</h1>
            <p>React Grid Layout</p>
            <main>
                <Example />
            </main>
        </div>
    );
};
