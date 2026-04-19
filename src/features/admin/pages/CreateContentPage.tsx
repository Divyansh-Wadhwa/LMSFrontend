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
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Create Learning Content</h1>
            <p className="text-indigo-100 text-lg">Build practice problems, hands-on labs, and assessments for learners</p>
          </div>
        </div>

        {/* Content Type Tabs with Modern Design */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6">
            <nav className="flex space-x-2 py-3">
              {([
                { id: 'problem', label: 'Problem', icon: '💻', color: 'blue' },
                { id: 'lab', label: 'Lab', icon: '🧪', color: 'emerald' },
                { id: 'assessment', label: 'Assessment', icon: '📝', color: 'purple' }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ContentType)}
                  className={`py-3 px-6 rounded-xl font-semibold text-sm capitalize flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-gradient-to-b from-white to-gray-50/30">
            {/* Common Fields */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={`e.g., ${activeTab === 'problem' ? 'Two Sum Challenge' : activeTab === 'lab' ? 'Docker Basics Lab' : 'JavaScript Fundamentals Quiz'}`}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Difficulty *</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                >
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Duration *</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2 hours"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., array, sorting, easy"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Describe this ${activeTab}...`}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none"
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
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
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
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-200 opacity-30 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tips for Creating Great Content</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Use clear, descriptive titles that indicate what learners will accomplish',
                'Match difficulty level to your target audience\'s skill level',
                'Include multiple test cases for practice problems (edge cases too!)',
                'Break labs into clear, actionable steps',
                'Use a mix of question types in assessments',
                'Add relevant tags to help learners find your content'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white/60 rounded-lg p-3">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default CreateContentPage
