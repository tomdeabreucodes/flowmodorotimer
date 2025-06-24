const Break = ({ breakTime }: { breakTime: number }) => {
  return (
    <>
      <span className="font-bold">Break earned</span>{" "}
      {formatMinuteText(breakTime)}
    </>
  );
};

function formatMinuteText(breakTime: number) {
  if (breakTime !== 1) return `${breakTime} minutes`;
  return `${breakTime} minute`;
}

export default Break;
