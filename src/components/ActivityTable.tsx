export default function ActivityTable() {
  const data = [
    { problem: "LRU Cache", status: "Accepted", score: 100 },
    { problem: "Binary Tree", status: "Wrong", score: 40 }
  ]

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">

      <div className="p-5 border-b font-semibold text-primary">
        Recent Activity
      </div>

      {data.map((item, i) => (
        <div
          key={i}
          className="flex justify-between p-5 border-b text-sm hover:bg-gray-50"
        >
          <span>{item.problem}</span>

          <span className={
            item.status === "Accepted"
              ? "text-green-600"
              : "text-red-500"
          }>
            {item.status}
          </span>

          <span>{item.score}</span>
        </div>
      ))}

    </div>
  )
}
