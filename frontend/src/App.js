import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Layout from "./pages/Layout.js";

const App = () => {
    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='' element={<Layout />} />
        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App