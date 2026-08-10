/*
  ===========================================================
  REGRAS - CATEGORIA COMERCIAL
  ===========================================================
  Regras para mensagens de vendas, propostas e negociações.
*/

export const regrasComercial = [

  {
    id: "comercial_chamada_para_acao",
    tipo: "acerto",
    peso: 5,
    mensagem: "Mensagem contém uma chamada para ação clara",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = ["fale conosco", "responda", "clique", "agende", "aproveite", "garanta o seu"];
      return termos.some((t) => texto.includes(t));
    },
  },

  {
    id: "comercial_promessa_exagerada",
    tipo: "problema",
    peso: 15,
    mensagem: "Evite promessas exageradas, isso pode soar como spam/golpe",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = ["100% garantido", "dinheiro fácil", "dinheiro facil", "sem esforço", "sem esforco", "ganhe rápido"];
      return termos.some((t) => texto.includes(t));
    },
  },

];