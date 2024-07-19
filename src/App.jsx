import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicTable from "./components/BasicTable";
import "./App.css";

function App() {
  return (
    <div className=" px-20 mt-8  font-roboto ">
      <h1 className=" text-center text-2xl  font-playwrite mb-10">
        Fully functional tanStack / React table
      </h1>
      <BasicTable />
    </div>
  );
}

export default App;
