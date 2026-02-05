import { BrowserRouter, Routes, Route } from "react-router";
import Demo from "./Demo";
import Body from "./Body";
import SelectUser from "./Components/SelectUser";
import SingleChat from "./Components/ChatComponent/SingleChat";
import AddGroup from "./Components/ChatComponent/AddGroup";
import AllGroupConnection from "./Components/ChatComponent/AllGroupConnection";
import GroupChat from "./Components/ChatComponent/GroupChat";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
       <Route path="/" element={<SelectUser />} />
        <Route path="/a/:fromuserId/:named/:touserId" element={<Demo />} />
        <Route path="/groupinfo/:fromuserId" element={<AllGroupConnection />} />
        <Route path="/chat/:fromuserId/:named/:touserId" element={<SingleChat />} />
        <Route path="/addgroup/:fromuserId" element={<AddGroup />} />
        <Route path="/groupchat/:fromuserId/:groupId" element={<GroupChat />} />
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
