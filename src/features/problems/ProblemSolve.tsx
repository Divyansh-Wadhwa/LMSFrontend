import { useParams } from "react-router-dom"
import Editor from "@monaco-editor/react"
import { useState } from "react"

export default function ProblemSolve() {
  const { id } = useParams()
  const [code, setCode] = useState("")

  const runCode = () => {
    console.log("Running:", code)
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-bold">Problem {id}</h2>
        <p className="mt-2">Solve this problem...</p>
      </div>

      <div className="flex flex-col">
        <Editor
          height="70%"
          defaultLanguage="python"
          value={code}
          onChange={(v) => setCode(v || "")}
        />

        <button
          onClick={runCode}
          className="bg-blue-600 text-white p-3 mt-2 rounded"
        >
          Run Code
        </button>
      </div>
    </div>
  )
}
