export default function CoursePage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Courses</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          DSA Bootcamp
        </div>

        <div className="bg-white p-4 rounded shadow">
          System Design
        </div>
      </div>
    </div>
  )
}
