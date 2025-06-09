import WelcomeTransition from "@/components/welcome-transition";

export default function Main() {
  return (
    <>
      <WelcomeTransition />
      <main className="">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 hover:text-black">
            Welcome to the Main Page
          </h1>
        </div>
      </main>
    </>
  );
}
