import React, { useState } from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { useCRUD } from '../../hooks/useCRUD';
import { empleadoService } from '../../services/apiService';
import { Plus } from 'lucide-react';
import GenericForm from '../../components/common/GenericForm';

const Empleados = () => {
    // Definir las columnas de la tabla
    const columns = ['ID', 'Nombre', 'Salario'];

    // Usar el hook CRUD con el servicio de empleados
    const {
        data: empleados,
        loading,
        create,
        update,
        remove
    } = useCRUD(empleadoService);

    // Estados para el formulario
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEmpleado, setCurrentEmpleado] = useState(null);
    // Nuevo estado para el formulario de creación
    const [newEmpleadoData, setNewEmpleadoData] = useState({
        nombre: '',
        salario: ''
    });

    // Definir campos del formulario
    const formFields = [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'salario', label: 'Salario', type: 'number', required: true }
    ];

    // Preparar datos para la tabla
    const tableData = empleados.map(empleado => ({
        id: empleado.empleadoId,
        nombre: empleado.nombre,
        salario: empleado.salario
    }));

    // Manejadores de acciones
    const handleEdit = (empleado) => {
        setCurrentEmpleado(empleado);
        setShowEditForm(true);
        setShowCreateForm(false);
    };

    const handleDelete = async (empleado) => {
        await remove(empleado.id);
    };

    const handleCreate = () => {
        // Reiniciar los datos del nuevo empleado
        setNewEmpleadoData({
            nombre: '',
            salario: ''
        });
        setShowCreateForm(true);
        setShowEditForm(false);
    };

    const handleSubmitCreate = async (formData) => {
        await create({
            nombre: formData.nombre,
            salario: Number(formData.salario)
        });
        setShowCreateForm(false);
    };

    const handleSubmitEdit = async (formData) => {
        const empleadoData = {
            empleadoId: currentEmpleado.empleadoId || currentEmpleado.id,
            nombre: formData.nombre,
            salario: parseFloat(formData.salario)
        };
    
        console.log('Datos a enviar:', empleadoData);
        await update(empleadoData);
        setShowEditForm(false); // Cerrar el formulario después de editar
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setShowEditForm(false);
    };

    // Renderizado condicional de carga
    if (loading) {
        return <div>Cargando empleados...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-emerald-700">Gestión de Empleados</h1>
                {!showCreateForm && !showEditForm && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        <Plus size={18} className="mr-2" />
                        Nuevo Empleado
                    </button>
                )}
            </div>

            {showCreateForm && (
                <div className="mb-8">
                    <GenericForm
                        initialData={newEmpleadoData}
                        fields={formFields}
                        onSubmit={handleSubmitCreate}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {showEditForm && currentEmpleado && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Editar Empleado</h2>
                    <GenericForm
                        initialData={{
                            nombre: currentEmpleado.nombre,
                            salario: currentEmpleado.salario
                        }}
                        fields={formFields}
                        onSubmit={handleSubmitEdit}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {!showCreateForm && !showEditForm && (
                <DynamicTable
                    columns={columns}
                    data={tableData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Empleados;