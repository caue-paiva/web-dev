const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contato</h3>
          <p>Email: contato@pocoesesolucoes.com</p>
          <p>Telefone: (11) 1867-1867</p>
        </div>
        <div className="footer-section">
          <h3>Localização</h3>
          <p>Beco Diagonal, 93</p>
          <p>Centro Histórico - São Paulo, SP</p>
          <p>CEP: 01867-000</p>
        </div>
        <div className="footer-section">
          <h3>Horário de Funcionamento</h3>
          <p>Segunda a Sexta: 9h às 18h</p>
          <p>Sábado: 10h às 14h</p>
          <p>Domingo: Fechado</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 1867-{new Date().getFullYear()} Poções e Soluções. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
