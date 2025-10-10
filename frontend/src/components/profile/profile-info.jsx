import { useState } from "react";
import InputGroup from "../input";
import Button from "../button";
import { api } from "../../services/api";

export default function ProfileInformation({userInfo, fetchProfile}) {
    const [editEmail, setEditEmail] = useState("");
    const [editName, setEditName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
  
    function toggleEdit() {
        setIsEditing(!isEditing);

        if(!isEditing) {
            setEditEmail(userInfo.email);
            setEditName(userInfo.fullName);
        } else {
            setEditEmail("");
            setEditName("");
        }
    }

    async function updateProfile(e) {
        e.preventDefault();
        setError("");

        const email = editEmail ? editEmail : userInfo.email;
        const fullname = editName ? editName : userInfo.fullName

        try {
            const res = await api.updateProfile(userInfo.userId, {Email: email, FullName: fullname})
            toggleEdit();
            alert("Successfully updated profile!");
            fetchProfile();
        } catch (err) {
            setError(err.response);
        }
    }

return (
    <div className="m-10">
        <form className="space-y-5">
            <div className="max-w-1/4">
                <InputGroup
                    labelName={"Fullname"}
                    placeHolder={"Enter your fullname..."}
                    type="text"
                    value={editName ? editName : userInfo.fullName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    disabled={!isEditing}
                />
            </div>
            <div className="max-w-1/4">
                <InputGroup
                    labelName={"Email"}
                    placeHolder={"Enter your email..."}
                    type="text"
                    value={editEmail ? editEmail : userInfo.email}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label className="text-red-600 text-sm">{error}</label>
            </div>
            {isEditing ? 
                <div className="space-x-3">
                    <Button title={"Save"} onClick={updateProfile} className=" bg-[#FE5D26] hover:bg-[#E6B85A]"/> 
                    <Button title={"Cancel"} onClick={() => toggleEdit()} className=" bg-red-600 hover:bg-red-800"/> 
                </div> : 
                <div>
                    <Button title={"Edit Profile"} onClick={() => toggleEdit()} className=" bg-[#FE5D26] hover:bg-[#E6B85A]"/> 
                </div>
            }
        </form>
    </div>
)}