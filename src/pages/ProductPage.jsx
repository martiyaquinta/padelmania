import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import productsData from '../data/products.json';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Simular carga async del producto
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProduct = productsData.products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      
      setIsLoading(false);
    }, 300);
  }, [id]);

  // Actualizar título de la página
  useEffect(() => {
    if (product) {
      document.title = `${product.title} - Padelmania`;
    } else if (notFound) {
      document.title = 'Producto no encontrado - Padelmania';
    }
    
    // Restaurar título original al desmontar
    return () => {
      document.title = 'Padelmania — Tienda oficial de pádel natural y bienestar';
    };
  }, [product, notFound]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-natural-white">
        {/* Skeleton loading */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagen skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            
            {/* Información skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-natural-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-navy mb-2">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El producto que buscás no existe o ha sido removido de nuestro catálogo.
          </p>
          <div className="space-x-4">
            <a
              href="/shop"
              className="btn-primary"
            >
              Ver todos los productos
            </a>
            <a
              href="/"
              className="btn-secondary"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural-white">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductPage;