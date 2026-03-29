import { Link } from "react-router-dom"
import DifficultyBadge from "./DifficultyBadge"

export default function ProblemsTable({ data }: any) {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm">

      {/* Header */}
      <div className="grid grid-cols-4 p-4 border-b text-sm text-muted font-medium">
        <span>Title</span>
        <span>Difficulty</span>
        <span>Status</span>
        <span>Score</span>
      </div>

      {/* Rows */}
      {data.map((p: any) => (
        <Link
          key={p.id}
          to={`/problem/${p.id}`}
          className="grid grid-cols-4 p-4 border-b text-sm hover:bg-gray-50 transition"
        >
          <span className="text-primary font-medium">
            {p.title}
          </span>

          <span>
            <DifficultyBadge level={p.difficulty} />
          </span>

          <span
            className={
              p.status === "Solved"
                ? "text-green-600"
                : "text-gray-400"
            }
          >
            {p.status}
          </span>

          <span>{p.score}</span>
        </Link>
      ))}

    </div>
  )
}
