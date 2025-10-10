import { useState } from "react";
import Button from "../button";
import InputGroup from "../input";
import { api } from "../../services/api";

export default function CreateCategory({ fetchCategories, editing }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitCategory(e) {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.createCategory({categoryName : categoryName});
      if (res) {
        alert("Category added successfully!");
        setCategoryName(""); 
        if (fetchCategories) fetchCategories(); 
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitCategory} className="flex flex-row space-x-5">
      <InputGroup
        placeHolder={"Enter category name..."}
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
        disabled={editing}
      />
      <Button
        type="submit"
        title={loading ? "Adding..." : "Add"}
        className="bg-[#F2C078] hover:bg-[#E6B85A]"
        disabled={loading || editing}
      />
    </form>
  );
}
