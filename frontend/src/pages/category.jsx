import { useEffect, useState } from "react";
import Button from "../components/button";
import { api } from "../services/api";
import DisplayCategory from "../components/categories/display-categories";
import CreateCategory from "../components/categories/create-categories";


export default function CategoryModal({}) {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  async function fetchCategories() {
    try {
        const res = await api.getCategories();
        if(res) {
            setCategories(res);
        }
    } catch (err) {
        alert(err);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  function toggleModal() {
    setOpen(!open);
  }
  
  


  return (
    <>
      {/* Open modal button */}
      <Button title={"Category"}  onClick={toggleModal} className=" bg-[#F2C078] hover:bg-[#E6B85A]"/>

      {open && (
        <div className="fixed overflow-auto inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Category
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
                <CreateCategory fetchCategories={fetchCategories}/>
                <DisplayCategory fetchCategories={fetchCategories} data={categories} />

              </div>


              {/* Modal footer */}
              {/* <div className="flex items-center p-4 mx-5 md:p-5 border-t border-gray-200 rounded-b">
               
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
