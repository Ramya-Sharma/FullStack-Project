import { useState } from 'react';

function StudentForm({ editingStudent, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    editingStudent
      ? {
          name: editingStudent.name,
          section: editingStudent.section,
          marks: editingStudent.marks.toString(),
          grade: editingStudent.grade
        }
      : {
          name: '',
          section: '',
          marks: '',
          grade: ''
        }
  );

  const calculateGrade = (marks) => {
    const score = parseInt(marks);
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'marks' && value) {
      const marks = parseInt(value);
      if (!isNaN(marks) && marks >= 0 && marks <= 100) {
        newFormData.grade = calculateGrade(marks);
      }
    }

    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.section || !formData.marks) {
      alert('Please fill all fields');
      return;
    }

    const marks = parseInt(formData.marks);
    if (isNaN(marks) || marks < 0 || marks > 100) {
      alert('Marks must be between 0 and 100');
      return;
    }

    onSave({
      name: formData.name,
      section: formData.section,
      marks: marks,
      grade: formData.grade
    });

    setFormData({ name: '', section: '', marks: '', grade: '' });
  };

  const handleCancelClick = () => {
    setFormData({ name: '', section: '', marks: '', grade: '' });
    onCancel();
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Enter section"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter marks (0-100)"
            min="0"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            readOnly
            placeholder="Auto-calculated"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
