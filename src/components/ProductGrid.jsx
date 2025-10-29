import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FiltersPanel from './FiltersPanel';
import { filterProducts, sortProducts } from '../utils/helpers';
import productsData from '../data/products.json';

const ProductGrid = ({ 
  title = "Nuestros Productos", 
  showFilters = true, 
  limit = null,
  category = null,
  searchQuery = "" 
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: category || 'all',
    minPrice: '',
    maxPrice: '',
    search: searchQuery,
    tags: [],
    inStock: false
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    setIsLoading(true);
    // Simular carga async
    setTimeout(() => {
      setProducts(productsData.products);
      setIsLoading(false);
    }, 500);
  }, []);

  // Actualizar búsqueda cuando cambie searchQuery
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Filtrar y ordenar productos cuando cambien los filtros
  useEffect(() => {
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortBy);
    
    if (limit) {
      result = result.slice(0, limit);
    }
    
    setFilteredProducts(result);
  }, [products, filters, sortBy, limit]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const sortOptions = [
    { value: 'newest', label: 'Más nuevos' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'name-asc', label: 'Nombre: A-Z' },
    { value: 'name-desc', label: 'Nombre: Z-A' }
  ];

  if (isLoading) {
    return (
      <section className="py-16 bg-natural-white" id="shop-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-8">
            {title}
          </h2>
          {/* Skeleton loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-natural-white" id="shop-section">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubrí nuestra colección de productos de pádel diseñados para mejorar tu rendimiento 
            y conectarte con la naturaleza del juego.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Panel de filtros */}
          {showFilters && (
            <div className="lg:w-1/4">
              <FiltersPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                categories={productsData.categories}
                availableTags={productsData.tags}
              />
            </div>
          )}

          {/* Contenido principal */}
          <div className={showFilters ? "lg:w-3/4" : "w-full"}>
            {/* Barra superior con resultados y ordenamiento */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-600">
                {filteredProducts.length === 0 ? (
                  "No se encontraron productos"
                ) : (
                  <>
                    Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                    {filters.search && (
                      <span className="ml-1">
                        para "{filters.search}"
                      </span>
                    )}
                  </>
                )}
              </div>

              {filteredProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-select" className="text-sm text-gray-600">
                    Ordenar por:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input-base text-sm py-2"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Grid de productos */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  No encontramos productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intentá ajustar los filtros o buscar otros términos
                </p>
                <button
                  onClick={() => setFilters({
                    category: 'all',
                    minPrice: '',
                    maxPrice: '',
                    search: '',
                    tags: [],
                    inStock: false
                  })}
                  className="btn-primary"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Mostrar más productos (si hay límite) */}
            {limit && products.length > limit && (
              <div className="text-center mt-12">
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="btn-secondary"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;