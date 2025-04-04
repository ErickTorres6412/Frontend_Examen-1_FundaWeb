import { useState, useEffect, useCallback, useMemo } from 'react';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../utils/alertUtils';

export const useCRUD = (service, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usa useMemo para estabilizar las configuraciones
  const config = useMemo(() => ({
    successMessages: {
      fetch: 'Datos cargados exitosamente',
      create: 'Elemento creado con éxito',
      update: 'Elemento actualizado correctamente',
      delete: 'Elemento eliminado con éxito',
      ...options.successMessages
    },
    errorMessages: {
      fetch: 'Error al cargar los datos',
      create: 'Error al crear el elemento',
      update: 'Error al actualizar el elemento',
      delete: 'Error al eliminar el elemento',
      ...options.errorMessages
    },
    confirmDelete: options.confirmDelete ?? true
  }), [options]);

  // Función para cargar datos estabilizada con useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedData = await service.getAll();
      setData(fetchedData);
      setError(null);
      showSuccessAlert(config.successMessages.fetch, { toast: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || config.errorMessages.fetch;
      setError(errorMessage);
      showErrorAlert(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service, config]);

  // Cargar datos solo una vez al montar el componente
  useEffect(() => {
    fetchData();
  }, []); // Dependencia vacía para ejecutar solo una vez

  // Resto del código anterior (create, update, remove) se mantiene igual

  const create = async (newItem) => {
    try {
      const createdItem = await service.create(newItem);
      const newData = [...data, createdItem];
      setData(newData);
      showSuccessAlert(config.successMessages.create);
      return createdItem;
    } catch (err) {
      const errorMessage = err.response?.data?.message || config.errorMessages.create;
      showErrorAlert(errorMessage);
      console.error(err);
      throw err;
    }
  };

  const update = async (updatedItem) => {
    try {
      console.log('Updating item:', updatedItem);
      const updatedData = await service.update(updatedItem);
      // Asumiendo que updatedItem ya contiene el ID como empleadoId
      const newData = data.map(item => 
        item.id === updatedItem.empleadoId ? updatedData : item
      );
      setData(newData);
      showSuccessAlert(config.successMessages.update);
      return updatedData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || config.errorMessages.update;
      showErrorAlert(errorMessage);
      console.error(err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      if (config.confirmDelete) {
        const result = await showConfirmationAlert(
          '¿Está seguro?', 
          'Esta acción no se puede deshacer'
        );
        
        if (!result.isConfirmed) {
          return null;
        }
      }

      await service.delete(id);
      const filteredData = data.filter(item => item.id !== id);
      setData(filteredData);
      showSuccessAlert(config.successMessages.delete);
      return filteredData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || config.errorMessages.delete;
      showErrorAlert(errorMessage);
      console.error(err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    create,
    update,
    remove
  };
};