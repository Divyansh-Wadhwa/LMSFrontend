import Editor from "@monaco-editor/react"

export default function IDE() {
  return (
    <div className="h-full flex flex-col">
      <Editor height="80%" defaultLanguage="javascript" />

      <div className="bg-black text-green-400 p-3 text-sm">
        Console Output
      </div>
    </div>
  )
}
