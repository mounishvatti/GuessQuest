import { useNavigate } from "react-router";

import { Dices, House, Trophy } from "lucide-react";
import { Button } from "./ui/button";

export default function NavigationMenuItems() {
  const navigate = useNavigate();
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col p-4 bg-white rounded-l-lg shadow-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <Button onClick={()=> navigate("/home")} variant="reverse"><House size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/game")} variant="reverse"><Dices size={32} strokeWidth={2}/></Button>
        <Button onClick={()=> navigate("/leader-board")} variant="reverse"><Trophy size={32} strokeWidth={2}/></Button>
      </div>
    </div>
  );
}
