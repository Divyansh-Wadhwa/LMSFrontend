export default function FiltersPanel() {
  return (
    <div className="bg-white border border-border rounded-xl p-5 w-64">

      <h2 className="font-semibold text-primary mb-4">
        Filters
      </h2>

      {/* Difficulty */}
      <div className="mb-5">
        <p className="text-sm text-muted mb-2">Difficulty</p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Easy
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Medium
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Hard
          </label>
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-sm text-muted mb-2">Status</p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Solved
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Unsolved
          </label>
        </div>
      </div>

    </div>
  )
}
