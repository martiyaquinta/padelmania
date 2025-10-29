import React, { useState } from 'react';

const FiltersPanel = ({ filters, onFiltersChange, categories, availableTags }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', newTags);
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
      tags: [],
      inStock: false
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.category !== 'all' ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.search ||
      (filters.tags && filters.tags.length > 0) ||
      filters.inStock
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header del panel - Mobile */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-navy">Filtros</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-navy hover:text-mint transition-colors"
          aria-label={isOpen ? "Cerrar filtros" : "Abrir filtros"}
        >
          <svg 
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Header del panel - Desktop */}
      <div className="hidden lg:flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-navy">Filtros</h3>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-sm text-mint hover:text-navy transition-colors font-medium"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Contenido de filtros */}
      <div className={`space-y-6 ${isOpen || 'lg:block' ? 'block' : 'hidden'}`}>
        
        {/* Categorías */}
        <div>
          <h4 className="font-medium text-navy mb-3">Categoría</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="all"
                checked={filters.category === 'all'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="text-mint focus:ring-mint"
              />
              <span className="text-sm">Todas las categorías</span>
            </label>
            
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="text-mint focus:ring-mint"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rango de precio */}
        <div>
          <h4 className="font-medium text-navy mb-3">Precio</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="min-price" className="block text-xs text-gray-600 mb-1">
                  Mínimo
                </label>
                <input
                  id="min-price"
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input-base text-sm w-full py-2"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="block text-xs text-gray-600 mb-1">
                  Máximo
                </label>
                <input
                  id="max-price"
                  type="number"
                  placeholder="$999999"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input-base text-sm w-full py-2"
                />
              </div>
            </div>
            
            {/* Rangos predefinidos */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleFilterChange('minPrice', '0');
                  handleFilterChange('maxPrice', '15000');
                }}
                className="text-xs bg-gray-100 hover:bg-mint hover:text-navy transition-colors px-3 py-2 rounded-lg"
              >
                $0 - $15.000
              </button>
              <button
                onClick={() => {
                  handleFilterChange('minPrice', '15000');
                  handleFilterChange('maxPrice', '25000');
                }}
                className="text-xs bg-gray-100 hover:bg-mint hover:text-navy transition-colors px-3 py-2 rounded-lg"
              >
                $15.000 - $25.000
              </button>
            </div>
          </div>
        </div>

        {/* Tags/Etiquetas */}
        <div>
          <h4 className="font-medium text-navy mb-3">Características</h4>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`text-xs px-3 py-2 rounded-full border transition-all duration-300 ${
                  filters.tags && filters.tags.includes(tag)
                    ? 'bg-mint text-navy border-mint'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-mint'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div>
          <h4 className="font-medium text-navy mb-3">Disponibilidad</h4>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="text-mint focus:ring-mint rounded"
            />
            <span className="text-sm">Solo productos en stock</span>
          </label>
        </div>

        {/* Botón limpiar - Mobile */}
        <div className="lg:hidden">
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="w-full btn-secondary py-3"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;