import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';


import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';
import Add from "./pages/add/Add"
import Update from "./pages/update/Update"
import Report from './components/report/Report';
import Leaderboard from './components/leaderboard/Leaderboard';
import Password from './components/password/Password';
import Resetpassword from './components/resetpassword/Resetpassword';

const App = () => {
  const { currentUser } = useContext(AuthContext);


  const Layout = () => {
    return (
      <div>

        <Home />
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {

    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Layout />
          </ProtectedRoute>}>
            {/* <Route index element={<Home />} /> */}
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/report" element={<Report />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/password" element={<Password />}></Route>
          <Route path="/reset/:id" element={<Resetpassword />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
