import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MarksForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    theoryMarks: {
      maths: '',
      chemistry: '',
      physics: '',
      english: '',
      socialStudies: ''
    },
    practicalMarks: {
      mathsPractical: '',
      chemistryPractical: '',
      physicsPractical: '',
      englishPractical: '',
      socialStudiesPractical: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'https://marks-management-backend.onrender.com/api';

  const fetchExistingMarks = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/marks`);
      if (response.data.length > 0) {
        const existingMarks = response.data[0];
        setFormData({
          studentName: existingMarks.studentName || '',
          theoryMarks: existingMarks.theoryMarks || {},
          practicalMarks: existingMarks.practicalMarks || {}
        });
      }
    } catch (error) {
      console.log('No existing marks found');
    }
  }, [API_URL]);

  useEffect(() => {
    fetchExistingMarks();
  }, [fetchExistingMarks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('theory') || name.startsWith('practical')) {
      const [category, subject] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subject]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Convert string values to numbers
      const processedTheoryMarks = {};
      const processedPracticalMarks = {};

      Object.keys(formData.theoryMarks).forEach(key => {
        processedTheoryMarks[key] = parseFloat(formData.theoryMarks[key]) || 0;
      });

      Object.keys(formData.practicalMarks).forEach(key => {
        processedPracticalMarks[key] = parseFloat(formData.practicalMarks[key]) || 0;
      });

      await axios.post(`${API_URL}/marks`, {
        studentName: formData.studentName,
        theoryMarks: processedTheoryMarks,
        practicalMarks: processedPracticalMarks
      });

      setSuccess('Marks saved successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save marks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#667eea' }}>
          📝 Enter Your Marks
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            {/* Theory Marks */}
            <div>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📚 Theory Subjects (Out of 100)</h3>
              {[
                { key: 'maths', label: 'Mathematics' },
                { key: 'chemistry', label: 'Chemistry' },
                { key: 'physics', label: 'Physics' },
                { key: 'english', label: 'English' },
                { key: 'socialStudies', label: 'Social Studies' }
              ].map(subject => (
                <div key={subject.key} className="form-group">
                  <label htmlFor={`theory.${subject.key}`}>{subject.label}</label>
                  <input
                    type="number"
                    id={`theory.${subject.key}`}
                    name={`theory.${subject.key}`}
                    value={formData.theoryMarks[subject.key]}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="Enter marks (0-100)"
                  />
                </div>
              ))}
            </div>

            {/* Practical Marks */}
            <div>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>🔬 Practical Subjects (Out of 50)</h3>
              {[
                { key: 'mathsPractical', label: 'Maths Practical' },
                { key: 'chemistryPractical', label: 'Chemistry Practical' },
                { key: 'physicsPractical', label: 'Physics Practical' },
                { key: 'englishPractical', label: 'English Practical' },
                { key: 'socialStudiesPractical', label: 'Social Studies Practical' }
              ].map(subject => (
                <div key={subject.key} className="form-group">
                  <label htmlFor={`practical.${subject.key}`}>{subject.label}</label>
                  <input
                    type="number"
                    id={`practical.${subject.key}`}
                    name={`practical.${subject.key}`}
                    value={formData.practicalMarks[subject.key]}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    placeholder="Enter marks (0-50)"
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              type="submit" 
              className="btn" 
              style={{ marginRight: '10px' }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Marks'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarksForm;
