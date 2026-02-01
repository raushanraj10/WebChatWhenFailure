import { BrowserRouter, Routes, Route } from "react-router";
import Demo from "./Demo";
import Body from "./Body";
import SelectUser from "./Components/SelectUser";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
       <Route path="/" element={<SelectUser />} />
        <Route path="/a/:_id" element={<Demo />} />
       
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
