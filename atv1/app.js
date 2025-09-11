import {Refrigerante, Store} from './types.js'

// Instancia  store global
const store = new Store();

// pega refrigerantes disponíveis da API, retorna um objeto vazio caso não existam refrigerantes disponíveis
async function fetchRefrigerantesDisponiveis () {
    try {
        const resp = await fetch("https://api.jsonbin.io/v3/b/68b9f743d0ea881f4071dd7f");
        if (!resp.ok) throw new Error(`Falha HTTP ${resp.status}`);
        const dados = await resp.json();
        return dados
    } catch (e) {
        return {}
    }
}

// popula lista com dados da API
async function popularLista() {
    const lista = document.getElementById("lista-refrigerantes");
    lista.innerHTML = ""; 

    const dados = await fetchRefrigerantesDisponiveis();
    console.log(dados)
    const refrigerantes = dados.record.bebidas || [];

    if (refrigerantes.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhum refrigerante disponível";
        lista.appendChild(li);
        return;
    }

    refrigerantes.forEach((refriData) => {
        // Cria instância de Refrigerante
        const refrigerante = new Refrigerante(refriData.sabor, refriData.imagem, refriData.preco);
        
        const li = document.createElement("li");
      
        // miniatura com overlay do botão
        const thumb = document.createElement("div");
        thumb.className = "thumb";
      
        const img = document.createElement("img");
        img.src = refrigerante.urlImagem;
        img.alt = refrigerante.sabor;
        img.loading = "lazy";
      
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "thumb-btn";
        btn.setAttribute("aria-label", `Selecionar ${refrigerante.sabor}`);
        btn.addEventListener("click", () => {
          const result = store.selectSoda(refrigerante);
          if (result.success) {
            console.log(`Selecionado: ${refrigerante.sabor}`);
            atualizarInterface();
          } else {
            mostrarMensagem(result.message, 'error');
          }
        });
      
        thumb.append(img, btn);
      
        const info = document.createElement("div");
        info.className = "info";
        
        const span = document.createElement("span");
        span.textContent = refrigerante.sabor;
        
        const preco = document.createElement("span");
        preco.className = "preco";
        preco.textContent = `R$ ${refrigerante.preco ? refrigerante.preco.toFixed(2) : 'N/A'}`;
        
        info.append(span, preco);
      
        li.append(thumb, info);
        lista.appendChild(li);
      });
}

// Função para atualizar a interface da máquina
function atualizarInterface() {
    atualizarVisor();
    atualizarSelecaoVisual();
    verificarLiberacao();
}

// Atualiza o visor da máquina
function atualizarVisor() {
    const display = document.getElementById("machine-display");
    if (!display) return;
    
    // Não atualiza o visor se há uma animação de liberação ativa
    if (display.classList.contains('release-animation')) {
        return;
    }
    
    const selectedSoda = store.getSelectedSoda();
    const insertedAmount = store.getInsertedAmount();
    const remainingAmount = store.getRemainingAmount();
    
    let html = `
        <div class="display-line">
            <strong>MÁQUINA DE REFRIGERANTE</strong>
        </div>
        <div class="display-line">
            Preço: R$ 2,50
        </div>
    `;
    
    if (selectedSoda) {
        html += `
            <div class="display-line selected">
                ► ${selectedSoda.sabor} selecionado
            </div>
        `;
    } else {
        html += `
            <div class="display-line">
                Selecione um refrigerante
            </div>
        `;
    }
    
    html += `
        <div class="display-line amount">
            Inserido: R$ ${insertedAmount.toFixed(2)}
        </div>
    `;
    
    if (selectedSoda && remainingAmount > 0) {
        html += `
            <div class="display-line remaining">
                Faltam: R$ ${remainingAmount.toFixed(2)}
            </div>
        `;
    }
    
    if (store.canRelease()) {
        html += `
            <div class="display-line ready">
                ✅ PRESSIONE LIBERAR!
            </div>
        `;
    }
    
    display.innerHTML = html;
}

// Atualiza a visualização dos refrigerantes selecionados
function atualizarSelecaoVisual() {
    const selectedSoda = store.getSelectedSoda();
    
    document.querySelectorAll('#lista-refrigerantes li').forEach(li => {
        const span = li.querySelector('.info span:first-child');
        const sabor = span ? span.textContent : '';
        
        if (selectedSoda && sabor === selectedSoda.sabor) {
            li.classList.add('selected');
        } else {
            li.classList.remove('selected');
        }
    });
}

