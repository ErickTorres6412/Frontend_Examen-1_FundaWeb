// src/utils/alertUtils.js
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Custom styles for more professional look
const customStyles = {
    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300',
    cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300',
    popup: 'rounded-xl shadow-2xl border-2 border-gray-100',
    title: 'text-2xl font-bold text-gray-800',
    content: 'text-gray-600'
};

export const showSuccessAlert = (message, options = {}) => {
    return Swal.fire({
        title: '¡Éxito!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        customClass: {
            popup: customStyles.popup,
            title: customStyles.title,
            content: customStyles.content,
            confirmButton: customStyles.confirmButton
        },
        background: '#f0f9ff',
        iconColor: '#10b981',
        ...options
    });
};

export const showErrorAlert = (message, options = {}) => {
    return Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
        customClass: {
            popup: customStyles.popup,
            title: customStyles.title,
            content: customStyles.content,
            confirmButton: customStyles.confirmButton
        },
        background: '#fff0f0',
        iconColor: '#ef4444',
        ...options
    });
};

export const showWarningAlert = (message, options = {}) => {
    return Swal.fire({
        title: '¡Atención!',
        text: message,
        icon: 'warning',
        confirmButtonColor: '#f8bb86',
        confirmButtonText: 'OK',
        customClass: {
            popup: customStyles.popup,
            title: customStyles.title,
            content: customStyles.content,
            confirmButton: customStyles.confirmButton
        },
        background: '#fffbeb',
        iconColor: '#f59e0b',
        ...options
    });
};

export const showConfirmationAlert = (title, text, options = {}) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: {
            popup: customStyles.popup,
            title: customStyles.title,
            content: customStyles.content,
            confirmButton: customStyles.confirmButton,
            cancelButton: customStyles.cancelButton
        },
        background: '#f5f5f5',
        iconColor: '#6366f1',
        ...options
    });
};

export const showUnsavedChangesAlert = async () => {
    return Swal.fire({
        title: '¿Desea guardar los cambios?',
        text: 'Hay cambios sin guardar. ¿Desea guardarlos antes de salir del modo de edición?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'No guardar',
        reverseButtons: true,
        customClass: {
            popup: customStyles.popup,
            title: customStyles.title,
            content: customStyles.content,
            confirmButton: customStyles.confirmButton,
            cancelButton: customStyles.cancelButton
        },
        background: '#f5f5f5',
        iconColor: '#6366f1'
    });
};
