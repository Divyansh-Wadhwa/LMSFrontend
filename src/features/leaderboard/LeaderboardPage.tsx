export default function LeaderboardPage() {
  const data = [
    { rank: 1, name: "Aman", score: 980 },
    { rank: 2, name: "Riya", score: 940 },
    { rank: 3, name: "You", score: 920 }
  ]

  return (
    <div>
      <h1 className="text-2xl mb-6">Leaderboard</h1>

      <div className="bg-white rounded shadow">
        {data.map((user) => (
          <div
            key={user.rank}
            className="flex justify-between p-4 border-b"
          >
            <span>#{user.rank}</span>
            <span>{user.name}</span>
            <span>{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
