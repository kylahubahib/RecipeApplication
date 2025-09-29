import { useEffect, useState } from "react"
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import UpdateRecipe from "../../components/recipes/update-recipe";

export default function RecipeDetails({}) {
    const { id } = useParams();
    const navigate  = useNavigate();
    const [recipe, setRecipe] = useState([]);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [editing, setEdit] = useState(false);
    
    async function fetchRecipe() {
       try {
        const res = await api.getRecipeById(id);
        setRecipe(res);
       } catch (err) {
        alert(err);
       }
    }

    useEffect(() => {
        fetchRecipe();
    }, []);

    
    async function deleteRecipe () {
        console.log(id);
        try {
            setDeleting(true);
            await api.deleteRecipe(id);
        } catch (err) {
            alert(err);
        } finally {
            setTimeout(() => {
                setDeleting(false);
                navigate('/')
            }, 800)
        
        }
    }

return (
    <div className="bg-[#F7FBE9] h-screen">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-full">
            
            <div className="w-full h-screen">
                <img 
                    className="w-full h-full object-cover" 
                    src={recipe.image == null ? "/bg-food.png" : recipe.image} 
                    alt={recipe.title} 
                />
            </div>

            <div className="h-full overflow-y-auto p-10 flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p><b>Description: </b>{recipe.description}</p> 
            <h5 className="mt-2 font-bold">Instructions:</h5>
            <p className="whitespace-pre-line">{recipe.instruction}</p>

            <div className="flex flex-row space-x-3 mt-10">
                <div><UpdateRecipe recipe={recipe}/></div>
                <div>
                <Button title={deleting ? 'Deleting' : 'Delete'} className="bg-red-600 hover:bg-red-800" onClick={deleteRecipe} />
                </div>
            </div>
            </div>
        </div>
    </div>


)}