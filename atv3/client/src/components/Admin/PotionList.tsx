import { useState, useEffect } from 'react';
import type { Potion } from '../../types';
import { apiService } from '../../services/api';

interface PotionListProps {
  refreshTrigger?: number;
}

const PotionList = ({ refreshTrigger }: PotionListProps) => {
  const [potions, setPotions] = useState<Potion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPotions();
  }, [refreshTrigger]);

  const fetchPotions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPotions();
      setPotions(data);
    } catch (err) {
      console.error('Erro ao buscar poções:', err);
      setError('Erro ao carregar poções.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta poção?')) {
      return;
    }

    try {
      await apiService.deletePotion(id);
      setPotions(potions.filter((p) => p.id !== id));
      alert('Poção removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover poção:', error);
      alert('Erro ao remover poção. Tente novamente.');
    }
  };

  return (
    <div className="potion-list-container">
      <h2>Poções Cadastradas</h2>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : error ? (
        <div className="loading" style={{ color: 'var(--color-error)' }}>{error}</div>
      ) : potions.length === 0 ? (
        <p className="no-potions">Nenhuma poção cadastrada.</p>
      ) : (
        <div className="admin-potion-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {potions.map((potion) => (
                <tr key={potion.id}>
                  <td>{potion.id}</td>
                  <td>{potion.nome}</td>
                  <td className="description-cell">{potion.descricao}</td>
                  <td>R$ {potion.preco.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(potion.id!)}
                      className="delete-button"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PotionList;
