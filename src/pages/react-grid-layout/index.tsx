import { Dashboard } from "./Dashboard";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const ReactGridLayoutPage = () => {
    return (
        <div>
            <h1>React Grid Layout</h1>
            <main>
                <Dashboard id="1" />
            </main>
        </div>
    );
};
