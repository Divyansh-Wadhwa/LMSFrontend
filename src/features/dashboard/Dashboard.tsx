import StatCard from "../../components/StatCard"
import ActivityTable from "../../components/ActivityTable"

export default function Dashboard() {
  return (
    <div>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Good morning, Divyansh 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Rank" value="#4" />
        <StatCard title="Problems Solved" value="247" />
        <StatCard title="Assessments" value="12" />
        <StatCard title="Streak" value="18 days" />
      </div>

      {/* Activity */}
      <div className="mt-8">
        <ActivityTable />
      </div>

    </div>
  )
}
