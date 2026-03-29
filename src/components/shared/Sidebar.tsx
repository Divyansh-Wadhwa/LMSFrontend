import { Link, useLocation } from "react-router-dom"

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Labs", path: "/labs" },
  { name: "Practice", path: "/practice" },
  { name: "Assessments", path: "/assessments" },
  { name: "Learn", path: "/learn" },
  { name: "IDE", path: "/ide" },
  { name: "Resources", path: "/resources" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Discussion", path: "/discussion" }
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border-r border-border p-5 flex flex-col">

      {/* Logo */}
      <h1 className="text-lg font-semibold mb-8 text-primary">
        TRIAD LMS
      </h1>

      {/* Menu */}
      <div className="space-y-2">
        {menu.map((item) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-xl text-sm transition ${
                active
                  ? "bg-accent text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>

    </div>
  )
}
