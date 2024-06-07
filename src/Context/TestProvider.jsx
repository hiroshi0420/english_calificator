import React, { createContext, useState } from 'react';

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [completedTests, setCompletedTests] = useState({
    writing: false,
    reading: false,
    speaking: false,
    listening: false,
  });

  return (
    <TestContext.Provider value={{ completedTests, setCompletedTests }}>
      {children}
    </TestContext.Provider>
  );
};
