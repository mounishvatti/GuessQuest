import Marquee from "react-fast-marquee";

export default function Features() {
  return (
    <div className="w-full">
      <div>
        <Marquee
          className="border-y-border dark:border-y-darkBorder dark:border-darkBorder dark:bg-secondaryBlack border-y-2 bg-white py-3 font-base sm:py-5"
          direction="left"
        >
          {Array(10)
            .fill("xd")
            .map((x, id) => {
              return (
                <div className="flex items-center" key={id}>
                  <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
                    Neobrutalism components
                  </span>
                </div>
              );
            })}
        </Marquee>
      </div>
    </div>
  );
}
