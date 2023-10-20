import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { User, emptyUser } from "./classes/User";
import LoggedOut from "./pages/LoggedOut";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";
import { UserContext } from "./Provider";

const App = () => {
  const [user, setUser] = React.useState<User>(emptyUser);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/logout" element={<LoggedOut/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};


export default App;
