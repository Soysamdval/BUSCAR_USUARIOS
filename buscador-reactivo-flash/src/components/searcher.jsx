import React from 'react';

export default function searcherInput({ searchQuery, setSearchQuery, handleSearch }) {
  // Permitir buscar al presionar Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Buscar por nombre, perfil o intereses..."
        className="
          flex-grow
          px-4 py-3
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
          duration-300
          text-gray-900
          dark:text-gray-100
          dark:bg-gray-800
          placeholder-gray-400 dark:placeholder-gray-500
        "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Buscar usuarios"
      />
      <button
        onClick={handleSearch}
        className="
          bg-indigo-600 hover:bg-indigo-700
          text-white
          rounded-lg
          px-6 py-3
          font-semibold
          transition-colors
          duration-300
          shadow-md
          focus:outline-none focus:ring-4 focus:ring-indigo-400
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        disabled={!searchQuery.trim()}
      >
        Buscar
      </button>
    </div>
  );
}
