import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage con persistencia
 * @param {string} key - Clave del localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {Array} [value, setValue] - Estado y función para actualizarlo
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  // Pasa una función a useState para que el valor inicial se lea solo una vez desde localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtener del localStorage por clave
      const item = window.localStorage.getItem(key);
      // Parsear JSON almacenado o devolver initialValue si no existe
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error al parsear JSON, devolver initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Guardar estado
      setStoredValue(valueToStore);
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Manejo de errores más robustos podrían ir aquí
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;