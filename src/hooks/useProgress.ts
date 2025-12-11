import { useState, useEffect, useCallback } from 'react';

interface ProgressData {
  solvedProblems: string[];
  codeSnapshots: Record<string, string>;
  submissions: Submission[];
}

interface Submission {
  problemId: string;
  code: string;
  timestamp: number;
  passed: boolean;
  testResults: {
    passed: number;
    total: number;
  };
}

const STORAGE_KEY = 'codemaster_progress';

const getInitialData = (): ProgressData => {
  if (typeof window === 'undefined') {
    return { solvedProblems: [], codeSnapshots: {}, submissions: [] };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  
  return { solvedProblems: [], codeSnapshots: {}, submissions: [] };
};

export function useProgress() {
  const [data, setData] = useState<ProgressData>(getInitialData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [data]);

  const markSolved = useCallback((problemId: string) => {
    setData(prev => ({
      ...prev,
      solvedProblems: prev.solvedProblems.includes(problemId)
        ? prev.solvedProblems
        : [...prev.solvedProblems, problemId],
    }));
  }, []);

  const saveCode = useCallback((problemId: string, code: string) => {
    setData(prev => ({
      ...prev,
      codeSnapshots: {
        ...prev.codeSnapshots,
        [problemId]: code,
      },
    }));
  }, []);

  const getCode = useCallback((problemId: string): string | undefined => {
    return data.codeSnapshots[problemId];
  }, [data.codeSnapshots]);

  const addSubmission = useCallback((submission: Omit<Submission, 'timestamp'>) => {
    setData(prev => ({
      ...prev,
      submissions: [
        { ...submission, timestamp: Date.now() },
        ...prev.submissions,
      ].slice(0, 100), // Keep last 100 submissions
    }));
  }, []);

  const isSolved = useCallback((problemId: string): boolean => {
    return data.solvedProblems.includes(problemId);
  }, [data.solvedProblems]);

  const getSolvedCount = useCallback((): number => {
    return data.solvedProblems.length;
  }, [data.solvedProblems]);

  const getRecentSubmissions = useCallback((limit = 10): Submission[] => {
    return data.submissions.slice(0, limit);
  }, [data.submissions]);

  const resetProgress = useCallback(() => {
    setData({ solvedProblems: [], codeSnapshots: {}, submissions: [] });
  }, []);

  return {
    solvedProblems: data.solvedProblems,
    submissions: data.submissions,
    markSolved,
    saveCode,
    getCode,
    addSubmission,
    isSolved,
    getSolvedCount,
    getRecentSubmissions,
    resetProgress,
  };
}
