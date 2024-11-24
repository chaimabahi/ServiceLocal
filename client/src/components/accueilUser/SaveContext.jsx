import React, { createContext, useContext, useState, useEffect } from "react";

const SaveContext = createContext();

export const useSave = () => {
  return useContext(SaveContext);
};

export const SaveProvider = ({ children }) => {
  const [savedBusinesses, setSavedBusinesses] = useState(() => {
    // Initialize from localStorage or default to an empty array
    const storedBusinesses = localStorage.getItem("savedBusinesses");
    return storedBusinesses ? JSON.parse(storedBusinesses) : [];
  });

  useEffect(() => {
    // Save the updated list to localStorage whenever it changes
    localStorage.setItem("savedBusinesses", JSON.stringify(savedBusinesses));
  }, [savedBusinesses]);

  const saveBusiness = (business) => {
    // Avoid duplicate saves by checking if the business already exists
    setSavedBusinesses((prev) => {
      if (prev.some((b) => b.id === business.id)) return prev; // No duplicates
      return [...prev, business];
    });
  };

  return (
    <SaveContext.Provider value={{ savedBusinesses, saveBusiness }}>
      {children}
    </SaveContext.Provider>
  );
};
