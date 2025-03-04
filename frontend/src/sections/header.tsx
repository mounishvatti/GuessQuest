import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-full px-5 py-[50px] md:py-[100px] text-center flex flex-col md:flex-row items-center justify-center">
        <div className="md:pl-28 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-heading font-serif">
            GuessQuest
          </h1>
          <p className="my-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
            "Guess right, feel bright. Guess wrong, try all night!"
          </p>
          <Button
            size="lg"
            className="h-12 text-base md:text-lg lg:h-14 lg:text-xl"
            onClick={() => navigate("/auth")}
          >
            Get started
          </Button>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/question-mark.svg"
            alt="GuessQuest"
            className="w-6/12 md:w-3/12 mx-auto hidden sm:block"
          />
          <img
            src="/honey.png"
            alt="GuessQuest"
            className="w-8/12 md:w-6/12 mx-auto mt-4 md:mt-0 hidden sm:block"
          />
        </div>
      </div>
    </header>
  );
}
