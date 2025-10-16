import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Definimos los tipos de datos que recibirá la tarjeta
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tags, liveUrl, codeUrl }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
      <Image src={imageUrl} alt={`Imagen del proyecto ${title}`} width={500} height={300} className="w-full h-48 object-cover" />
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-cyan-900 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
            Ver Demo
          </a>
          <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            Código Fuente
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;