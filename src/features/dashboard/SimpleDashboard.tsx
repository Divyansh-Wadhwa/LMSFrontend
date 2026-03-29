export default function SimpleDashboard() {
  return (
    <div>
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Good morning, Divyansh 👋
        </h1>
        <p className="text-sm text-secondary">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Rank Card */}
        <div className="bg-white border rounded shadow p-6">
          <div className="text-sm text-secondary mb-2">RANK</div>
          <div className="text-2xl font-bold text-primary">#4</div>
          <div className="text-sm text-green-600 mt-2">↑ 2 positions</div>
        </div>

        {/* Problems Solved Card */}
        <div className="bg-white border rounded shadow p-6">
          <div className="text-sm text-secondary mb-2">PROBLEMS SOLVED</div>
          <div className="text-2xl font-bold text-primary">247</div>
          <div className="text-sm text-green-600 mt-2">↑ 12 this week</div>
        </div>

        {/* Assessments Card */}
        <div className="bg-white border rounded shadow p-6">
          <div className="text-sm text-secondary mb-2">ASSESSMENTS</div>
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-green-600 mt-2">3 completed</div>
        </div>

        {/* Streak Card */}
        <div className="bg-white border rounded shadow p-6">
          <div className="text-sm text-secondary mb-2">STREAK</div>
          <div className="text-2xl font-bold text-primary">18 days</div>
          <div className="text-sm text-green-600 mt-2">Personal best!</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border rounded shadow">
        <div className="p-4 border-b font-semibold text-primary">
          Recent Activity
        </div>
        
        <div>
          {[
            { problem: "LRU Cache", difficulty: "Medium", status: "Accepted", score: 100, time: "2h ago" },
            { problem: "Binary Tree Traversal", difficulty: "Easy", status: "Wrong", score: 40, time: "5h ago" },
            { problem: "Dynamic Programming", difficulty: "Hard", status: "Accepted", score: 100, time: "1d ago" },
            { problem: "Graph Algorithms", difficulty: "Medium", status: "Accepted", score: 100, time: "2d ago" }
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between p-4 border-b text-sm hover:bg-gray-50 transition cursor-pointer"
            >
              <span className="font-semibold">{item.problem}</span>
              
              <span>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                  item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {item.difficulty}
                </span>
              </span>

              <span className={item.status === "Accepted" ? "text-green-600" : "text-red-600"}>
                {item.status}
              </span>

              <span className="font-semibold">{item.score}</span>

              <span className="text-secondary">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
