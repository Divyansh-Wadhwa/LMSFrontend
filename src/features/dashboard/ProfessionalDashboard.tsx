import ProfessionalStatCard from "../../components/ProfessionalStatCard"
import ProfessionalActivityTable from "../../components/ProfessionalActivityTable"

export default function ProfessionalDashboard() {
  return (
    <div className="animate-fade-in">
      
      {/* Header */}
      <div style={{
        marginBottom: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--primary-800)',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, var(--primary-800) 0%, var(--accent-700) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Good morning, Divyansh 👋
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-600)',
            margin: 0
          }}>
            Ready to continue your learning journey?
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            📊 View Reports
          </button>
          <button className="btn btn-primary">
            🚀 Start Practice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        <ProfessionalStatCard 
          title="Rank" 
          value="#4" 
          change="2 positions" 
          trend="up"
        />
        <ProfessionalStatCard 
          title="Problems Solved" 
          value="247" 
          change="12 this week" 
          trend="up"
        />
        <ProfessionalStatCard 
          title="Assessments" 
          value="12" 
          change="3 completed" 
          trend="up"
        />
        <ProfessionalStatCard 
          title="Streak" 
          value="18 days" 
          change="Personal best!" 
          trend="up"
        />
      </div>

      {/* Activity Section */}
      <div className="card animate-slide-in-up">
        <div className="card-header">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--primary-800)',
              margin: 0
            }}>
              Recent Activity
            </h2>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
              View All
            </button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <ProfessionalActivityTable />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginTop: '48px'
      }}>
        <div className="card animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="card-body">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, var(--success-50) 0%, var(--success-100) 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🎯
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--primary-800)',
                  margin: '0 0 4px 0'
                }}>
                  Daily Challenge
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  margin: 0
                }}>
                  Complete today's problem to maintain your streak
                </p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Start Challenge
            </button>
          </div>
        </div>

        <div className="card animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="card-body">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, var(--warning-50) 0%, var(--warning-100) 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📚
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--primary-800)',
                  margin: '0 0 4px 0'
                }}>
                  New Course Available
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  margin: 0
                }}>
                  Advanced Data Structures just dropped!
                </p>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              Explore Course
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
