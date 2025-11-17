import type { Potion } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

interface PotionCardProps {
  potion: Potion;
}

const PotionCard = ({ potion }: PotionCardProps) => {
  const { addNotification } = useNotification();

  const handleBuy = () => {
    addNotification(`${potion.nome} adicionado ao carrinho!`, 'success');
  };

  return (
    <div className="potion-card">
      <div className="potion-image-container">
        <img src={potion.imagemUrl} alt={potion.nome} className="potion-image" />
      </div>
      <div className="potion-info">
        <h3 className="potion-name">{potion.nome}</h3>
        <p className="potion-description">{potion.descricao}</p>
        <div className="potion-footer">
          <span className="potion-price">R$ {potion.preco.toFixed(2)}</span>
          <button onClick={handleBuy} className="buy-button">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotionCard;
