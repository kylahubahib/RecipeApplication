import { useState, useEffect } from "react";
import Button from "../button";
import InputGroup from "../input";
import TextAreaGroup from "../text-area";
import { api } from "../../services/api";
import CategoryDropdown from "../dropdown";

export default function UpdateRecipe({fetchRecipe, recipe}) {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    instruction: "",
    image: "",
    category: ""
  })

  // console.log(recipe.image);

  function toggleModal() { 
    setOpen(!open);
  }

  function handleCategoryChange(id) {
    setInputData({...inputData, category : id});
    console.log(id);
  }

  function UpdateRecipe() {
    var recipeId = recipe.recipeId;
    var title = inputData.title ? inputData.title : recipe.title;
    var description = inputData.description ? inputData.description : recipe.description;
    var instruction = inputData.instruction ? inputData.instruction : recipe.instruction;
    var image = inputData.image;
    var categoryId = inputData.category ? inputData.category : recipe.categoryId;
    var createdAt = recipe.createdAt;



    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Instruction", instruction);
    if(image) {
      formData.append("Image", image); 
    }
    formData.append("CategoryId", categoryId);
    formData.append("CreatedAt", createdAt);

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = api.updateRecipe(recipeId, formData);

      alert("Succesfully updated recipe!")
    } catch(err) {
      alert(err);
    } finally {
      cancelEdit();
      fetchRecipe();
    }

  }

  function cancelEdit() {
    setInputData({
      title: "",
      description: "",
      instruction: "",
      image: "",
      category: ""
    })

    setOpen(false);
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
      <Button title={"Edit"}  onClick={toggleModal} className=" bg-[#F2C078] hover:bg-[#E6B85A]"/>

      {open && (
        <div className="fixed overflow-auto inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Update Recipe
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
                        value={inputData.title ? inputData.title : recipe.title}
                        
                    />
                </div>
                <div>
                    <InputGroup 
                        labelName={"Description"} 
                        placeHolder={"Enter Description..."} 
                        type="text"
                        onChange={(e) => setInputData({...inputData, description: e.target.value})}
                        value={inputData.description ? inputData.description : recipe.description}
                    />
                </div>
                <div>
                    <TextAreaGroup 
                        labelName={"Instructions"} 
                        placeHolder={"Provide instructions"} 
                        rows={4}
                        onChange={(e) => setInputData({...inputData, instruction: e.target.value})}
                        value={inputData.instruction ? inputData.instruction : recipe.instruction}
                    />
                </div>
                <div className="flex space-x-7 mt-8">
                     <div className="w-40 h-40">
                        {inputData.image ? (
                           <img 
                          className="w-40 h-40 object-cover rounded-md" 
                          src={URL.createObjectURL(inputData.image)} 
                          alt={inputData.title} 
                        />
                        ) : (
                           <img 
                          className="w-40 h-40 object-cover rounded-md" 
                          src={recipe.image == null ? "/bg-food.png" : recipe.image} 
                          alt={recipe.title} 
                        />
                        )}
                       
                    </div>
                    <div>
                      <InputGroup 
                        labelName={"Upload New Image"} 
                        type="file"
                        onChange={(e) => setInputData({...inputData, image: e.target.files[0]})}
                        accept="image/*"
                      />
                    </div>
                </div>
                <div>
                   <CategoryDropdown handleCategory={handleCategoryChange} selectedId={recipe.categoryId}/>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center space-x-3 p-4 mx-5 md:p-5 border-t border-gray-200 rounded-b">
                <Button title={"Save Edit"} onClick={UpdateRecipe} className=" bg-[#FE5D26] hover:bg-[#E6B85A]"/>
                <Button title={"Cancel"} onClick={cancelEdit} className=" bg-red-500 hover:bg-red-700]"/>
               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
