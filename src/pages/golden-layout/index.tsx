import { useRef, useEffect } from "react";
import {
    LayoutConfig,
    GoldenLayout,
    ComponentContainer,
    JsonValue,
} from "golden-layout";

class TestComponent {
    root: HTMLElement;

    constructor(
        container: ComponentContainer,
        state: JsonValue | undefined,
        virtual: boolean,
    ) {
        this.root = container.element;
        this.root.innerHTML = `<div>Hello GoldLayout</div>`;
    }
}

const config: LayoutConfig = {
    root: undefined,
    content: [
        {
            type: "row",
            content: [
                {
                    type: "component",
                    componentType: "TestComponent",
                    componentState: { label: "A" },
                },
                {
                    type: "column",
                    content: [
                        {
                            type: "component",
                            componentType: "TestComponent",
                            componentState: { label: "B" },
                        },
                        {
                            type: "component",
                            componentType: "TestComponent",
                            componentState: { label: "C" },
                        },
                    ],
                },
            ],
        },
    ],
};

export const GoldenLayoutPage = () => {
    const layoutManager = useRef<GoldenLayout | null>(null);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (layoutManager.current !== null) {
            return;
        }
        if (container.current) {
            const lm = new GoldenLayout(container.current);
            layoutManager.current = lm;

            lm.registerComponentConstructor("TestComponent", TestComponent);
            lm.loadLayout(config);
            console.log("initialized");
        }
    }, []);

    return (
        <div>
            <h1>GoldenLayout</h1>
            <h2>using React to use FlexLayout</h2>
            <p>
                FlexLayoutを使うくらいなら、react-grid-layoutを使うほうがスターが多い
            </p>
            <main ref={container}></main>
        </div>
    );
};
