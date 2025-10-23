'use client';
import { useState, useEffect } from 'react';

// Definimos el tipo de datos para un proyecto
export interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
}

interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (data: Project) => void;
  onClose: () => void;
}

export default function ProjectForm({ initialData, onSubmit, onClose }: ProjectFormProps) {
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    liveUrl: '',
    codeUrl: '',
  });

  // Si hay datos iniciales (para editar), llenamos el formulario con ellos
  useEffect(() => {
    if (initialData) {
      setProject(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convertimos el string separado por comas en un array de strings
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setProject(prev => ({ ...prev, tags: tagsArray }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">{initialData ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Inputs para cada campo del proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={project.title} onChange={handleChange} placeholder="Título" className="bg-slate-700 p-2 rounded text-white" required />
            <input name="imageUrl" value={project.imageUrl} onChange={handleChange} placeholder="URL de la Imagen" className="bg-slate-700 p-2 rounded text-white" required />
            <input name="liveUrl" value={project.liveUrl} onChange={handleChange} placeholder="URL Demo en Vivo" className="bg-slate-700 p-2 rounded text-white" />
            <input name="codeUrl" value={project.codeUrl} onChange={handleChange} placeholder="URL Código Fuente" className="bg-slate-700 p-2 rounded text-white" />
          </div>
          <textarea name="description" value={project.description} onChange={handleChange} placeholder="Descripción" className="w-full bg-slate-700 p-2 rounded mt-4 text-white" rows={3} required></textarea>
          <input name="tags" value={project.tags.join(', ')} onChange={handleTagsChange} placeholder="Tags (separados por comas)" className="w-full bg-slate-700 p-2 rounded mt-4 text-white" />

          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">{initialData ? 'Guardar Cambios' : 'Crear Proyecto'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}