import { useState } from "react";
import { api } from "../../services/api";
import Button from "../button";
import CreateCategory from "./create-categories";
import InputGroup from "../input";

export default function DisplayCategory({data, fetchCategories}) {
    const [processing , setProcessing] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    function toggleEdit(c) {
        setEditId(c.categoryId);
        setEditing(true);
        setEditCategoryName(c.categoryName);
    }
 
    function closeEdit() {
        setEditId(null);
        setEditing(false);
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

        } catch (err) {
            alert(err);
        } finally {
            setProcessing(false);
            closeEdit();
            fetchCategories();
        }
    }

    async function deleteCategory(id) {
        setProcessing(true);
        try {
            const res = api.deleteCategory(id);
            if(res) {
                alert("Succesfully deleted category");
                fetchCategories();
            }
        } catch (err) {
            alert(err);
        } finally {
            setProcessing(false);
        }
    }

return (
<>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Category Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            { data && data.length > 0 ? (
                data.map((c) => (
                <tr key={c.categoryId} class="bg-white border-b border-gray-200">
                    {editId != c.categoryId ? 
                        <td class="px-6 py-4">{c.categoryName}</td> :
                        <td class="px-6 py-4">
                           <InputGroup
                                placeHolder={"Enter category name..."}
                                type="text"
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                            />
                        </td>
                    }
                    <td class="px-6 py-4 space-x-3">
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