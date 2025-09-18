import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const fetchMarks = useCallback(async () => {
    try {
      console.log('User:', user);
      console.log('Fetching marks from:', `${API_URL}/marks`);
      console.log('Auth header:', axios.defaults.headers.common['Authorization']);
      
      const response = await axios.get(`${API_URL}/marks`);
      console.log('Marks response:', response.data);
      
      if (response.data && response.data.length > 0) {
        setMarks(response.data[0]);
        console.log('Marks set successfully:', response.data[0]);
      } else {
        console.log('No marks found, creating new ones...');
        // Try to create marks by making a POST request
        try {
          const createResponse = await axios.post(`${API_URL}/marks`, {
            studentName: user?.username || 'Student'
          });
          if (createResponse.data.marks) {
            setMarks(createResponse.data.marks);
            console.log('Created new marks:', createResponse.data.marks);
          }
        } catch (createError) {
          console.error('Error creating marks:', createError);
          setError('Failed to create marks. Please try again.');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching marks:', error);
      console.error('Error details:', error.response?.data);
      setError('Failed to fetch marks: ' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  }, [user, API_URL]);

  useEffect(() => {
    if (user) {
      fetchMarks();
    } else {
      setLoading(false);
    }
  }, [user, fetchMarks]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading your marks...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div className="error">{error}</div>
          <button onClick={fetchMarks} className="btn" style={{ marginTop: '10px' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!marks) {
    // Show sample data if no marks are available
    const sampleMarks = {
      percentage: 85.5,
      grade: 'A',
      grandTotal: 642,
      totalTheory: 420,
      totalPractical: 222,
      theoryMarks: {
        maths: 85,
        chemistry: 92,
        physics: 78,
        english: 88,
        socialStudies: 77
      },
      practicalMarks: {
        mathsPractical: 45,
        chemistryPractical: 48,
        physicsPractical: 42,
        englishPractical: 44,
        socialStudiesPractical: 43
      }
    };

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          📊 Your Academic Performance (Sample Data)
        </h1>

        {/* Debug Info */}
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
          <small style={{ color: 'white' }}>
            Debug: User - {user?.username || 'None'} | 
            Marks loaded - No (Showing Sample Data) | 
            Token: {localStorage.getItem('token') ? 'Yes' : 'No'}
          </small>
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <h2>{sampleMarks.percentage}%</h2>
          <p>Overall Grade: {sampleMarks.grade}</p>
          <p>Total Marks: {sampleMarks.grandTotal}/750</p>
        </div>

        {/* Marks Display */}
        <div className="marks-grid">
          {/* Theory Marks */}
          <div className="marks-card">
            <h3>📚 Theory Subjects (Out of 100)</h3>
            <div className="marks-row">
              <span>Mathematics</span>
              <span>{sampleMarks.theoryMarks.maths}/100</span>
            </div>
            <div className="marks-row">
              <span>Chemistry</span>
              <span>{sampleMarks.theoryMarks.chemistry}/100</span>
            </div>
            <div className="marks-row">
              <span>Physics</span>
              <span>{sampleMarks.theoryMarks.physics}/100</span>
            </div>
            <div className="marks-row">
              <span>English</span>
              <span>{sampleMarks.theoryMarks.english}/100</span>
            </div>
            <div className="marks-row">
              <span>Social Studies</span>
              <span>{sampleMarks.theoryMarks.socialStudies}/100</span>
            </div>
            <div className="marks-row">
              <span><strong>Total Theory</strong></span>
              <span><strong>{sampleMarks.totalTheory}/500</strong></span>
            </div>
          </div>

          {/* Practical Marks */}
          <div className="marks-card">
            <h3>🔬 Practical Subjects (Out of 50)</h3>
            <div className="marks-row">
              <span>Maths Practical</span>
              <span>{sampleMarks.practicalMarks.mathsPractical}/50</span>
            </div>
            <div className="marks-row">
              <span>Chemistry Practical</span>
              <span>{sampleMarks.practicalMarks.chemistryPractical}/50</span>
            </div>
            <div className="marks-row">
              <span>Physics Practical</span>
              <span>{sampleMarks.practicalMarks.physicsPractical}/50</span>
            </div>
            <div className="marks-row">
              <span>English Practical</span>
              <span>{sampleMarks.practicalMarks.englishPractical}/50</span>
            </div>
            <div className="marks-row">
              <span>Social Studies Practical</span>
              <span>{sampleMarks.practicalMarks.socialStudiesPractical}/50</span>
            </div>
            <div className="marks-row">
              <span><strong>Total Practical</strong></span>
              <span><strong>{sampleMarks.totalPractical}/250</strong></span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={fetchMarks} className="btn" style={{ marginRight: '10px' }}>
            Try to Load Real Marks
          </button>
          <Link to="/marks" className="btn btn-secondary">
            Add Your Marks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        📊 Your Academic Performance
      </h1>

      {/* Debug Info removed for production */}

      {/* Summary Card */}
      <div className="summary-card">
        <h2>{marks.percentage || 0}%</h2>
        <p>Overall Grade: {marks.grade || 'N/A'}</p>
        <p>Total Marks: {marks.grandTotal || 0}/750</p>
      </div>

      {/* Marks Display */}
      <div className="marks-grid">
        {/* Theory Marks */}
        <div className="marks-card">
          <h3>📚 Theory Subjects (Out of 100)</h3>
          <div className="marks-row">
            <span>Mathematics</span>
            <span>{marks.theoryMarks?.maths || 0}/100</span>
          </div>
          <div className="marks-row">
            <span>Chemistry</span>
            <span>{marks.theoryMarks?.chemistry || 0}/100</span>
          </div>
          <div className="marks-row">
            <span>Physics</span>
            <span>{marks.theoryMarks?.physics || 0}/100</span>
          </div>
          <div className="marks-row">
            <span>English</span>
            <span>{marks.theoryMarks?.english || 0}/100</span>
          </div>
          <div className="marks-row">
            <span>Social Studies</span>
            <span>{marks.theoryMarks?.socialStudies || 0}/100</span>
          </div>
          <div className="marks-row">
            <span><strong>Total Theory</strong></span>
            <span><strong>{marks.totalTheory || 0}/500</strong></span>
          </div>
        </div>

        {/* Practical Marks */}
        <div className="marks-card">
          <h3>🔬 Practical Subjects (Out of 50)</h3>
          <div className="marks-row">
            <span>Maths Practical</span>
            <span>{marks.practicalMarks?.mathsPractical || 0}/50</span>
          </div>
          <div className="marks-row">
            <span>Chemistry Practical</span>
            <span>{marks.practicalMarks?.chemistryPractical || 0}/50</span>
          </div>
          <div className="marks-row">
            <span>Physics Practical</span>
            <span>{marks.practicalMarks?.physicsPractical || 0}/50</span>
          </div>
          <div className="marks-row">
            <span>English Practical</span>
            <span>{marks.practicalMarks?.englishPractical || 0}/50</span>
          </div>
          <div className="marks-row">
            <span>Social Studies Practical</span>
            <span>{marks.practicalMarks?.socialStudiesPractical || 0}/50</span>
          </div>
          <div className="marks-row">
            <span><strong>Total Practical</strong></span>
            <span><strong>{marks.totalPractical || 0}/250</strong></span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/marks" className="btn">
          Update Your Marks
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
