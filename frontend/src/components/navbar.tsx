import { useNavigate } from "react-router";

import { Dices, House, Trophy, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function NavigationMenuItems() {
  const navigate = useNavigate();
  return (
    <div className="fixed right-0 top-1/4 transform -translate-y-1/2 flex flex-col p-4 bg-white rounded-l-lg shadow-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <Button onClick={()=> navigate("/home")} variant="neutral"><House size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/game")} variant="neutral"><Dices size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/leader-board")} variant="neutral"><Trophy size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/leader-board")} variant="default"><LogOut size={32} strokeWidth={2}/></Button>
      </div>
    </div>
  );
}
