/*
  ===========================================================
  SCRIPT PRINCIPAL - UniValidator
  ===========================================================
  Responsabilidade deste arquivo: falar com o DOM (HTML).
  Ele NÃO contém regras de validação — só pega o que o
  usuário digitou, manda pro "motor" (regras/motor.js)
  e pinta o resultado na tela.
*/

import { avaliarMensagem } from "./regras/motor.js";
import { sugestoesPorCategoria } from "./regras/sugestoes/index.js";

// ---------- Pega referências dos elementos do HTML ----------
const selectCategoria = document.getElementById("categoria");
const textareaMensagem = document.getElementById("mensagem");
const btnValidar = document.getElementById("btnValidar");
const loadingOverlay = document.getElementById("loadingOverlay");

const resultadoCard = document.getElementById("resultado");
const notaValor = document.getElementById("notaValor");
const statusRisco = document.getElementById("statusRisco");
const listaAcertos = document.getElementById("listaAcertos");
const listaProblemas = document.getElementById("listaProblemas");
const listaSugestoes = document.getElementById("listaSugestoes");
const btnSugestoes = document.getElementById("btnSugestoes");

const modalSugestoes = document.getElementById("modalSugestoes");
const fecharModal = document.getElementById("fecharModal");
const listaMensagens = document.getElementById("listaMensagens");

// ---------- Evento principal: clique no botão "Validar" ----------
btnValidar.addEventListener("click", () => {
  const mensagem = textareaMensagem.value.trim();
  const categoria = selectCategoria.value;

  if (!mensagem) {
    alert("Digite uma mensagem para validar.");
    return;
  }

  // Mostra o loading
  loadingOverlay.classList.add("ativo");

  // Pequeno delay só pra dar a sensação de processamento
  setTimeout(() => {
    const resultado = avaliarMensagem(mensagem, categoria);
    renderizarResultado(resultado);

    // Esconde o loading
    loadingOverlay.classList.remove("ativo");
  }, 1200); // 1.2 segundos
});

/**
 * Pega o objeto de resultado vindo do motor e escreve tudo na tela.
 */
function renderizarResultado(resultado) {
  // Mostra o card de resultado
  resultadoCard.classList.remove("oculto");

  // Atualiza a nota
  notaValor.textContent = resultado.nota;

  // Remove classes antigas
  notaValor.classList.remove("nota-verde", "nota-amarela", "nota-vermelha");

  // Define a cor conforme a nota
  if (resultado.nota >= 80) {
    notaValor.classList.add("nota-verde");
  } else if (resultado.nota >= 50) {
    notaValor.classList.add("nota-amarela");
  } else {
    notaValor.classList.add("nota-vermelha");
  }

  // Status (risco de denúncia)
  statusRisco.textContent = `${resultado.status.emoji} ${resultado.status.texto}`;
  statusRisco.className = `status status--${resultado.status.classe}`;

  // Listas
  preencherLista(listaAcertos, resultado.acertos, "Nenhuma boa prática institucional identificada");
  preencherLista(listaProblemas, resultado.problemas, "Nenhum problema encontrado");
  preencherLista(listaSugestoes, resultado.sugestoes, "Nenhuma sugestão adicional");
}

/**
 * Preenche uma lista <ul> com itens <li>.
 */
function preencherLista(elementoUl, itens, textoQuandoVazio) {
  elementoUl.innerHTML = "";

  if (itens.length === 0) {
    const li = document.createElement("li");
    li.textContent = textoQuandoVazio;
    li.classList.add("lista-vazia");
    elementoUl.appendChild(li);
    return;
  }

  itens.forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    elementoUl.appendChild(li);
  });
}

// ================================
// BIBLIOTECA DE MENSAGENS
// ================================

btnSugestoes.addEventListener("click", abrirSugestoes);

fecharModal.addEventListener("click", () => {
  modalSugestoes.classList.add("oculto");
});

window.addEventListener("click", (e) => {
  if (e.target === modalSugestoes) {
    modalSugestoes.classList.add("oculto");
  }
});

function abrirSugestoes() {
  modalSugestoes.classList.remove("oculto");

  const categoria = selectCategoria.value;
  const mensagens = sugestoesPorCategoria[categoria] || [];

  listaMensagens.innerHTML = "";

  mensagens.forEach((msg) => {
    const card = document.createElement("div");
    card.className = "cardMensagem";

    card.innerHTML = `
      <h3>${msg.titulo}</h3>
      <textarea readonly>${msg.texto}</textarea>

      <div class="card-botoes">
        <button class="copiarMensagem">📋 Copiar</button>
<button class="validarMensagem">
    ✅ Validar
</button>      </div>
    `;

    // Botão Copiar
    const botaoCopiar = card.querySelector(".copiarMensagem");
    botaoCopiar.addEventListener("click", () => {
      navigator.clipboard.writeText(msg.texto);
      botaoCopiar.textContent = "✅ Copiado!";
      setTimeout(() => {
        botaoCopiar.textContent = "📋 Copiar";
      }, 1500);
    });

    // Botão Validar (do card)
    const botaoValidarCard = card.querySelector(".validarMensagem");
    botaoValidarCard.addEventListener("click", () => {
      // Fecha o modal
      modalSugestoes.classList.add("oculto");

      // Coloca o texto da sugestão no textarea
      textareaMensagem.value = msg.texto;

      // Dispara a validação automaticamente
      btnValidar.click();
    });

    listaMensagens.appendChild(card);
  });
}