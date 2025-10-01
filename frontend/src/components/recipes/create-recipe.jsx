import { useState, useEffect } from "react";
import Button from "../button";
import InputGroup from "../input";
import TextAreaGroup from "../text-area";
import { api } from "../../services/api";
import CategoryDropdown from "../dropdown";
import validateFileExtension from "../../utils/fileValidator";

//  "recipeId": 4,
//         "creatorId": 1,
//         "title": "Spaghetti Carbonara",
//         "description": "Classic Italian pasta with creamy sauce and pancetta.",
//         "instruction": "Boil pasta, cook pancetta, mix with eggs and cheese.",
//         "image": null,
//         "createdAt": "2025-09-23T10:00:00",
//         "fullName": "Sharon Cuneta"

export default function CreateRecipe({fetchRecipe}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    instruction: "",
    image: null,
    categoryId: null
  });
  const [error, setError] = useState({
    title: "",
    category: "",
    instruction: "",
    imageSize: "",
    imageType: ""
  });

  function toggleModal() {
    setOpen(!open);
  }

  function handleCategoryChange(id) {
    setInputData({...inputData, categoryId : id});
  }
  

  async function submitRecipe() {
    setError({
      title: "",
      category: "",
      instruction: "",
      imageSize: "",
      imageType: ""
    });
    const currentUser =  JSON.parse(localStorage.getItem("currentUser"));

    const formData = new FormData();
    formData.append("Title", inputData.title);
    formData.append("Description", inputData.description ?? "");
    formData.append("Instruction", inputData.instruction);
    if (inputData.image) {
      formData.append("Image", inputData.image); 
    }
    formData.append("CategoryId", inputData.categoryId);
    formData.append("UserId", currentUser.userId)

    try {
        if (inputData.image) {
        validateFileExtension(inputData.image);
        }
        const res = await api.createRecipe(formData);

        if(res) {
          setOpen(false);
          alert("Successfully added recipe!");
          fetchRecipe();
        }
        // for (let [key, value] of formData.entries()) {
        // console.log(key, value);
    // }
    } catch(err) {
      const errorMessages = JSON.parse(err.message);
      setError({
        title: errorMessages.errors.Title?.[0] || "",
        category: errorMessages.errors.CategoryId?.[0] ? "The Category field is required." : "",
        instruction: errorMessages.errors.Instruction?.[0] || "",
        imageSize: errorMessages.errors.image?.[0] || "",
        imageType: errorMessages.errors.imageType?.[0] || "",

      });
      
    }
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);



  return (
    <>
      {/* Open modal button */}
      <Button title={"Create Recipe"}  onClick={toggleModal} className=" bg-[#F2C078] hover:bg-[#E6B85A]"/>

      {open && (
        <div className="fixed overflow-auto inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create New Recipe
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 mx-5">
                <div>
                    <InputGroup 
                        labelName={"Title"} 
                        placeHolder={"Enter title..."} 
                        type="text"
                        onChange={(e) => setInputData({...inputData, title: e.target.value})}
                    />
                     <p className="text-red-500 text-sm">{error.title}</p>
                </div>
                <div>
                    <InputGroup 
                        labelName={"Description"} 
                        placeHolder={"Enter Description..."} 
                        type="text"
                        onChange={(e) => setInputData({...inputData, description: e.target.value})}
                    />
                    
                </div>
                <div>
                    <TextAreaGroup 
                        labelName={"Instructions"} 
                        placeHolder={"Provide instructions"} 
                        rows={4}
                        onChange={(e) => setInputData({...inputData, instruction: e.target.value})}
                    />
                    <p className="text-red-500 text-sm">{error.instruction}</p>
                </div>
                <div>
                    <InputGroup 
                        labelName={"Upload image"} 
                        type="file"
                        onChange={(e) => setInputData({...inputData, image: e.target.files[0]})}
                        accept="image/*"
                    />
                    <p className="text-red-500 text-sm">{error.imageSize} {error.imageType}</p>
                </div>
                <div>
                    <CategoryDropdown handleCategory={handleCategoryChange}/>
                     <p className="text-red-500 text-sm">{error.category}</p>
                </div>
               
              </div>


              {/* Modal footer */}
              <div className="flex items-center p-4 mx-5 md:p-5 border-t border-gray-200 rounded-b">
                <Button onClick={submitRecipe} title={"Create"} className=" bg-[#FE5D26] hover:bg-[#E6B85A]" />
               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
