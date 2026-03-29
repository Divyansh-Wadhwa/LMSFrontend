export default function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition">
      
      <p className="text-sm text-muted">{title}</p>

      <h2 className="text-2xl font-semibold text-primary mt-2">
        {value}
      </h2>

    </div>
  )
}
