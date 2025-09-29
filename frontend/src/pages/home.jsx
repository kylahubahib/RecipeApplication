import { useEffect, useState } from 'react'
import NavigationBar from '../layout/navbar'
import { api } from '../services/api';
import RecipeCard from '../components/card';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadRecipes() {
    setLoading(true);
    console.log("Start fetching...");
    try {
      const res = await api.getRecipes()
      setData(res);
     
    } catch(err) {
      setError(err.message || "Failed to load recipes");
      console.log(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
  }

  useEffect(() => {
    loadRecipes();
  }, [])

  function handleApiUpdate() {
    loadRecipes();
  }


  return (
    <div className='bg-[#F7FBE9] min-h-screen flex flex-col '>
      <NavigationBar onRecipeCreated={handleApiUpdate}/>

      {loading ?  
        <div className="flex flex-1 items-center justify-center">
          <Loading />
        </div> 
      :
        <>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mt-5">
        {!loading && data && data.length > 0 ? (
            data.map((recipe) => (
            <RecipeCard 
                key={recipe.recipeId}
                title={recipe.title} 
                desc={recipe.description} 
                img={recipe.image} 
                category={recipe.categoryName} 
                id={recipe.recipeId}
            />
            ))
        ) : (
            <div className="col-span-full text-center text-gray-500 py-10">No recipe found</div>
        )}
        </div>
        </>
      }
    </div>
  )
}



// Color pallete
// #FE5D26 - orange
// #F2C078 - somehow beige
// #FAEDCA - very light pink - bg
// #C1DBB3 - light blue