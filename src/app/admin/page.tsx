'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ProjectForm, { Project } from '@/app/components/projects/ProjectForm';

export default function AdminPage() {
  const supabase                = createClient();
  const router                  = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);

  // Estados para manejar el modal
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Función para obtener los proyectos de la base de datos
  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    if (data) {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }

  // Obtenemos los proyectos al cargar la página
  useEffect(() => {
    fetchProjects();
  }, []);

  // Función para manejar el envío del formulario (crear o actualizar)
  const handleFormSubmit = async (projectData: Project) => {
    if (editingProject) {
      // Actualizar proyecto existente
      const { error } = await supabase.from('projects').update(projectData).eq('id', editingProject.id);

      if (error) alert(error.message);

    } else {
      // Crear nuevo proyecto
      const { error } = await supabase.from('projects').insert(projectData);

      if (error) alert(error.message);
    }
    
    // Cerramos el modal y recargamos la lista de proyectos
    setIsModalOpen(false);
    setEditingProject(null);
    fetchProjects();
  };
  
  // Función para manejar la eliminación de un proyecto
  const handleDelete = async (projectId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
        if (error) {
            alert(error.message);
        } else {
            fetchProjects();
        }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) return <p className="text-white text-center p-8">Cargando proyectos...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div>
            <button onClick={() => setIsModalOpen(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mr-4">Añadir Proyecto</button>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cerrar Sesión</button>
          </div>
        </div>

        {/* Tabla de Proyectos */}
        <div className="bg-slate-900 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-slate-800 text-left text-xs font-semibold uppercase tracking-wider">Título</th>
                <th className="px-5 py-3 border-b-2 border-slate-800 text-left text-xs font-semibold uppercase tracking-wider">Descripción</th>
                <th className="px-5 py-3 border-b-2 border-slate-800 text-left text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-5 border-b border-slate-800 text-sm">{project.title}</td>
                  // LÍNEA CORREGIDA
                  <td className="px-5 py-5 border-b border-slate-800 text-sm">
                    {project.description ? `${project.description.substring(0, 50)}...` : 'Sin descripción'}
                  </td>
                  <td className="px-5 py-5 border-b border-slate-800 text-sm">
                    <button onClick={() => { setEditingProject(project); setIsModalOpen(true); }} className="text-yellow-400 hover:text-yellow-600 mr-3">Editar</button>
                    <button onClick={() => handleDelete(project.id!)} className="text-red-400 hover:text-red-600">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal del Formulario */}
      {isModalOpen && (
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleFormSubmit}
          onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
        />
      )}
    </div>
  );
}