// client/src/utils/api.js
const API_URL = process.env.REACT_APP_API_URL;

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  checkIn: async (pin) => {
    const response = await fetch(`${API_URL}/attendance/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });
    return handleResponse(response);
  },

  getEmployees: async () => {
    const response = await fetch(`${API_URL}/employees`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  }
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

// client/src/utils/helpers.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};

export const calculateDuration = (timeIn, timeOut) => {
  const start = new Date(timeIn);
  const end = new Date(timeOut);
  const diff = end - start;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
};
