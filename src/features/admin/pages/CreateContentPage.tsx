import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type ContentType = 'problem' | 'lab' | 'assessment'

interface TestCase {
  id: number
  input: string
  expectedOutput: string
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const CreateContentPage = () => {
  const [activeTab, setActiveTab] = useState<ContentType>('problem')
  
  // Common fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate')
  const [category, setCategory] = useState('programming')
  const [duration, setDuration] = useState('')
  const [tags, setTags] = useState('')
  
  // Problem specific
  const [starterCode, setStarterCode] = useState('')
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: '', expectedOutput: '' }
  ])
  
  // Lab specific
  const [labSteps, setLabSteps] = useState<string[]>([''])
  const [resources, setResources] = useState<string[]>([''])
  
  // Assessment specific
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ])
  const [passingScore, setPassingScore] = useState('70')

  const categories = ['programming', 'frontend', 'backend', 'database', 'algorithms', 'data-structures', 'devops', 'mobile', 'cloud', 'ai-ml']

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDifficulty('Intermediate')
    setCategory('programming')
    setDuration('')
    setTags('')
    setStarterCode('')
    setTestCases([{ id: 1, input: '', expectedOutput: '' }])
    setLabSteps([''])
    setResources([''])
    setQuestions([{ id: 1, question: '', options: ['', '', '', ''], correctAnswer: 0 }])
    setPassingScore('70')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const contentData = {
      type: activeTab,
      title,
      description,
      difficulty,
      category,
      duration,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      ...(activeTab === 'problem' && { starterCode, testCases }),
      ...(activeTab === 'lab' && { labSteps, resources }),
      ...(activeTab === 'assessment' && { questions, passingScore: parseInt(passingScore) })
    }
    
    console.log('Creating content:', contentData)
    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} created successfully!`)
    resetForm()
  }

  // Test case handlers
  const addTestCase = () => {
    setTestCases([...testCases, { id: Date.now(), input: '', expectedOutput: '' }])
  }
  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id))
    }
  }
  const updateTestCase = (id: number, field: keyof TestCase, value: string) => {
    setTestCases(testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc))
  }

  // Lab step handlers
  const addLabStep = () => setLabSteps([...labSteps, ''])
  const removeLabStep = (index: number) => {
    if (labSteps.length > 1) {
      setLabSteps(labSteps.filter((_, i) => i !== index))
    }
  }
  const updateLabStep = (index: number, value: string) => {
    const newSteps = [...labSteps]
    newSteps[index] = value
    setLabSteps(newSteps)
  }

  // Resource handlers
  const addResource = () => setResources([...resources, ''])
  const removeResource = (index: number) => {
    if (resources.length > 1) {
      setResources(resources.filter((_, i) => i !== index))
    }
  }
  const updateResource = (index: number, value: string) => {
    const newResources = [...resources]
    newResources[index] = value
    setResources(newResources)
  }

  // Question handlers
  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), question: '', options: ['', '', '', ''], correctAnswer: 0 }])
  }
  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }
  const updateQuestion = (id: number, field: keyof Question, value: string | number) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q))
  }
  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options]
        newOptions[optionIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const getTabIcon = (tab: ContentType) => {
    switch (tab) {
      case 'problem': return '💻'
      case 'lab': return '🧪'
      case 'assessment': return '📝'
    }
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin', 'client_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Learning Content</h1>
          <p className="text-gray-600">Build practice problems, hands-on labs, and assessments for learners</p>
        </div>

        {/* Content Type Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {(['problem', 'lab', 'assessment'] as ContentType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize flex items-center gap-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{getTabIcon(tab)}</span>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`e.g., ${activeTab === 'problem' ? 'Two Sum Challenge' : activeTab === 'lab' ? 'Docker Basics Lab' : 'JavaScript Fundamentals Quiz'}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2 hours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., array, sorting, easy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Describe this ${activeTab}...`}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Problem Specific Fields */}
            {activeTab === 'problem' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starter Code</label>
                  <textarea
                    value={starterCode}
                    onChange={(e) => setStarterCode(e.target.value)}
                    placeholder="function solution(params) {\n  // Write your code here\n}"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Test Cases *</label>
                    <button
                      type="button"
                      onClick={addTestCase}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Test Case
                    </button>
                  </div>
                  <div className="space-y-3">
                    {testCases.map((tc, index) => (
                      <div key={tc.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Test Case {index + 1}</span>
                          {testCases.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTestCase(tc.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Input</label>
                            <input
                              type="text"
                              value={tc.input}
                              onChange={(e) => updateTestCase(tc.id, 'input', e.target.value)}
                              placeholder="1, 2, 3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Expected Output</label>
                            <input
                              type="text"
                              value={tc.expectedOutput}
                              onChange={(e) => updateTestCase(tc.id, 'expectedOutput', e.target.value)}
                              placeholder="6"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lab Specific Fields */}
            {activeTab === 'lab' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Lab Steps *</label>
                    <button
                      type="button"
                      onClick={addLabStep}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="space-y-3">
                    {labSteps.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => updateLabStep(index, e.target.value)}
                          placeholder={`Step ${index + 1} description...`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        {labSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLabStep(index)}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Resources (Links/Materials)</label>
                    <button
                      type="button"
                      onClick={addResource}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Resource
                    </button>
                  </div>
                  <div className="space-y-2">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={resource}
                          onChange={(e) => updateResource(index, e.target.value)}
                          placeholder={`Resource link or description ${index + 1}...`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {resources.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResource(index)}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Assessment Specific Fields */}
            {activeTab === 'assessment' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={passingScore}
                      onChange={(e) => setPassingScore(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Questions *</label>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Question
                    </button>
                  </div>
                  <div className="space-y-4">
                    {questions.map((q, qIndex) => (
                      <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Question {qIndex + 1}</span>
                          {questions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeQuestion(q.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                          placeholder="Enter your question..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                          required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${q.id}`}
                                checked={q.correctAnswer === oIndex}
                                onChange={() => updateQuestion(q.id, 'correctAnswer', oIndex)}
                                className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                                required
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(q.id, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                required
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Select radio button for correct answer</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Tips for Creating Great Content</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use clear, descriptive titles that indicate what learners will accomplish</li>
            <li>• Match difficulty level to your target audience's skill level</li>
            <li>• Include multiple test cases for practice problems (edge cases too!)</li>
            <li>• Break labs into clear, actionable steps</li>
            <li>• Use a mix of question types in assessments</li>
            <li>• Add relevant tags to help learners find your content</li>
          </ul>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default CreateContentPage
