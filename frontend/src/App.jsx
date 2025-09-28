import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RecipeDetails from "./pages/recipe-details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
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