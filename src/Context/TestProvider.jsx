import React, { createContext, useState, useEffect } from 'react';

export const TestContext = createContext();

export const TestProvider = ({ children, location }) => {

  const [enabledTests, setEnabledTest] = useState(false);
  const [completedTests, setCompletedTests] = useState({
    writing: false,
    reading: false,
    speaking: false,
    listening: false,
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes, are you sure you want to leave?';
    };

    const testRoutes = [
      '/writingTest',
      '/readingTest',
      '/speakingTest',
      '/listeningTest',
    ];

    if (testRoutes.includes(location.pathname)) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  return (
    <TestContext.Provider value={{ completedTests, setCompletedTests, enabledTests, setEnabledTest}}>
      {children}
    </TestContext.Provider>
  );
};
