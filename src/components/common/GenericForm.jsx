import React, { useState, useEffect } from 'react';

const GenericForm = ({ 
  initialData = {}, 
  fields, 
  onSubmit, 
  onCancel,
  title = "Formulario" 
}) => {
  const [formData, setFormData] = useState(initialData);

  // Reiniciar formData si cambia initialData
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-emerald-700">{title}</h2>
          <div className="h-1 w-16 bg-emerald-500 mt-1 rounded-full"></div>
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100"
      >
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 px-6">
          <h3 className="text-white font-medium">{title ? `Nuevo ${title}` : 'Nuevo Registro'}</h3>
        </div>
        
        {/* Form Fields */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div 
                key={field.name} 
                className={`${field.fullWidth ? 'md:col-span-2' : ''}`}
              >
                <label 
                  className="block text-gray-700 text-sm font-semibold mb-2" 
                  htmlFor={field.name}
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required={field.required}
                    disabled={field.disabled}
                  >
                    <option value="">Seleccionar {field.label}</option>
                    {field.options.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder={field.placeholder || ''}
                    required={field.required}
                    disabled={field.disabled}
                    rows={field.rows || 4}
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center">
                    <input
                      id={field.name}
                      type="checkbox"
                      name={field.name}
                      checked={formData[field.name] || false}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      required={field.required}
                      disabled={field.disabled}
                    />
                    <label htmlFor={field.name} className="ml-2 text-sm text-gray-600">
                      {field.checkboxLabel || field.label}
                    </label>
                  </div>
                ) : field.type === 'radio' ? (
                  <div className="space-y-2">
                    {field.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${field.name}-${option.value}`}
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={formData[field.name] === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                          required={field.required}
                          disabled={field.disabled}
                        />
                        <label htmlFor={`${field.name}-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    id={field.name}
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder={field.placeholder || ''}
                    required={field.required}
                    disabled={field.disabled}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                  />
                )}
                
                {field.helpText && (
                  <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer with buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            {initialData.id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenericForm;