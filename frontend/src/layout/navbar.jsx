import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import CreateRecipe from "../components/recipes/create-recipe";
import SearchBar from "../components/searchbar";
import CategoryModal from "../pages/category";


export default function NavigationBar({onRecipeCreated}) {
  const navigate = useNavigate();

  function LogOut() {
    if(confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate('/login');
    }
  }


return (
  <>
  <nav className="bg-[#FE5D26] relative w-full border-b border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

    {/* <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <SearchBar />
    </div> */}

    <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
      <div><CategoryModal /></div>
      <div> <CreateRecipe fetchRecipe={onRecipeCreated}/></div>
      <div> 
        <button onClick={LogOut}  type="button" className="text-[#FE5D26] bg-white hover:bg-[#F2C078] hover:text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          <span className="sr-only">Logout</span>
        </button>
      </div>
        
    </div>
    

    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
      <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <h1 className=' font-bold text-white text-3xl'>RECIPE APPLICATION</h1>
      </div>
    </div>
    
    </div>
  </nav>
  </>
)}