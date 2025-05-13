
// Utility functions for data synchronization across different entities

import { Prisoner, Cell, Staff } from "@/types";

const PRISONERS_STORAGE_KEY = 'prison_management_prisoners';
const CELLS_STORAGE_KEY = 'prison_management_cells';
const STAFF_STORAGE_KEY = 'prison_management_staff';

// Get data from localStorage
export const getDataFromStorage = <T>(key: string, defaultData: T[]): T[] => {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    return JSON.parse(savedData);
  }
  // If no saved data, use default data and save it to localStorage
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

// Save data to localStorage
export const saveDataToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Update cell occupancy based on prisoners data
export const updateCellOccupancy = (): void => {
  const prisoners = getDataFromStorage<Prisoner>(PRISONERS_STORAGE_KEY, []);
  const cells = getDataFromStorage<Cell>(CELLS_STORAGE_KEY, []);
  
  // Reset all occupancy to 0
  const updatedCells = cells.map(cell => ({
    ...cell,
    occupancy: 0
  }));
  
  // Count prisoners in each cell
  prisoners.forEach(prisoner => {
    if (prisoner.cell_id && prisoner.status === 'incarcerated') {
      const cellIndex = updatedCells.findIndex(cell => cell.id === prisoner.cell_id);
      if (cellIndex !== -1) {
        updatedCells[cellIndex].occupancy += 1;
      }
    }
  });
  
  // Save updated cells
  saveDataToStorage(CELLS_STORAGE_KEY, updatedCells);
};

