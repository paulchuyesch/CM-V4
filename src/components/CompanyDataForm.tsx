import React, { useState } from 'react';
import { CompanyData } from './SSTDiagnosis';
import { ChevronRight } from 'lucide-react';

interface CompanyDataFormProps {
  onSubmit: (data: CompanyData) => void;
}

const PUBLIC_EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'live.com',
  'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com'
];

export const CompanyDataForm: React.FC<CompanyDataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CompanyData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    numeroTrabajadores: 0,
    tipoEmpresa: '',
  });

  const [errors, setErrors] = useState<{[K in keyof CompanyData]?: string}>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1]?.toLowerCase();
    return !PUBLIC_EMAIL_DOMAINS.includes(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[K in keyof CompanyData]?: string} = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo corporativo válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'El nombre de la empresa es requerido';
    }

    if (formData.numeroTrabajadores <= 0) {
      newErrors.numeroTrabajadores = 'Debe ingresar un número válido de trabajadores';
    }

    if (!formData.tipoEmpresa) {
      newErrors.tipoEmpresa = 'Debe seleccionar el tipo de empresa';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CompanyData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative">
       {/* Logo */}
        <div className="absolute top-8 left-8">
          <img 
            src="https://www.supportbrigades.com/wp-content/uploads/2025/09/xxpfbFuUGcA4.png" 
            alt="Support Brigades" 
            className="h-20"
          />
        </div>

        <div className="max-w-2xl mx-auto pt-24">
        {/* Main Card */}
        <div className="sb-card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Diagnóstico de <br />Cumplimiento de SST
            </h1>
            <p className="text-muted-foreground text-lg italic">
              Completa tus datos para iniciar la evaluación <br />El informe detallado será enviado a tu correo
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-primary">Paso 1 de 3</span>
              <span>•</span>
              <span>Datos de la Empresa</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                Tu nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Ingresa tu nombre completo"
              />
              {errors.nombre && (
                <p className="text-destructive text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Correo corporativo *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="nombre@empresa.com"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
                Número de contacto *
              </label>
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="+51 999 999 999"
              />
              {errors.telefono && (
                <p className="text-destructive text-sm mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Empresa */}
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-foreground mb-2">
                Nombre de la empresa *
              </label>
              <input
                type="text"
                id="empresa"
                value={formData.empresa}
                onChange={(e) => handleInputChange('empresa', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Nombre de tu empresa"
              />
              {errors.empresa && (
                <p className="text-destructive text-sm mt-1">{errors.empresa}</p>
              )}
            </div>

            {/* Número de trabajadores */}
            <div>
              <label htmlFor="trabajadores" className="block text-sm font-medium text-foreground mb-2">
                Número de trabajadores *
              </label>
              <input
                type="number"
                id="trabajadores"
                min="1"
                value={formData.numeroTrabajadores || ''}
                onChange={(e) => handleInputChange('numeroTrabajadores', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Ej: 25"
              />
              {errors.numeroTrabajadores && (
                <p className="text-destructive text-sm mt-1">{errors.numeroTrabajadores}</p>
              )}
            </div>

            {/* Tipo de empresa */}
            <div>
              <label htmlFor="tipoEmpresa" className="block text-sm font-medium text-foreground mb-2">
                Tipo de empresa *
              </label>
              <select
                id="tipoEmpresa"
                value={formData.tipoEmpresa}
                onChange={(e) => handleInputChange('tipoEmpresa', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Selecciona una opción</option>
                <option value="micro">Micro Empresa</option>
                <option value="pequena">Pequeña Empresa</option>
                <option value="no_mype">No MYPE</option>
              </select>
              {errors.tipoEmpresa && (
                <p className="text-destructive text-sm mt-1">{errors.tipoEmpresa}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sb-button-primary text-lg py-4"
            >
              Comenzar Diagnóstico
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};