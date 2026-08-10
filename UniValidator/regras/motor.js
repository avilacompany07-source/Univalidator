/*
  ===========================================================
  MOTOR DE VALIDAÇÃO
  ===========================================================
  Este é o "cérebro" que pega a mensagem + categoria,
  roda todas as regras (gerais + da categoria escolhida)
  e devolve um resultado pronto pra tela mostrar.
*/

import { regrasGerais } from "./regrasGerais.js";
import { regrasPorCategoria } from "./categorias/index.js";

export function avaliarMensagem(mensagem, categoria) {
  const regrasDaCategoria = regrasPorCategoria[categoria] || [];
  const todasAsRegras = [...regrasGerais, ...regrasDaCategoria];

  const acertos = [];
  const problemas = [];
  const sugestoes = [];

  let nota = 100;

  for (const regra of todasAsRegras) {
    const disparou = regra.testar(mensagem);

    if (!disparou) continue;

    switch (regra.tipo) {
      case "acerto":
        acertos.push(regra.mensagem);
        break;

      case "problema": {
        if (Array.isArray(disparou)) {
          // A regra encontrou uma LISTA de termos (ex: termos proibidos)
          problemas.push(`${regra.mensagem} (termos encontrados: "${disparou.join('", "')}")`);
          nota -= regra.peso * disparou.length;
        } else if (typeof disparou === "string") {
          // A regra encontrou UM termo só
          problemas.push(`${regra.mensagem} (termo encontrado: "${disparou}")`);
          nota -= regra.peso;
        } else {
          // Regra normal, sem termo específico
          problemas.push(regra.mensagem);
          nota -= regra.peso;
        }
        break;
      }

      case "sugestao":
        sugestoes.push(regra.mensagem);
        break;
    }
  }

  nota = Math.max(0, Math.min(100, nota));

  return {
    nota,
    status: calcularStatus(nota),
    acertos,
    problemas,
    sugestoes,
  };
}

function calcularStatus(nota) {
  if (nota >= 80) {
    return { texto: "Baixo risco", emoji: "🟢", classe: "baixo" };
  }
  if (nota >= 50) {
    return { texto: "Médio risco", emoji: "🟡", classe: "medio" };
  }
if (nota <= 49) {
  return { texto: "Alto risco", emoji: "🔴", classe: "alto" };
}
}