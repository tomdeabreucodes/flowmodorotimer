const Break = ({ breakTime }: { breakTime: number }) => {
  return (
    <div className="mt-4">
      <span className="font-semibold">Break time: </span>{" "}
      {formatMinuteText(breakTime)}
    </div>
  );
};

function formatMinuteText(breakTime: number) {
  if (breakTime !== 1) return `${breakTime} minutes`;
  return `${breakTime} minute`;
}

export default Break;
