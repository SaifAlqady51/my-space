const CommingSoon = ({ pageName }: { pageName: string }) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-primary">{`${pageName} page is Coming Soon`}</h1>
    </div>
  );
};

export default CommingSoon;
