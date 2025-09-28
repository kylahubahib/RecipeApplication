import { useState, useEffect } from "react";
import Button from "../button";
import InputGroup from "../input";
import TextAreaGroup from "../text-area";
import { api } from "../../services/api";

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
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    instruction: "",
    image: null,
    fullName: ""
  })

  function toggleModal() {
    setOpen(!open);
  }
  
  // console.log(inputData);

  async function submitRecipe() {
    const formData = new FormData();
    formData.append("Title", inputData.title);
    formData.append("Description", inputData.description ?? "");
    formData.append("Instruction", inputData.instruction);
    if (inputData.image) {
      formData.append("Image", inputData.image); 
    }
    formData.append("Name", inputData.fullName);

    try {
        const res = await api.createRecipe(formData);
        if(res) {
          setOpen(false);
          alert("Successfully added recipe!");
          fetchRecipe();
        }
    } catch(err) {
        alert("An unexpected error occurred");
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
                        req={true}
                    />
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
                        req={true}
                    />
                </div>
                <div>
                    <InputGroup 
                        labelName={"Upload image"} 
                        type="file"
                        onChange={(e) => setInputData({...inputData, image: e.target.files[0]})}
                        accept="image/*"
                    />
                </div>
                <div>
                    <InputGroup 
                        labelName={"Creator"} 
                        placeHolder={"Enter creator name..."} 
                        type="text"
                        onChange={(e) => setInputData({...inputData, fullName: e.target.value})}
                    />
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
