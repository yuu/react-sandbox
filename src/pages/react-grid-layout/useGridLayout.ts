import * as R from "ramda";
import { Maybe } from "true-myth";
import { useCallback, useMemo, useRef } from "react";
import type { Layout, ItemCallback } from "react-grid-layout";
import type { Panel } from "./Panel";

type LayoutChangeCallback = (newLayout: Array<Layout>) => void;

type UseGridLayoutArgs = {
    panels: Record<string, Panel>;
    updatePanel: (
        panel: Panel,
        newPos: Layout,
        manuallyUpdated?: boolean,
    ) => void;
};

export const useGridLayout = ({ panels, updatePanel }: UseGridLayoutArgs) => {
    const isLayoutInitialized = useRef<boolean>(false);
    const layouts = useMemo(() => {
        return R.pipe(
            R.values,
            R.map<Panel, Layout>((panel) => ({
                i: panel.i,
                x: panel.x,
                y: panel.y,
                w: panel.w,
                h: panel.h,
            })),
        )(panels);
    }, [panels]);

    const updateGridPosInner = (layout: Layout, _layout: Array<Layout>) =>
        R.map((panel) => {
            updatePanel(panel, layout);
            return panel;
        }, Maybe.of(panels[layout.i]));

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
    const onLayoutChange: LayoutChangeCallback = useCallback((newLayout) => {
        /*
            if (this.state.panelFilter) {
                return;
            }
        */

        for (const layout of newLayout) {
            R.map((panel) => {
                updatePanel(panel, layout, isLayoutInitialized.current);
                return panel;
            }, Maybe.of(panels[layout.i]));
        }

        if (isLayoutInitialized.current) {
            isLayoutInitialized.current = true;
        }

        // this.props.dashboard.sortPanelsByGridPos();
    }, []);

    return {
        layouts,
        onDragStop,
        onResize,
        onResizeStop,
        onLayoutChange,
    };
};
