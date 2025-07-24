import AnimatedText from "@/components/ui/animated-text";
import Image from "next/image";
import Space from "../../public/space.jpg";

export default function Main() {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <main className="">
      <div className="flex flex-col md:flex-row md:items-start items-center  justify-center h-screen py-16 gap-12 px-4 ">
        <div className=" flex flex-col md:items-start items-center space-y-8 h-full">
          <AnimatedText
            animationType="fadeUp"
            className="md:text-5xl text-2xl md:text-left text-center  font-semibold leading-snug whitespace-pre md:mt-20 mt-12 "
          >
            {`${getTimeBasedGreeting()}, I'm Saif Alqady\nand this is my SPACE`}
          </AnimatedText>
          <AnimatedText
            delay={0.6}
            animationType="fadeUp"
            className="text-md  font-light whitespace-pre-line"
          >
            {`I share here my work, my thoughts, my experiments, and
          more—exploring ideas,\ndocumenting progress, and reflecting on the
          journey.`}
          </AnimatedText>
        </div>

        <Image
          src={Space}
          alt="space-image"
          width={500}
          className="rounded-2xl"
        />
      </div>
    </main>
  );
}
