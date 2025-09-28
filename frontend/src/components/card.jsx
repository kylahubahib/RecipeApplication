import { Link } from "react-router-dom";

export default function RecipeCard({title, desc, img, name, id}) {

return (
   
<Link to={`/recipe/${id}`} className="bg-white shadow-sm rounded-lg w-full flex flex-col overflow-hidden">
  <img className="w-full h-50 rounded-t-lg object-cover" src={img == null ? "/bg-food.png" : img} alt={title}/>

  <div className="p-2 flex flex-col space-y-2 min-w-0">
    <label className="font-bold text-gray-900 text-2xl">{title}</label>
    <p className="text-gray-700 text-sm truncate whitespace-nowrap overflow-hidden min-w-0"><b>Description:</b> {desc}</p>
    <label className="text-gray-700 text-sm">Created By: {name}</label>
  </div>

</Link>

   
)}