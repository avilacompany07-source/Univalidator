/*
  ===========================================================
  REGRAS - CATEGORIA FINANCEIRO
  ===========================================================
  Regras que só fazem sentido quando a categoria selecionada
  for "Financeiro" (cobranças, boletos, pagamentos, etc.)

  Mesmo formato de objeto usado em regrasGerais.js.
  Sinta-se à vontade pra adicionar mais regras aqui depois.
*/

export const regrasFinanceiro = [

  {
    id: "financeiro_menciona_valor",
    tipo: "acerto",
    peso: 5,
    mensagem: "Mensagem menciona um valor monetário (R$)",
    testar: (mensagem) => /r\$\s?\d/i.test(mensagem),
  },

  {
    id: "financeiro_sem_dados_pagamento",
    tipo: "sugestao",
    peso: 0,
    mensagem: "Considere incluir a forma de pagamento (PIX, boleto, etc.)",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const formas = ["pix", "boleto", "cartão", "cartao", "transferência", "transferencia"];
      return !formas.some((f) => texto.includes(f));
    },
  },

  {
    id: "financeiro_tom_ameacador",
    tipo: "problema",
    peso: 20,
    mensagem: "Tom pode soar ameaçador para cobrança, revise a abordagem",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = ["negativado", "protesto", "processo", "última chance", "ultima chance"];
      return termos.some((t) => texto.includes(t));
    },
  },

];