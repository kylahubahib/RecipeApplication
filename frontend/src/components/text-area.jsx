export default function TextAreaGroup({labelName, placeHolder, ...props}) {

return (
    <>
        <label className="block mb-2 text-md font-medium text-gray-900">{labelName}</label>
        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder={placeHolder}
            {...props}
        />
    </>
)}