import { useState } from "react";
import InputGroup from "../input";
import Button from "../button";
import { api } from "../../services/api";

export default function ChangePassword({userInfo}) {
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

   function toggleEdit() {
        setIsEditing(!isEditing);
    }

    async function submitPassword(e) {
        e.preventDefault();
        setError("");
        setProcessing(true);

        try {
            const res = await api.updatePassword(userInfo.userId, {
                UserId: userInfo.userId,
                OldPassword: oldPass,
                NewPassword: newPass
            })
            setOldPass("");
            setNewPass("");
            alert("Successfully changed password!");
            toggleEdit();
        } catch(err) {
            console.log(err.response);
            if(err.response.data.errors) {
                setError(err.response.data.errors.NewPassword);
            } else {
                setError(err.response.data)
            }

        } finally {
            setProcessing(false);
        }
    }

return (
    <div className="m-10">
        <form onSubmit={submitPassword} className=" space-y-3">
        <div className="max-w-1/4">
            <InputGroup
                labelName={"Old Password"}
                placeHolder="••••••••"
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                required
                disabled={!isEditing}
            />
        </div>

        <div className="max-w-1/4">
            <InputGroup
                labelName={"New Password"}
                placeHolder="••••••••"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                disabled={!isEditing}
            />
        </div>

        <div>
            <label className="text-red-600 text-sm">{error}</label>
        </div>

        <div className="pt-2">
            {isEditing ? 
                <div className="space-x-2">
                    <Button title={processing ? "Saving..." : "Save"} type="submit" disabled={processing} className=" bg-[#FE5D26] hover:bg-[#E6B85A]"/> 
                    <Button title={"Cancel"} onClick={() => toggleEdit()} disabled={processing} className="bg-red-600 hover:bg-red-800"/> 
                </div> 
            : 
                <div>
                    <Button title={"Edit Password"} onClick={() => toggleEdit()} className=" bg-[#FE5D26] hover:bg-[#E6B85A]"/> 
                </div>
            }
        </div>
        </form>
    </div>
)}