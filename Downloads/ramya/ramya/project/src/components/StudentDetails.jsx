import { User, BookOpen, Award, Hash } from 'lucide-react';

function StudentDetails({ student, onBack }) {
  if (!student) {
    return (
      <div className="details-container">
        <div className="no-data">No student selected</div>
        <button className="btn btn-primary" onClick={onBack}>
          Back to List
        </button>
      </div>
    );
  }

  const getGradeClass = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'grade-a';
    if (grade === 'B') return 'grade-b';
    if (grade === 'C') return 'grade-c';
    if (grade === 'D') return 'grade-d';
    return 'grade-f';
  };

  const getPerformanceMessage = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'Excellent Performance!';
    if (grade === 'B') return 'Good Performance';
    if (grade === 'C') return 'Average Performance';
    if (grade === 'D') return 'Below Average Performance';
    return 'Needs Improvement';
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <h2>Student Details</h2>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to List
        </button>
      </div>

      <div className="details-card">
        <div className="details-hero">
          <div className="student-avatar">
            <User size={64} />
          </div>
          <h1>{student.name}</h1>
          <p className="student-section">Section: {student.section}</p>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-icon">
              <Hash size={24} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Student ID</span>
              <span className="detail-value">{student.id.substring(0, 8).toUpperCase()}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <BookOpen size={24} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Section</span>
              <span className="detail-value">{student.section}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <Award size={24} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Marks</span>
              <span className="detail-value marks-large">{student.marks}/100</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <Award size={24} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Grade</span>
              <span className={`grade-badge-large ${getGradeClass(student.grade)}`}>
                {student.grade}
              </span>
            </div>
          </div>
        </div>

        <div className="performance-summary">
          <h3>Performance Summary</h3>
          <p className="performance-message">{getPerformanceMessage(student.grade)}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${student.marks}%` }}
            ></div>
          </div>
          <p className="percentage-text">{student.marks}% Score</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
