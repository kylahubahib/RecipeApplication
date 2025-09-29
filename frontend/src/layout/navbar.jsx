import Button from "../components/button";
import CreateRecipe from "../components/recipes/create-recipe";
import SearchBar from "../components/searchbar";
import CategoryModal from "../pages/category";


export default function NavigationBar({onRecipeCreated}) {

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
      {/* <Button title={"Create Recipe"} className=" bg-[#F2C078] hover:bg-[#E6B85A]"/> */}
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