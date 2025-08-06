const ComingSoon = ({ pageName }: { pageName: string }) => {
  return (
    <div className="flex justify-center items-center  h-screen text-center">
      <h1 className="md:text-4xl text-lg font-bold text-primary">{`${pageName} page is Coming Soon`}</h1>
    </div>
  );
};

export default ComingSoon;
