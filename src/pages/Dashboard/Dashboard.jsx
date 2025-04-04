import { useState, useEffect } from 'react';
import { BookOpen, Clock, MapPin, User, Calendar, Users, Info } from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header with time */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-medium">{formattedTime}</span>
          </div>
        </div>
        
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Blue Banner */}
          <div className="bg-emerald-600 h-24 relative">
            <div className="absolute -bottom-12 left-8 bg-white p-3 rounded-full shadow-lg border-4 border-blue-600">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          
          {/* Content */}
          <div className="pt-16 pb-8 px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Examen Fundamentos de Programación Web</h2>
            <div className="flex items-center text-gray-500 mb-6">
              <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                Curso: 4280
              </span>
              <div className="w-1 h-1 bg-gray-300 rounded-full mx-3"></div>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>3 Créditos</span>
              </span>
            </div>
            
            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 rounded-full p-2 shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">Información del Estudiante</h3>
              </div>
              <div className="ml-10">
                <p className="text-gray-500 text-sm mb-1">Nombre Completo</p>
                <p className="text-xl font-bold text-gray-800">Erick Torres Hernandez</p>
              </div>
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-600 rounded-full p-2 shadow-md">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">Detalles del Curso</h3>
                </div>
                <div className="space-y-4 ml-10">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Periodo</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        CICLO I 2025
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Campus</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-indigo-600 mr-2" />
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        Sede Interuniversit. Alajuela
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 rounded-full p-2 shadow-md">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">Información Adicional</h3>
                </div>
                <div className="space-y-4 ml-10">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Método Educativo</p>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-green-600 mr-2" />
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Presencial
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Instructor</p>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-600 mr-2" />
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        Juan Ramos Peñaranda
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Proyecto de Programación Web • {currentTime.getFullYear()}
        </div>
      </div>
    </div>
  );
}