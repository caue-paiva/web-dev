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
    constructor() {
        this.selectedSoda = null; // Refrigerante selecionado (apenas um)
        this.insertedAmount = 0; // Valor inserido em moedas
        this.listeners = []; // Para notificar mudanças
        this.requiredAmount = this.selectedSoda ? this.selectedSoda.preco : 0;
    }

    /**
     * Seleciona um refrigerante. Retorna erro se já houver outro selecionado.
     * @param {Refrigerante} refrigerante 
     * @returns {{success: boolean, message?: string}}
     */
    selectSoda(refrigerante) {
        if (this.selectedSoda && this.selectedSoda.sabor !== refrigerante.sabor) {
            return {
                success: false,
                message: `Já há ${this.selectedSoda.sabor} selecionado. Cancele a compra primeiro.`
            };
        }
        
        this.selectedSoda = refrigerante;
        this.requiredAmount = this.selectedSoda.preco;
        this.notifyListeners();
        return { success: true };
    }

    /**
     * Insere uma moeda na máquina
     * @param {number} coinValue 
     * @returns {{success: boolean, message?: string}}
     */
    insertCoin(coinValue) {
        const validCoins = [0.25, 0.50, 1.00];
        
        if (!validCoins.includes(coinValue)) {
            return {
                success: false,
                message: `Moeda de R$ ${coinValue.toFixed(2)} não aceita.`
            };
        }

        if (!this.selectedSoda) {
            return {
                success: false,
                message: "Selecione um refrigerante primeiro."
            };
        }

        this.insertedAmount += coinValue;
        this.notifyListeners();
        
        return { success: true };
    }

    /**
     * Verifica se pode liberar o refrigerante
     * @returns {boolean}
     */
    canRelease() {
        return this.selectedSoda && this.insertedAmount >= this.requiredAmount;
    }

    /**
     * Calcula o troco
     * @returns {number}
     */
    getChange() {
        if (!this.canRelease()) return 0;
        return Math.max(0, this.insertedAmount - this.requiredAmount);
    }

    /**
     * Libera o refrigerante e calcula troco
     * @returns {{success: boolean, message: string, change: number}}
     */
    releaseSoda() {
        if (!this.canRelease()) {
            const remaining = this.requiredAmount - this.insertedAmount;
            return {
                success: false,
                message: `Insira mais R$ ${remaining.toFixed(2)} para liberar o refrigerante.`,
                change: 0
            };
        }

        const change = this.getChange();
        const sodaName = this.selectedSoda.sabor;
        
        // Reset da máquina
        this.selectedSoda = null;
        this.insertedAmount = 0;
        
        this.notifyListeners();
        
        return {
            success: true,
            message: `Refrigerante ${sodaName} liberado${change > 0 ? `. Troco: R$ ${change.toFixed(2)}` : '.'}`,
            change: change
        };
    }

    /**
     * Cancela a compra e retorna as moedas
     * @returns {{success: boolean, message: string, returnedAmount: number}}
     */
    cancelPurchase() {
        const returned = this.insertedAmount;
        this.selectedSoda = null;
        this.insertedAmount = 0;
        this.notifyListeners();
        
        return {
            success: true,
            message: returned > 0 ? `Compra cancelada. Moedas devolvidas: R$ ${returned.toFixed(2)}` : "Compra cancelada.",
            returnedAmount: returned
        };
    }

    /**
     * Obtém o refrigerante selecionado
     * @returns {Refrigerante|null}
     */
    getSelectedSoda() {
        return this.selectedSoda;
    }

    /**
     * Obtém o valor inserido
     * @returns {number}
     */
    getInsertedAmount() {
        return this.insertedAmount;
    }

    /**
     * Obtém o valor restante necessário
     * @returns {number}
     */
    getRemainingAmount() {
        return Math.max(0, this.requiredAmount - this.insertedAmount);
    }

    /**
     * Adiciona um listener para mudanças na store
     * @param {Function} callback 
     */
    addListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Remove um listener
     * @param {Function} callback 
     */
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Notifica todos os listeners sobre mudanças
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this));
    }
}