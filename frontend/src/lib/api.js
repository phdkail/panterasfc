const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchWithErrorHandling = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.warn(`No se encontraron datos en ${endpoint}`);
      return [];
    }
    return data;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

export const fetchMultipleEndpoints = async (endpoints) => {
  try {
    const results = await Promise.allSettled(
      endpoints.map(endpoint => fetchWithErrorHandling(endpoint))
    );

    const data = {};
    const errors = [];

    results.forEach((result, index) => {
      const endpoint = endpoints[index];
      if (result.status === 'fulfilled') {
        data[endpoint] = result.value;
      } else {
        errors.push({ endpoint, error: result.reason });
        data[endpoint] = [];
      }
    });

    if (errors.length > 0) {
      console.warn('Algunas llamadas a la API fallaron:', errors);
    }

    return { data, errors };
  } catch (error) {
    console.error('Error en fetchMultipleEndpoints:', error);
    throw error;
  }
}; 