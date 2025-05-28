import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hiddenFeedbacks, setHiddenFeedbacks] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!apiService.isAuthenticated()) {
        navigate('/admin');
        return;
      }

      try {
        const response = await apiService.getAllFeedback();
        console.log('Feedback response:', response);

        // Handle nested data structure more robustly
        let feedbackList = [];
        
        // Check multiple possible data locations
        if (response?.data?.data && Array.isArray(response.data.data)) {
          feedbackList = response.data.data;
        } else if (response?.data && Array.isArray(response.data)) {
          feedbackList = response.data;
        } else if (Array.isArray(response)) {
          feedbackList = response;
        }

        setFeedbacks(feedbackList);
        
        if (feedbackList.length === 0) {
          console.warn("⚠️ No feedback data found in response:", response);
        }
        
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError('Failed to load feedback data');
        
        // Handle authentication errors
        if (err.message.includes('401') || err.response?.status === 401) {
          apiService.adminLogout();
          navigate('/admin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    apiService.adminLogout();
    navigate('/admin');
  };

  const handleHide = (feedbackId) => {
    setHiddenFeedbacks((prev) => {
      const newSet = new Set(prev);
      newSet.has(feedbackId) ? newSet.delete(feedbackId) : newSet.add(feedbackId);
      return newSet;
    });
  };

  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await apiService.deleteFeedback(feedbackId);
      setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId));
      setHiddenFeedbacks((prev) => {
        const updated = new Set(prev);
        updated.delete(feedbackId);
        return updated;
      });
    } catch (error) {
      alert('Failed to delete feedback.');
      console.error('Delete error:', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? 'gold' : '#ccc' }}>★</span>
    ));
  };

  const formatDate = (str) => {
    try {
      return new Date(str).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  // Filter out hidden feedbacks for display
  const visibleFeedbacks = feedbacks.filter(f => !hiddenFeedbacks.has(f.id));

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2 style={{ textAlign: 'center', padding: '50px' }}>Loading feedback data...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Total: {feedbacks.length} | Visible: {feedbacks.length - hiddenFeedbacks.size} | Hidden: {hiddenFeedbacks.size}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        // Show all feedbacks, but style hidden ones differently
        feedbacks.map((f) => (
          <div 
            key={f.id} 
            className="feedback-card" 
            style={{ 
              marginBottom: '20px', 
              border: '1px solid #ccc', 
              padding: '10px',
              opacity: hiddenFeedbacks.has(f.id) ? 0.5 : 1,
              backgroundColor: hiddenFeedbacks.has(f.id) ? '#f8f9fa' : 'white'
            }}
          >
            <h3>{f.name || 'Anonymous'}</h3>
            <p>{f.email || 'No email provided'}</p>
            <p><strong>Product:</strong> {f.product_name || 'No product specified'}</p>
            <p>{formatDate(f.created_at)}</p>
            <p>{f.comment || 'No comment provided'}</p>
            <div>{renderStars(f.rating || 0)} <strong>{f.rating || 0}/5</strong></div>
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => handleHide(f.id)} 
                style={{ 
                  marginRight: '10px',
                  backgroundColor: hiddenFeedbacks.has(f.id) ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {hiddenFeedbacks.has(f.id) ? 'Show' : 'Hide'}
              </button>
              <button 
                onClick={() => handleDelete(f.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;