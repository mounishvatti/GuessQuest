import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import store from "@/store";
import { logout as logoutAction } from "../store/slices/authSlice";
import { Dices, House, Trophy, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";

export default function NavigationMenuItems() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  return (
    <div className="fixed right-0 top-1/4 transform -translate-y-1/2 flex flex-col p-4 bg-white rounded-l-lg shadow-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <Button onClick={()=> navigate("/home")} variant="neutral"><House size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/game")} variant="neutral"><Dices size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/leader-board")} variant="neutral"><Trophy size={32} strokeWidth={2}/></Button>
        {isAuthenticated && <Button onClick={()=> navigate("/user-profile")} variant="neutral"><User size={32} strokeWidth={2}/></Button>}
        {isAuthenticated && <Button onClick={()=> store.dispatch(logoutAction())} variant="default"><LogOut size={32} strokeWidth={2}/></Button>}
      </div>
    </div>
  );
}
