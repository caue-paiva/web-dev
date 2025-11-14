import { useState, useEffect } from 'react';
import type { Potion } from '../../types';
import PotionCard from './PotionCard';
import { apiService } from '../../services/api';

const ProductsSection = () => {
  const [potions, setPotions] = useState<Potion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPotions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getPotions();
        setPotions(data);
      } catch (err) {
        console.error('Erro ao buscar poções:', err);
        setError('Erro ao carregar poções. Verifique se o servidor está rodando.');
      } finally {
        setLoading(false);
      }
    };

    fetchPotions();
  }, []);

  return (
    <section className="products-section">
      <div className="products-container">
        <h2 className="section-title">Nossas Poções</h2>
        {loading ? (
          <div className="loading">Carregando poções...</div>
        ) : error ? (
          <div className="loading" style={{ color: 'var(--color-error)' }}>{error}</div>
        ) : (
          <div className="potions-grid">
            {potions.length === 0 ? (
              <p className="no-potions">Nenhuma poção disponível no momento.</p>
            ) : (
              potions.map((potion) => (
                <PotionCard key={potion.id} potion={potion} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
