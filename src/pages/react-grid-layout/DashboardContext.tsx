import { createContext, useContext } from "react";
import { type Panel, type GridPos } from "./Panel";

export type DashboardContext = {
  panels: Record<string, Panel>;
  updatePanel: (
    panel: Panel,
    newPos: GridPos,
    manuallyUpdated?: boolean,
  ) => void;
};

const DashboardContext = createContext<DashboardContext>(undefined!);

export const DashboardContextProvider = DashboardContext.Provider;

export const DashboardContextConsumer = DashboardContext.Consumer;

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboard must be used within a DashboardContext.Provider",
    );
  }

  return context;
};
