import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import { studentService } from './services/studentService';
import { GraduationCap } from 'lucide-react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
      setDataLoaded(true);
    } catch (err) {
      setError('Failed to load students: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const newStudent = await studentService.createStudent(studentData);
      setStudents([newStudent, ...students]);
      setCurrentView('list');
    } catch (err) {
      setError('Failed to add student: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedStudent = await studentService.updateStudent(editingStudent.id, studentData);
      setStudents(students.map(s => s.id === editingStudent.id ? updatedStudent : s));
      setEditingStudent(null);
      setCurrentView('list');
    } catch (err) {
      setError('Failed to update student: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.deleteStudent(id);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      setError('Failed to delete student: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setCurrentView('form');
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setCurrentView('details');
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setCurrentView('list');
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setEditingStudent(null);
    setCurrentView('list');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <GraduationCap size={32} />
            <h1>Student Result Management System</h1>
          </div>
          <nav className="nav-buttons">
            {currentView !== 'list' && (
              <button className="btn btn-secondary" onClick={handleBackToList}>
                Back to List
              </button>
            )}
            {currentView === 'list' && (
              <>
                {!dataLoaded && (
                  <button className="btn btn-primary" onClick={loadStudents} disabled={loading}>
                    {loading ? 'Loading...' : 'Load Students'}
                  </button>
                )}
                {dataLoaded && (
                  <>
                    <button className="btn btn-secondary" onClick={loadStudents} disabled={loading}>
                      Refresh
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEditingStudent(null);
                        setCurrentView('form');
                      }}
                    >
                      Add New Student
                    </button>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button className="btn-close" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {loading && <div className="loading-spinner">Loading...</div>}

        {currentView === 'list' && (
          <div className="content-wrapper">
            {!dataLoaded ? (
              <div className="welcome-screen">
                <GraduationCap size={64} />
                <h2>Welcome to Student Result Management</h2>
                <p>Click "Load Students" to view all students</p>
              </div>
            ) : (
              <StudentList
                students={students}
                onEdit={handleEditClick}
                onDelete={handleDeleteStudent}
                onViewDetails={handleViewDetails}
              />
            )}
          </div>
        )}

        {currentView === 'form' && (
          <div className="content-wrapper">
            <StudentForm
              editingStudent={editingStudent}
              onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {currentView === 'details' && (
          <div className="content-wrapper">
            <StudentDetails
              student={selectedStudent}
              onBack={handleBackToList}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Student Result Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
