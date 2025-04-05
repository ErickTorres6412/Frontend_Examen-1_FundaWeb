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
    confirmDelete: options.confirmDelete ?? true,
    idField: options.idField || 'id' // Campo que funciona como ID (por defecto 'id')
  }), [options]);

  // Función para cargar datos estabilizada con useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedData = await service.getAll();
      setData(fetchedData);
      setError(null);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const create = async (newItem) => {
    try {
      console.log('Creating item:', newItem);
      const createdItem = await service.create(newItem);
      
      // Verificar si createdItem tiene los datos esperados
      if (!createdItem) {
        console.error('El servicio no devolvió datos después de crear');
        // Si el servicio no devuelve el item creado, recargamos todos los datos
        await fetchData();
        showSuccessAlert(config.successMessages.create);
        return newItem;
      }
      
      // Actualizamos los datos con el nuevo elemento creado
      setData(prevData => [...prevData, createdItem]);
      
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
      
      // Determinar el ID basado en el tipo de entidad
      const idField = determineIdField(updatedItem);
      const itemId = updatedItem[idField];
      
      if (!itemId) {
        throw new Error(`No se pudo determinar el ID del elemento a actualizar: ${JSON.stringify(updatedItem)}`);
      }
      
      const updatedData = await service.update(updatedItem);
      
      // Verificar si updatedData tiene los datos esperados
      if (!updatedData) {
        console.log('El servicio no devolvió datos después de actualizar, recargando datos completos');
        // Si el servicio no devuelve el item actualizado, recargamos todos los datos
        await fetchData();
        showSuccessAlert(config.successMessages.update);
        return updatedItem;
      }
      
      // Actualizamos el dato específico que ha cambiado
      setData(prevData => {
        return prevData.map(item => {
          const currentItemId = item[idField] || item.id;
          if (currentItemId === itemId) {
            console.log('Actualizando item en data:', updatedData);
            return updatedData;
          }
          return item;
        });
      });
      
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
      
      // Eliminamos el elemento del estado
      setData(prevData => {
        const filtered = prevData.filter(item => {
          const itemId = item.id || item.cultureId || item.empleadoId || item[config.idField];
          return itemId !== id;
        });
        console.log('Data después de eliminar:', filtered);
        return filtered;
      });
      
      showSuccessAlert(config.successMessages.delete);
      return id;
    } catch (err) {
      const errorMessage = err.response?.data?.message || config.errorMessages.delete;
      showErrorAlert(errorMessage);
      console.error(err);
      throw err;
    }
  };

  // Función auxiliar para determinar el campo ID basado en el tipo de entidad
  const determineIdField = (item) => {
    // Verificar los campos comunes de ID en diferentes entidades
    if (item.cultureId !== undefined) return 'cultureId';
    if (item.empleadoId !== undefined) return 'empleadoId';
    if (item.id !== undefined) return 'id';
    
    // Usar el campo personalizado de opciones como respaldo
    return config.idField;
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