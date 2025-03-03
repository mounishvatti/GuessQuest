import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-full px-5 py-[100px] text-center flex items-center justify-center">
        <div className="pl-28">
          {/* <img
            src="/honeybee.png"
            alt="GuessQuest"
            className="w-3/12 mx-auto"
          /> */}
          <h1 className="text-5xl font-heading md:text-4xl lg:text-5xl font-serif">
            GuessQuest
          </h1>
          <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
            "Guess right, feel bright. Guess wrong, try all night!"
          </p>
          <Button
            size="lg"
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            onClick={() => navigate("/auth")}
          >
            Get started
          </Button>
        </div>
        <div className="flex flex-col">
          <img
            src="/question-mark.svg"
            alt="GuessQuest"
            className="w-3/12 mx-auto"
          />
          <img src="/honey.png" alt="GuessQuest" className="w-6/12 mx-auto" />
        </div>
      </div>
    </header>
  );
}
