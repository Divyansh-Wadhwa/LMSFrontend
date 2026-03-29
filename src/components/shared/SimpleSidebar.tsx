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

export default function SimpleSidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border h-screen flex flex-col">
      
      {/* Logo */}
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold text-primary">
          TRIAD
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="list-none m-0">
          {menu.map((item) => {
            const active = location.pathname === item.path

            return (
              <li key={item.name} className="mb-1">
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded transition cursor-pointer ${
                    active
                      ? "bg-blue-500 text-white"
                      : "text-secondary hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            D
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">Divyansh</div>
            <div className="text-xs text-secondary">Level 12</div>
          </div>
        </div>
      </div>

    </div>
  )
}
