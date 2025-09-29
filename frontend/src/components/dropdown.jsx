import { useEffect, useState } from "react"
import { api } from "../services/api";

export default function CategoryDropdown({ handleCategory, selectedId }) {
const [item, setItem] = useState([]);

async function fetchCategories() {
    try {
        const res = await api.getCategories();
        setItem(res);
    } catch (err) {
        alert(err);
    }
}

useEffect(() => {
    fetchCategories();
},[]) 

return (
    <div>
    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
    <select id="categories" onChange={(e) => handleCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option value="">Choose a category</option>
        {item.map((i) => (
             <option key={i.categoryId} value={i.categoryId} selected={selectedId == i.categoryId}>{i.categoryName}</option>
        ))

        }
    </select>
    </div>

)}