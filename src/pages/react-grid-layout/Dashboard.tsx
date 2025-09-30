import * as R from "ramda";
import { useState, useCallback } from "react";
import ReactGridLayout from "react-grid-layout";
import { DashboardContextProvider, useDashboard } from "./DashboardContext";
import { GridLayoutItem } from "./GridLayoutItem";
import { useGridLayout } from "./useGridLayout";
import { Panel, type GridPos } from "./Panel";
import { defaultPanels } from "./data";

export const GRID_CELL_HEIGHT = 30;
export const GRID_CELL_VMARGIN = 8;
export const GRID_COLUMN_COUNT = 24;

// reference to grafana
// DashboardModel has many PanelModel
// Panel has plugin and view model
// plugin is each data model
// layout local cache state for panel state

export type DashboardProps = { id: string };

export const Dashboard = (_: DashboardProps) => {
    // fetch dashboard data
    // require dashboard/panel data management layer
    const [panels, setPanels] = useState<Record<string, Panel>>(defaultPanels);
    const updatePanel = useCallback(
        (panel: Panel, _newPos: GridPos, _manuallyUpdated = true) => {
            setPanels((prev) => ({ ...prev, [panel.i]: panel }));
        },
        [setPanels],
    );

    return (
        <DashboardContextProvider value={{ panels, updatePanel }}>
            <GridLayout />
        </DashboardContextProvider>
    );
};

const GridLayout = () => {
    const dashboard = useDashboard();
    const { layouts, onDragStop, onResize, onResizeStop, onLayoutChange } =
        useGridLayout(dashboard);

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
            {R.values(dashboard.panels).map((panel) => (
                <GridLayoutItem key={panel.i}>
                    <Panel panel={panel} />
                </GridLayoutItem>
            ))}
        </ReactGridLayout>
    );
};
