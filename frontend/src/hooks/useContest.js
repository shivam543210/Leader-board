import { useState, useEffect, useCallback } from 'react';
import ContestService from '../services/contest.service';

const useContest = (contestId = null) => {
  const [contests, setContests] = useState([]);
  const [currentContest, setCurrentContest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContests = useCallback(async (filter = 'all') => {
    setLoading(true);
    try {
      const data = await ContestService.getAll(filter);
      setContests(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch contests');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchContestDetails = useCallback(async (id) => {
      setLoading(true);
      try {
          const data = await ContestService.getById(id);
          setCurrentContest(data);
          setError(null);
      } catch (err) {
          setError(err.message || 'Failed to fetch contest details');
      } finally {
          setLoading(false);
      }
  }, []);

  // Auto-fetch if contestId provided
  useEffect(() => {
    if (contestId) {
        fetchContestDetails(contestId);
    }
  }, [contestId, fetchContestDetails]);

  return {
    contests,
    currentContest,
    loading,
    error,
    fetchContests,
    fetchContestDetails
  };
};

export default useContest;
