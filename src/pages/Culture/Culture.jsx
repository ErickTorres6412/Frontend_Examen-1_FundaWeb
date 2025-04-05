import React, { useState, useEffect } from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { useCRUD } from '../../hooks/useCRUD';
import { cultureService } from '../../services/apiService';
import { Plus } from 'lucide-react';
import GenericForm from '../../components/common/GenericForm';
import FilterComponent from '../../components/common/FilterComponent'; // Importamos el nuevo componente

const Culture = () => {
    // Definir las columnas de la tabla
    const columns = ['ID', 'Nombre', 'Fecha de Creacion', 'Fecha de Modificación'];

    // Usar el hook CRUD con el servicio de culture y especificar el campo ID
    const {
        data: cultures,
        loading,
        create,
        update,
        remove,
        fetchData
    } = useCRUD(cultureService, { idField: 'cultureId' });

    // Estados para el formulario
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCulture, setCurrentCulture] = useState(null);
    const [tableData, setTableData] = useState([]);
    
    // Estado para los datos filtrados
    const [filteredData, setFilteredData] = useState([]);
    
    // Obtener la fecha actual en formato YYYY-MM-DD para el input date
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Nuevo estado para el formulario de creación
    const [newCultureData, setNewCultureData] = useState({
        cultureId: '',
        name: '',
        modifiedDate: getCurrentDate()
    });

    // Definir campos del formulario para creación
    const createFormFields = [
        { name: 'cultureId', label: 'ID de Cultura', type: 'text', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'modifiedDate', label: 'Fecha de Modificación', type: 'date', required: true }
    ];

    // Definir campos del formulario para edición (sin cultureId)
    const editFormFields = [
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'modifiedDate', label: 'Fecha de Modificación', type: 'date', required: true }
    ];

    // Formatear fecha para mostrar en la tabla
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Fecha inválida';
            
            return date.toLocaleDateString();
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return 'Error en fecha';
        }
    };

    // Actualizar tableData cuando cultures cambie
    useEffect(() => {
        if (cultures && cultures.length > 0) {
            const formattedData = cultures.map(culture => {
                // Verificar que el objeto culture tenga todas las propiedades esperadas
                if (!culture) return null;
                
                return {
                    id: culture.cultureId,
                    nombre: culture.name,
                    modifiedDate: formatDate(culture.modifiedDate),
                    // Guardamos la fecha original para filtrar
                    rawDate: culture.modifiedDate
                };
            }).filter(item => item !== null); // Filtrar items nulos
            
            console.log('Datos formateados para tabla:', formattedData);
            setTableData(formattedData);
            setFilteredData(formattedData); // Inicialmente, los datos filtrados son todos los datos
        } else {
            setTableData([]);
            setFilteredData([]);
        }
    }, [cultures]);

    // Manejadores de acciones
    const handleEdit = (culture) => {
        // Formatear la fecha para el input date (YYYY-MM-DD)
        let formattedDate;
        try {
            const date = new Date(culture.modifiedDate);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split('T')[0];
            } else {
                formattedDate = getCurrentDate();
            }
        } catch (error) {
            console.error('Error al procesar la fecha:', error);
            formattedDate = getCurrentDate();
        }
        
        setCurrentCulture({
            ...culture,
            formattedDate
        });
        setShowEditForm(true);
        setShowCreateForm(false);
    };

    const handleDelete = async (culture) => {
        try {
            // Pasar el ID correcto al método remove
            await remove(culture.id);
            // No es necesario recargar datos aquí, el hook useCRUD ya actualiza el estado
        } catch (error) {
            console.error('Error al eliminar cultura:', error);
        }
    };

    const handleCreate = () => {
        // Reiniciar los datos de la nueva cultura
        setNewCultureData({
            cultureId: '',
            name: '',
            modifiedDate: getCurrentDate()
        });
        setShowCreateForm(true);
        setShowEditForm(false);
    };

    // Convertir fecha a formato ISO seguro
    const toISODateString = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                // Si la fecha es inválida, usar la fecha actual
                return new Date().toISOString();
            }
            return date.toISOString();
        } catch (error) {
            console.error('Error al convertir a ISO:', error);
            return new Date().toISOString();
        }
    };

    const handleSubmitCreate = async (formData) => {
        try {
            const newCultureData = {
                cultureId: formData.cultureId,
                name: formData.name,
                modifiedDate: toISODateString(formData.modifiedDate)
            };
            
            console.log('Enviando datos para crear:', newCultureData);
            await create(newCultureData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error al crear cultura:', error);
        }
    };

    const handleSubmitEdit = async (formData) => {
        try {
            const cultureData = {
                cultureId: currentCulture.id, // Mantener el ID actual para la actualización
                name: formData.name,
                modifiedDate: toISODateString(formData.modifiedDate)
            };
        
            console.log('Datos a enviar para actualizar:', cultureData);
            await update(cultureData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowEditForm(false); // Cerrar el formulario después de editar
        } catch (error) {
            console.error('Error al actualizar cultura:', error);
        }
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setShowEditForm(false);
    };

    // Manejar filtrado
    const handleFilter = (filters) => {
        const { searchText, startDate, endDate } = filters;
        
        let filtered = [...tableData];
        
        // Filtrar por texto (ID o nombre)
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(item => 
                (item.id && item.id.toLowerCase().includes(searchLower)) || 
                (item.nombre && item.nombre.toLowerCase().includes(searchLower))
            );
        }
        
        // Filtrar por fecha de inicio
        if (startDate) {
            const startDateTime = new Date(startDate).getTime();
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawDate).getTime();
                return itemDate >= startDateTime;
            });
        }
        
        // Filtrar por fecha de fin
        if (endDate) {
            const endDateTime = new Date(endDate).getTime() + (24 * 60 * 60 * 1000 - 1); // Fin del día
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawDate).getTime();
                return itemDate <= endDateTime;
            });
        }
        
        setFilteredData(filtered);
    };

    // Renderizado condicional de carga
    if (loading) {
        return <div>Cargando culturas...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-emerald-700">Gestión de Culturas</h1>
                {!showCreateForm && !showEditForm && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        <Plus size={18} className="mr-2" />
                        Nueva Cultura
                    </button>
                )}
            </div>

            {showCreateForm && (
                <div className="mb-8">
                    <GenericForm
                        initialData={newCultureData}
                        fields={createFormFields}
                        onSubmit={handleSubmitCreate}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {showEditForm && currentCulture && (
                <div className="mb-8">
                    <GenericForm
                        initialData={{
                            name: currentCulture.nombre,
                            modifiedDate: currentCulture.formattedDate || getCurrentDate()
                        }}
                        fields={editFormFields}
                        onSubmit={handleSubmitEdit}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {!showCreateForm && !showEditForm && (
                <>
                    {/* Componente de filtros */}
                    <FilterComponent onFilter={handleFilter} />
                    
                    <DynamicTable
                        columns={columns}
                        data={filteredData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
};

export default Culture;