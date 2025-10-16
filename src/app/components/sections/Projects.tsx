import React from 'react';
import ProjectCard from '../projects/ProjectCard';

// Datos de ejemplo para tus proyectos
const projectsData = [
  {
    id: 1,
    title: 'Dashboard de Análisis de Ventas',
    description: 'Una aplicación interactiva para visualizar métricas de ventas, desarrollada con Python (Dash) y desplegada en la web.',
    imageUrl: '/images/project-1.jpg', // Crearemos esta imagen en el siguiente paso
    tags: ['Python', 'Dash', 'Pandas', 'Plotly'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'Sistema de Recomendación de Películas',
    description: 'Un modelo de machine learning que sugiere películas a los usuarios basado en sus calificaciones anteriores.',
    imageUrl: '/images/project-2.jpg', // Crearemos esta imagen en el siguiente paso
    tags: ['Machine Learning', 'Scikit-learn', 'Flask', 'React'],
    liveUrl: '#',
    codeUrl: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Mis Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              liveUrl={project.liveUrl}
              codeUrl={project.codeUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;