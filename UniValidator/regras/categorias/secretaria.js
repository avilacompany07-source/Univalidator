/*
  ===========================================================
  REGRAS - CATEGORIA SECRETARIA
  ===========================================================
  Regras para mensagens administrativas: agendamentos,
  confirmações, lembretes, avisos internos, etc.
*/

export const regrasSecretaria = [

  {
    id: "secretaria_menciona_data_hora",
    tipo: "acerto",
    peso: 5,
    mensagem: "Mensagem menciona data e/ou horário",
    testar: (mensagem) => {
      const temData = /\d{1,2}\/\d{1,2}(\/\d{2,4})?/.test(mensagem);
      const temHora = /\d{1,2}[:h]\d{0,2}/.test(mensagem);
      return temData || temHora;
    },
  },

  {
    id: "secretaria_sem_confirmacao",
    tipo: "sugestao",
    peso: 0,
    mensagem: "Considere pedir uma confirmação de recebimento/presença",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = ["confirma", "pode confirmar", "por favor confirme"];
      return !termos.some((t) => texto.includes(t));
    },
  },

];