import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import SortingView from "./components/Sorting/SortingView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<p>hi</p>} />
          <Route path="sorting" element={<SortingView />} />
          <Route path="*" element={<div className="w-full h-screen flex justify-center items-center"><h1>Not Found.</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
