const Break = ({ breakTime }: { breakTime: string }) => {
  return (
    <>
      <span className="font-bold">Break earned</span> {breakTime} minutes
    </>
  );
};

export default Break;
