/*
  ===========================================================
  REGRAS - CATEGORIA RELACIONAMENTO
  ===========================================================
  Regras para mensagens de atendimento/relacionamento com
  cliente (suporte, pós-venda, contato pessoal, etc.)
*/

export const regrasRelacionamento = [

  {
    id: "relacionamento_tom_pessoal",
    tipo: "acerto",
    peso: 5,
    mensagem: "Mensagem usa um tom próximo e pessoal",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = ["como você está", "como vc está", "espero que esteja bem", "tudo bem"];
      return termos.some((t) => texto.includes(t));
    },
  },

  {
    id: "relacionamento_sem_pergunta",
    tipo: "sugestao",
    peso: 0,
    mensagem: "Considere incluir uma pergunta para incentivar a resposta",
    testar: (mensagem) => !mensagem.includes("?"),
  },

];