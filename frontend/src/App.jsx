import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RecipeDetails from "./pages/recipe-details";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProtectedRoute from "./components/routes/protected-routes";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          
        <Route path="/recipe/:id" element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

// Color pallete
// #FE5D26 - orange
// #F2C078 - somehow beige
// #FAEDCA - very light pink - bg
// #C1DBB3 - light blue