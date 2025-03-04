import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="w-full">
      <section className="dark:bg-darkBg bg-bg py-20 font-base lg:py-[100px] flex items-center justify-center">
        <div>
          <img
            src="/beehive.png"
            alt="GuessQuest"
            className="w-72 flex items-start justify-start"
          />
        </div>
        <div className="mx-auto grid w-[700px] max-w-full px-5">
          <Accordion className="text-base sm:text-lg" type="single" collapsible>
            <AccordionItem className="mb-2" value="item-1">
              <AccordionTrigger>How to play?</AccordionTrigger>
              <AccordionContent>
                It's simple! Just click the buttons and hope for the best. If
                you win, you get bragging rights. If you lose, well, there's
                always next time. Remember, it's not about winning or losing,
                it's about how much fun you have clicking those buttons!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mb-2" value="item-2">
              <AccordionTrigger>
                Where do I see the leaderboard?
              </AccordionTrigger>
              <AccordionContent>
                The leaderboard is where you can see how you stack up against
                other players. It's like a scoreboard, but cooler. Just click on
                the "Leaderboard" tab the "Trophy" icon from the navigation menu and prepare to be amazed by the high
                scores. Or, you know, mildly impressed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mb-2" value="item-3">
              <AccordionTrigger>
                Are you sure that you aren't biased?
              </AccordionTrigger>
              <AccordionContent>
                We promise, our game is as unbiased as a cat deciding whether to
                sit on your lap or your keyboard. We use advanced algorithms and
                a sprinkle of magic to ensure fairness. But if you still think
                we're biased, feel free to send us a strongly worded email.
                We'll read it while sipping our coffee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mb-2" value="item-5">
              <AccordionTrigger>What do I get if I win?</AccordionTrigger>
              <AccordionContent>
                If you win, you get the ultimate prize: bragging rights! You can
                tell all your friends and family about your amazing achievement.
                You might even get a virtual high-five from us. But seriously,
                it's all about the fun and the glory.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mb-2" value="item-6">
              <AccordionTrigger>Where do I see my past scores?</AccordionTrigger>
              <AccordionContent>
                Click on the "User" icon from the navigation menu to view your past scores, Note: You must be logged in to view your scores.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
