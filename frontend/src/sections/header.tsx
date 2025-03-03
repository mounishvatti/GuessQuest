import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-full px-5 py-[110px] text-center lg:py-[150px]">
        <img src="/genius.svg" alt="GuessQuest" className="w-80 mx-auto" />
        <h1 className="text-5xl font-heading md:text-4xl lg:text-5xl">
          GuessQuest
        </h1>
        <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          "Guess right, feel bright. Guess wrong, try all night!" 😆🎯
        </p>
        <Button
          size="lg"
          className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
          onClick={()=> navigate("/auth")}
        >
          Get started
        </Button>
      </div>
    </header>
  );
}