// Verifica se pode liberar automaticamente
function verificarLiberacao() {
    if (store.canRelease()) {
        const releaseBtn = document.getElementById('release-btn');
        if (releaseBtn) {
            releaseBtn.disabled = false;
            releaseBtn.classList.add('ready');
        }
    } else {
        const releaseBtn = document.getElementById('release-btn');
        if (releaseBtn) {
            releaseBtn.disabled = true;
            releaseBtn.classList.remove('ready');
        }
    }
}

// Função para mostrar mensagens
function mostrarMensagem(mensagem, tipo = 'info') {
    const messageArea = document.getElementById('message-area');
    if (!messageArea) return;
    
    messageArea.innerHTML = `<div class="message ${tipo}">${mensagem}</div>`;
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 3000);
}

// Função para inserir moeda
function inserirMoeda(valor) {
    const result = store.insertCoin(valor);
    if (result.success) {
        mostrarMensagem(`Moeda de R$ ${valor.toFixed(2)} inserida`, 'success');
        atualizarInterface();
    } else {
        mostrarMensagem(result.message, 'error');
    }
}

// Função para liberar produto
function liberarProduto() {
    const result = store.releaseSoda();
    
    if (result.success) {
        mostrarLiberacaoComEfeito(result.message, result.change);
        // Atualiza apenas a seleção visual, não o visor (que está animando)
        atualizarSelecaoVisual();
        verificarLiberacao();
    } else {
        mostrarMensagem(result.message, 'error');
        atualizarInterface();
    }
}

// Função especial para mostrar liberação com efeitos visuais
function mostrarLiberacaoComEfeito(mensagem, troco) {
    const messageArea = document.getElementById('message-area');
    const display = document.getElementById('machine-display');
    
    if (!messageArea) return;
    
    // Efeito especial no visor da máquina
    if (display) {
        display.innerHTML = `
            <div class="display-line release-display">
                <strong>🎉 PRODUTO LIBERADO! 🎉</strong>
            </div>
            <div class="display-line release-display">
                Retire seu refrigerante
            </div>
            ${troco > 0 ? `
                <div class="display-line change-display">
                    💰 TROCO: R$ ${troco.toFixed(2)}
                </div>
            ` : ''}
        `;
        display.classList.add('release-animation');
        
        // Remove o efeito do visor após 12 segundos
        setTimeout(() => {
            display.classList.remove('release-animation');
            // Atualiza o visor após a animação terminar
            atualizarVisor();
        }, 12000);
    }
    
    // Cria mensagem de liberação com efeito especial
    let html = `
        <div class="release-success">
            <div class="release-logo">
                <img src="monster_logo.jpg" alt="Monster Energy Logo" />
            </div>
            <div class="release-title">🎉 PRODUTO LIBERADO! 🎉</div>
            <div class="release-message">${mensagem.split('.')[0]}</div>
    `;
    
    if (troco > 0) {
        html += `
            <div class="change-info">
                💰 <strong>TROCO: R$ ${troco.toFixed(2)}</strong>
            </div>
        `;
    }
    
    html += `</div>`;
    
    messageArea.innerHTML = html;
    
    // Adiciona efeito de celebração
    messageArea.classList.add('celebration');
    
    // Remove após 15 segundos
    setTimeout(() => {
        messageArea.innerHTML = '';
        messageArea.classList.remove('celebration');
    }, 15000);
}

// Função para cancelar compra
function cancelarCompra() {
    const result = store.cancelPurchase();
    mostrarMensagem(result.message, 'info');
    atualizarInterface();
}

// Adiciona event listeners para os botões
function adicionarEventListeners() {
    // Botões de moedas
    document.querySelectorAll('.coin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const valor = parseFloat(btn.dataset.coin);
            inserirMoeda(valor);
        });
    });
    
    // Botão de liberar produto
    const releaseBtn = document.getElementById('release-btn');
    if (releaseBtn) {
        releaseBtn.addEventListener('click', liberarProduto);
    }
    
    // Botão de cancelar
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelarCompra);
    }
}

// Adiciona listener para mudanças no store
store.addListener(atualizarInterface);

window.addEventListener("DOMContentLoaded", () => {
    popularLista();
    adicionarEventListeners();
});