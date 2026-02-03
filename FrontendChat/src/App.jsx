import { BrowserRouter, Routes, Route } from "react-router";
import Demo from "./Demo";
import Body from "./Body";
import SelectUser from "./Components/SelectUser";
import SingleChat from "./Components/ChatComponent/SingleChat";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
       <Route path="/" element={<SelectUser />} />
        <Route path="/a/:fromuserId/:named/:touserId" element={<Demo />} />
        <Route path="/chat/:fromuserId/:named/:touserId" element={<SingleChat />} />
       
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
