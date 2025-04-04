"use client"

import { useState } from "react"
import { ChevronRight, LayoutDashboard } from "lucide-react"
import modules from "../../config/modules"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const [expandedModule, setExpandedModule] = useState(null)
  const [isCompact, setIsCompact] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-full transition-all duration-300 ease-in-out bg-white shadow-xl border-r border-gray-100
        ${isCompact ? "w-20" : "w-72"}`}
    >
      {/* Franja decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>

      <div className="h-full overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
        {/* Logo o título */}
        <div className={`flex items-center ${isCompact ? "justify-center py-6" : "px-6 py-6"}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            {!isCompact ? <span className="font-bold text-lg">A</span> : <span className="font-bold text-lg">A</span>}
          </div>
          {!isCompact && <span className="ml-3 font-bold text-gray-800 text-lg">Examen Funda Web</span>}
        </div>

        {/* Botón de Dashboard */}
        <Link
          to="/dashboard"
          className={`w-full flex items-center ${isCompact ? "justify-center" : "gap-3 px-5"} py-3.5 my-1 transition-all duration-200 
            ${
              location.pathname === "/dashboard"
                ? "bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-500 text-emerald-700"
                : "border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-emerald-600"
            }`}
        >
          <div
            className={`flex items-center justify-center ${location.pathname === "/dashboard" ? "text-emerald-600" : "text-gray-500"}`}
          >
            <LayoutDashboard size={20} strokeWidth={1.75} />
          </div>
          {!isCompact && <span className="text-sm font-medium">Panel Principal</span>}
        </Link>

        {/* Separador */}
        {!isCompact && (
          <div className="px-6 py-4 mt-2">
            <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Gestión</h2>
            <div className="h-px bg-gradient-to-r from-emerald-200 to-transparent mt-2"></div>
          </div>
        )}

        {/* Separador compacto */}
        {isCompact && (
          <div className="px-4 py-3">
            <div className="h-px bg-gray-100"></div>
          </div>
        )}

        {/* Módulos */}
        <div className="px-2">
          {modules.map((module, index) => (
            <div key={index} className="mb-1">
              <button
                onClick={() => {
                  if (!isCompact) {
                    setExpandedModule(expandedModule === index ? null : index)
                  }
                }}
                className={`w-full flex items-center rounded-lg ${isCompact ? "justify-center py-3.5" : "justify-between px-4 py-3"} transition-all duration-200 
                  ${
                    expandedModule === index
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-50 text-gray-700 hover:text-emerald-600"
                  } 
                  ${isCompact ? "" : "border-l-4"} 
                  ${expandedModule === index && !isCompact ? "border-emerald-500" : "border-transparent"}`}
              >
                <div className={`flex items-center ${isCompact ? "" : "gap-3"}`}>
                  <div
                    className={`flex items-center justify-center ${expandedModule === index ? "text-emerald-600" : "text-gray-500"}`}
                  >
                    <module.icon size={20} strokeWidth={1.75} />
                  </div>
                  {!isCompact && <span className="text-sm font-medium">{module.title}</span>}
                </div>
                {!isCompact && (
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className={`transform transition-transform duration-200 
                      ${expandedModule === index ? "rotate-90 text-emerald-600" : "text-gray-400"}`}
                  />
                )}
              </button>

              {/* Subitems */}
              {!isCompact && (
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden
                    ${expandedModule === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {module.subItems.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className={`block pl-12 pr-4 py-2.5 my-0.5 text-sm transition-colors rounded-r-lg
                        ${
                          location.pathname === item.link
                            ? "bg-gradient-to-r from-emerald-50 to-transparent text-emerald-700 border-r-4 border-emerald-500 font-medium"
                            : "text-gray-500 hover:bg-gray-50 hover:text-emerald-600"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón para contraer/expandir sidebar */}
        <div className="px-2 mt-6">
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="w-full flex items-center justify-center py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight
              size={18}
              strokeWidth={2}
              className={`transform transition-transform duration-300 text-gray-500 ${isCompact ? "rotate-180" : ""}`}
            />
            {!isCompact && (
              <span className="ml-2 text-xs font-medium text-gray-500">{isCompact ? "Expandir" : "Contraer"}</span>
            )}
          </button>
        </div>
      </div>

      {/* Efecto de sombra para indicar scroll */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-teal-100 to-transparent"></div>
    </aside>
  )
}

export default Sidebar