//Eu não gosto de linguagems sem tipagem explicita, então vou enxugar gelo no JS vanilla :)

/**
 * @typedef {Object} Refrigerante
 * @property {string} sabor
 * @property {string} imagem
 * @property {number} preco
 */
export class Refrigerante {
    /**
     * @param {string} sabor
     * @param {string} imagem
     * @param {number} preco
    */
    constructor(sabor, imagem, preco) {
      this.sabor = sabor;
      this.urlImagem = imagem;
      this.preco = preco ?? null;
    }
  
    //Constrói um array da classe a partir do retorno  da API
    static fromApi(dados) {
        const itens = dados?.bebidas ?? [];
        return itens.map(({ sabor, imagem, preco }) => new Refrigerante(sabor, imagem, preco));
    }
}

export class Store {
    
}