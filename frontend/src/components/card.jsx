export default function RecipeCard({title, desc, img, name}) {

return (
    <div className=" bg-white shadow-sm  rounded-lg m-5">
        {/* Image here */}
        <div className="bg-gray-300 h-40 rounded-t-lg">

        </div>
        <div className="p-2 space-y-2 flex flex-col sm:h-30 lg:h-30">
            <label className="font-bold text-gray-900 text-2xl">{title}</label>
            <label className="text-gray-700 text-sm"><b>Description:</b> {desc}</label>
            <label  className="text-gray-700 text-sm">Created By: {name}</label>
        </div>
    </div>
)}