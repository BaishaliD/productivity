export default function TimerSettings({ label, time, updateTimer }) {
  console.log("time : ", time);
  return (
    <div className="flex justify-between items-end my-2">
      <div>{label}</div>
      <div>
        <input
          className="bg-transparent focus:border-none w-20 focus:outline-none px-1 border-b border-white text-center mr-2"
          value={time}
          onChange={(e) => {
            console.log("e.target.value ", e.target.value);
            updateTimer(label, e.target.value);
          }}
        />
        <span>sec</span>
      </div>
    </div>
  );
}
