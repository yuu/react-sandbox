export interface GridPos {
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
}

export type Panel = GridPos & { i: string; moved?: boolean };

type PanelProps = { panel: Panel };

export const Panel = ({ panel }: PanelProps) => {
    return <div>Panel: {panel?.i}</div>;
};
