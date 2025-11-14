const HistorySection = () => {
  return (
    <section className="history-section">
      <div className="history-container">
        <h2 className="section-title">Nossa História</h2>
        <div className="history-content">
          <div className="history-text">
            <p className="history-year">Fundada em 1867</p>
            <p>
              Há mais de um século e meio, nossa loja foi fundada por Ágatha Morgenstern,
              uma renomada alquimista que dedicou sua vida ao estudo das artes místicas.
              Desde então, nossa família tem mantido viva a tradição de criar poções
              da mais alta qualidade, usando apenas ingredientes selecionados e fórmulas
              centenárias.
            </p>
            <p>
              Localizada no coração histórico da cidade, nossa loja se tornou
              um ponto de referência para aqueles que buscam soluções mágicas
              para seus desafios cotidianos. Cada poção é cuidadosamente preparada
              seguindo rigorosos padrões de qualidade e pureza.
            </p>
          </div>
          <div className="history-images">
            <div className="history-image">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop"
                alt="Laboratório de alquimia antigo"
              />
              <p className="image-caption">Nosso laboratório original, 1867</p>
            </div>
            <div className="history-image">
              <img
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop"
                alt="Ingredientes alquímicos"
              />
              <p className="image-caption">Ingredientes raros e preciosos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
