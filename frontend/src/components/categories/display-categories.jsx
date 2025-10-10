import { useState } from "react";
import { api } from "../../services/api";
import Button from "../button";
import CreateCategory from "./create-categories";
import InputGroup from "../input";

export default function DisplayCategory({categories, fetchCategories, setIsEditing}) {
    const [processing , setProcessing] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    function toggleEdit(c) {
        setEditId(c.categoryId);
        setEditing(true);
        setIsEditing(true);
        setEditCategoryName(c.categoryName);
    }
 
    function closeEdit() {
        setEditId(null);
        setEditing(false);
        setIsEditing(false);
        setEditCategoryName("");
    }

    async function saveEdit() {
        setProcessing(true);
        try {
            const res = await api.updateCategory(editId, { 
                CategoryId: editId, 
                categoryName: editCategoryName
            });
            
            alert("Successfully updated category");
             if (fetchCategories) fetchCategories(); 

        } catch (err) {
            alert(err.response.data);
        } finally {
            setProcessing(false);
            closeEdit();
        }
    }

    async function deleteCategory(id) {
        setProcessing(true);
        try {
            const res = await api.deleteCategory(id);
            alert("Succesfully deleted category");
            if (fetchCategories) fetchCategories(); 
        } catch (err) {
            alert(err.response.data);
        } finally {
            setProcessing(false);
        }
    }

return (
<>

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            { categories && categories.length > 0 ? (
                categories.map((c) => (
                <tr key={c.categoryId} className="bg-white border-b border-gray-200">
                    {editId != c.categoryId ? 
                        <td className="px-6 py-4">{c.categoryName}</td> :
                        <td className="px-6 py-4">
                           <InputGroup
                                placeHolder={"Enter category name..."}
                                type="text"
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                                required
                            />
                        </td>
                    }
                    <td className="px-6 py-4 space-x-3">
                      {editId == c.categoryId ? (
                        <>
                            <Button 
                                onClick={saveEdit} 
                                title={processing ? "Saving..." : "Save"}   
                                className=" bg-[#F2C078] hover:bg-[#E6B85A]"/>
                            <Button onClick={closeEdit}  title={"Cancel"}  className="bg-red-500 hover:bg-red-700"/>
                        </>
                      ) : (
                        <>
                            <Button 
                                onClick={() => toggleEdit(c)} 
                                title={"Edit"}  
                                className={`${editing ? "bg-gray-400" : "bg-[#F2C078] hover:bg-[#E6B85A]"}`}
                                disabled={editing}
                            />
                            <Button 
                                onClick={() => deleteCategory(c.categoryId)} 
                                title={processing && !editing ? "Deleting..." : "Delete"}  
                                className={`${editing ? "bg-gray-400" : "bg-red-500 hover:bg-red-700"}`}
                                disabled={editing}
                            />
                        </>
                      )

                      }
                    </td>
                </tr>))
                ) : (
                    <tr>
                       <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No recipe found</td>
                    </tr>
                )
            }
            
           
        </tbody>
    </table>
</div>

</>

)}