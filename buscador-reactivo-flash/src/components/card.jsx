import { useState, useEffect } from 'react';
import stylesConfig from '../../package.card.json';

export default function Card({ usuario }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="p-50px rounded-xl cursor-pointer flex flex-col items-center text-center transition-all duration-500 ease-in-out"
      style={{
        background: `linear-gradient(90deg, ${stylesConfig.colors.gradientStart}, ${stylesConfig.colors.gradientMid}, ${stylesConfig.colors.gradientEnd})`,
        boxShadow: isHovered
          ? stylesConfig.shadows.cardHover
          : stylesConfig.shadows.card,
        color: stylesConfig.colors.textPrimary,
        transform: isVisible
          ? isHovered
            ? 'translateY(-5px) scale(1.03)'
            : 'translateY(0)'
          : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
      }}
      title={`${usuario.nombre} ${usuario.apellidos}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4"
        style={{
          boxShadow: stylesConfig.shadows.cardHover,
          transition: 'box-shadow 0.3s ease-in-out'
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={usuario.foto}
          alt={`${usuario.nombre} ${usuario.apellidos}`}
        />
      </div>

      <h3 className="text-xl font-extrabold drop-shadow-md">
        {usuario.nombre} {usuario.apellidos}
      </h3>
      <p className="text-sm uppercase tracking-wide mt-1 drop-shadow-sm">
        {usuario.perfil}
      </p>
      <p
        className="text-xs italic mt-2 max-w-xs"
        style={{ color: stylesConfig.colors.textSecondary }}
      >
        {usuario.intereses}
      </p>
      <a
        href={`mailto:${usuario.correo}`}
        className="mt-4 underline text-sm transition-colors duration-300"
        style={{ color: stylesConfig.colors.linkHover }}
        onMouseEnter={e => (e.currentTarget.style.color = stylesConfig.colors.textPrimary)}
        onMouseLeave={e => (e.currentTarget.style.color = stylesConfig.colors.linkHover)}
      >
        {usuario.correo}
      </a>
    </div>
  );
}
