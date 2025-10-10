import { useState } from "react";
import { api } from "../../services/api";
import Button from "../button";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount({userId}) {
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    async function deleteAccount() {
        setProcessing(true);
        setError("");
        try {
            if(confirm("Are you sure you want to delete your account?")) {  
                await api.deleteAccount(userId)
                localStorage.removeItem("authToken");
                localStorage.removeItem("currentUser");
                navigate('/login');
            }
        } catch (err) {
            setError("Error: "+ err.message || "Something went wrong. Try again later");
        } finally {
            setProcessing(false);
        }
    }

return (
    <div className="m-10">
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
            <span className="font-bold text-red-600 text-xl">WARNING: </span>
            <label className="text-gray-900 font-medium">
                Deleting your account will permanently remove all your data. This action is irreversible.
            </label>
            </div>

             <label className="text-red-600 text-sm">{error}</label>

            <Button title={processing ? "DELETING..." : "DELETE ACCOUNT"} onClick={() => deleteAccount()} className="bg-red-600 hover:bg-red-800 w-[200px]"/> 
        </div>
    </div>
)}