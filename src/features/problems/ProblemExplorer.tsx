import FiltersPanel from "./components/FiltersPanel"
import ProblemsTable from "./components/ProblemsTable"
import { useProblems } from "./hooks/useProblems"

export default function ProblemExplorer() {
  const { data, isLoading } = useProblems()

  if (isLoading) return <p>Loading problems...</p>

  const problems = data || [
    {
      id: 1,
      title: "LRU Cache",
      difficulty: "Medium",
      status: "Solved",
      score: 100
    },
    {
      id: 2,
      title: "Binary Tree Traversal",
      difficulty: "Easy",
      status: "Unsolved",
      score: 0
    }
  ]

  return (
    <div>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Problem Explorer
      </h1>

      {/* Search Bar */}
      <input
        placeholder="Search problems..."
        className="w-full mb-4 p-3 border border-border rounded-xl"
      />

      {/* Layout */}
      <div className="flex gap-6">

        {/* Filters */}
        <FiltersPanel />

        {/* Table */}
        <div className="flex-1">
          <ProblemsTable data={problems} />
        </div>

      </div>

    </div>
  )
}
