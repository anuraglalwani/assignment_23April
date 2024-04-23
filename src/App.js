import "./App.css";
import AddUser from "./pages/AddUser";

import {
  RecoilRoot,
} from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <AddUser />
      </RecoilRoot>
    </div>
  );
}

export default App;
