import { Routes, Route, Link } from "react-router";
import { TwitterText } from "./pages/TwitterText";
import { LexcialEditor } from "./pages/LexicalEditor";
import { XState } from "./pages/XState";
import { Neverthrow } from "./pages/Neverthrow";
import { FpTs } from "./pages/fp-ts";
import { Ramda } from "./pages/ramda";
import { OptionT } from "./pages/option-t";
import { GoldenLayoutPage } from "./pages/golden-layout";
import { ReactGridLayoutPage } from "./pages/react-grid-layout";
import { EchartsPage } from "./pages/echarts";
import "./App.css";

const Links = () => (
  <ul>
    <li>
      <Link to="/twitter-text">twitter-text</Link>
    </li>
    <li>
      <Link to="/lecial-editor">facebook/lexical</Link>
    </li>
    <li>
      <Link to="/xstate">XState</Link>
    </li>
    <li>
      <Link to="/neverthrow">Neverthrow</Link>
    </li>
    <li>
      <Link to="/fp-ts">fp-ts</Link>
    </li>
    <li>
      <Link to="/ramda">ramda</Link>
    </li>
    <li>
      <Link to="/option-t">OptionT</Link>
    </li>
    <li>
      <Link to="/golden-layout">golden-layout</Link>
    </li>
    <li>
      <Link to="/react-grid-layout">react-grid-layout</Link>
    </li>
    <li>
      <Link to="/echarts">apatch echarts</Link>
    </li>
  </ul>
);

export default function App() {
  return (
    <Routes>
      <Route index element={<Links />} />
      <Route path="/twitter-text" element={<TwitterText />} />
      <Route path="/lecial-editor" element={<LexcialEditor />} />
      <Route path="/xstate" element={<XState />} />
      <Route path="/neverthrow" element={<Neverthrow />} />
      <Route path="/fp-ts" element={<FpTs />} />
      <Route path="/ramda" element={<Ramda />} />
      <Route path="/option-t" element={<OptionT />} />
      <Route path="/golden-layout" element={<GoldenLayoutPage />} />
      <Route path="/react-grid-layout" element={<ReactGridLayoutPage />} />
      <Route path="/echarts" element={<EchartsPage />} />
    </Routes>
  );
}
