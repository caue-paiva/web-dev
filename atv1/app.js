import {Refrigerante} from './types.js'

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

    refrigerantes.forEach((refri) => {
        const li = document.createElement("li");
      
        // miniatura com overlay do botão
        const thumb = document.createElement("div");
        thumb.className = "thumb";
      
        const img = document.createElement("img");
        img.src = refri.imagem;
        img.alt = refri.sabor;
        img.loading = "lazy";
      
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "thumb-btn";
        btn.setAttribute("aria-label", `Selecionar ${refri.sabor}`);
        btn.addEventListener("click", () => {
          console.log(`Clicou em: ${refri.sabor}`);
          // aqui você pode abrir modal, adicionar ao carrinho, etc.
        });
      
        thumb.append(img, btn);
      
        const span = document.createElement("span");
        span.textContent = refri.sabor;
      
        li.append(thumb, span);
        lista.appendChild(li);
      });
}

window.addEventListener("DOMContentLoaded", popularLista);