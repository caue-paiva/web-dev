import type { Potion } from '../../types';

interface PotionCardProps {
  potion: Potion;
}

const PotionCard = ({ potion }: PotionCardProps) => {
  const handleBuy = () => {
    alert(`Funcionalidade de compra ainda não implementada.\n\nPoção: ${potion.nome}\nPreço: R$ ${potion.preco.toFixed(2)}`);
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
