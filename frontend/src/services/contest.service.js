import apiClient from './apiClient';

const ContestService = {
  getAll: async (filter = 'all') => {
    // return apiClient.get(`/contests?status=${filter}`);
    return Promise.resolve([
        { id: 1, title: 'Weekly Contest 401', status: 'upcoming', start_time: '2026-02-01T10:00:00Z', duration: 5400 },
        { id: 2, title: 'Bi-Weekly Contest 120', status: 'ongoing', start_time: '2026-01-28T14:00:00Z', duration: 5400 },
        { id: 3, title: 'Beginner Friendly Round #5', status: 'ended', start_time: '2026-01-25T09:00:00Z', duration: 7200 }
    ].filter(c => filter === 'all' || c.status === filter));
  },

  getById: async (id) => {
    // return apiClient.get(`/contests/${id}`);
    return Promise.resolve({
        id,
        title: 'Weekly Contest 401',
        description: 'Solve 4 algorithmic problems in 90 minutes.',
        problems: [
            { id: 101, title: 'Two Sum', difficulty: 'Easy', points: 2 },
            { id: 102, title: 'Add Two Numbers', difficulty: 'Medium', points: 4 },
        ]
    });
  },

  create: async (data) => {
    // return apiClient.post('/contests', data);
    console.log('Creating contest:', data);
    return Promise.resolve({ id: Math.floor(Math.random() * 1000), ...data });
  }
};

export default ContestService;
