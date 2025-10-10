import { useEffect, useState } from "react"
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import getInitials from "../utils/initials-profile";
import { formatDate } from "../utils/formatDate";
import ProfileInformation from "../components/profile/profile-info";
import ChangePassword from "../components/profile/change-password";
import DeleteAccount from "../components/profile/delete-account";

export default function Profile ({}) {
    const loginUser = JSON.parse(localStorage.getItem("currentUser"));
    const [choice, setChoice] = useState("A");
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    async function getUserProfile() {
        try {
            const res = await api.getProfile(loginUser.userId)
            setUser(res.data);
        } catch(err) {
            if(err.response.status == 401) {
                navigate('/login')
            }
            console.log(err.response)
        }
    }

    useEffect(() => {
        getUserProfile();
    },[])

    function changeMenu(item) {
        setChoice(item);
    }

return (
    <div className="bg-[#F7FBE9] min-h-screen">
        <div className="bg-[url('bg-food.png')] w-full min-h-[250px]">
        
        <div className="flex flex-row space-x-5 p-10">
            <div className="bg-white rounded-full w-40 h-40 mx-10 text-center shadow-md text-6xl font-semibold text-[#FE5D26] justify-center inline-flex items-center">{getInitials(loginUser.fullName)}</div>
            <div className="flex flex-col justify-center text-white space-y-5">
                <label className="text-5xl font-bold text-shadow-sm">Welcome, {user.fullName}!</label>
                <label className="text-xl font-medium text-shadow-md"><b>Joined At: </b>{ formatDate(user.createdAt)}</label>
            </div>
        </div>

         <div className="flex space-x-1.5 mx-10 font-semibold">
            <button onClick={() => changeMenu("A")} className={`p-2.5 min-w-[170px] text-shadow-2xs cursor-pointer rounded-t-xl ${choice == "A" ? "bg-[#F7FBE9] text-gray-[800]" : "text-white"}`}>Profile Information</button>
            <button onClick={() => changeMenu("B")} className={`p-2.5 min-w-[170px] text-shadow-2xs cursor-pointer rounded-t-xl ${choice == "B" ? "bg-[#F7FBE9] text-gray-[800]" : "text-white"}`}>Change Password</button>
            <button onClick={() => changeMenu("C")} className={`p-2.5 min-w-[170px] text-shadow-2xs cursor-pointer rounded-t-xl ${choice == "C" ? "bg-[#F7FBE9] text-gray-[800]" : "text-white"}`}>Delete Account</button>
        </div>
        
        </div>  

        
        {choice == "A" && <ProfileInformation userInfo={user} fetchProfile={getUserProfile}/>}
        {choice == "B" && <ChangePassword userInfo={user} />}
        {choice == "C" && <DeleteAccount userId={user.userId}/>}

        

    </div>
)}