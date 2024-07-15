import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicTable from "./components/BasicTable";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>react table</h1>
      <BasicTable />
    </div>
  );
}

export default App;
