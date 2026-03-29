export default function DifficultyBadge({ level }: { level: string }) {
  const styles = {
    Easy: "bg-green-100 text-green-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Hard: "bg-red-100 text-red-600"
  }

  return (
    <span className={`px-2 py-1 rounded text-xs ${styles[level]}`}>
      {level}
    </span>
  )
}
