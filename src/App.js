import { BrowserRouter } from "react-router-dom";
import "./App.scss";

import { AuthProvider } from "./context/authenticationContext";
import Routing from "./routing";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
