import { EChart } from "../../lib/echarts";
import { options } from "./data";

export const EchartsPage = () => {
    return (
        <div>
            <h1>Echarts</h1>
            <p>
                <a href="https://echarts.apache.org/examples/en/index.html">
                    example
                </a>
            </p>

            <h2>line smooth</h2>
            <EChart
                onClick={console.log}
                style={{
                    height: "600px",
                    width: "100%",
                }}
                {...options.lineSmooth}
            />

            <h2>bar stack</h2>
            <EChart
                onClick={console.log}
                style={{
                    height: "600px",
                    width: "100%",
                }}
                {...options.barStack}
            />

            <h2>multiple x axis</h2>
            <EChart
                onClick={console.log}
                style={{
                    height: "600px",
                    width: "100%",
                }}
                {...options.multipleXAxis}
            />

            <h2>scatter matrix</h2>
            <EChart
                onClick={console.log}
                style={{
                    height: "600px",
                    width: "100%",
                }}
                {...options.scatterMatrix}
            />

            <div style={{ height: "50vh" }}></div>
        </div>
    );
};
