import { useParams } from "react-router-dom"

export default function ExactProblemSolve() {
  const { id } = useParams()

  return (
    <div>
      
      {/* Header */}
      <div style={{
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          Two Sum
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            backgroundColor: '#dcfce7',
            color: '#16a34a'
          }}>
            Easy
          </span>
          <span style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Acceptance: 45.2%
          </span>
        </div>
      </div>

      {/* Layout */}
      <div style={{
        display: 'flex',
        gap: '24px',
        height: 'calc(100vh - 200px)'
      }}>

        {/* Problem Description */}
        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'auto'
        }}>
          
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Description
          </h2>
          
          <div style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#374151'
          }}>
            <p style={{ margin: '0 0 16px 0' }}>
              Given an array of integers <code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>nums</code> and an integer <code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>target</code>, return indices of the two numbers such that they add up to <code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>target</code>.
            </p>
            
            <p style={{ margin: '0 0 16px 0' }}>
              You may assume that each input would have exactly one solution, and you may not use the same element twice.
            </p>
            
            <p style={{ margin: '0 0 24px 0' }}>
              You can return the answer in any order.
            </p>

            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 12px 0'
            }}>
              Example 1:
            </h3>
            
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              <div><strong>Input:</strong> nums = [2,7,11,15], target = 9</div>
              <div><strong>Output:</strong> [0,1]</div>
              <div><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
            </div>

            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 12px 0'
            }}>
              Example 2:
            </h3>
            
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              <div><strong>Input:</strong> nums = [3,2,4], target = 6</div>
              <div><strong>Output:</strong> [1,2]</div>
            </div>

            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 12px 0'
            }}>
              Constraints:
            </h3>
            
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              color: '#374151'
            }}>
              <li>2 ≤ nums.length ≤ 10⁴</li>
              <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>-10⁹ ≤ target ≤ 10⁹</li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>
        </div>

        {/* Code Editor */}
        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Language Selector */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <select style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: '#ffffff'
            }}>
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
            
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#6b7280',
                cursor: 'pointer'
              }}>
                Run
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#ffffff',
                cursor: 'pointer'
              }}>
                Submit
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#1e293b',
            color: '#e5e7eb',
            overflow: 'auto'
          }}>
            <pre style={{ margin: 0 }}>
{`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    
};`}
            </pre>
          </div>

          {/* Console Output */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            fontSize: '14px',
            color: '#6b7280',
            minHeight: '80px'
          }}>
            <div style={{
              fontWeight: '600',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Console Output:
            </div>
            <div>
              Ready to run your code...
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
