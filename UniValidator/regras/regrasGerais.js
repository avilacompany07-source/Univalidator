/*
  ===========================================================
  REGRAS GERAIS
  ===========================================================
  Regras que se aplicam a QUALQUER categoria de mensagem
  (Financeiro, Relacionamento, Secretaria, Comercial, Outros).

  Cada regra é um OBJETO com este formato:

  {
    id: "identificador_unico",      -> nome curto pra identificar a regra
    tipo: "acerto" | "problema" | "sugestao",
    peso: number,                    -> quanto soma/subtrai da nota (0-100)
    mensagem: "texto mostrado pro usuário",
    testar: (mensagem) => boolean    -> função que retorna true se a regra "disparou"
  }

  Assim, pra criar uma regra nova no futuro, basta copiar o formato
  acima e adicionar um novo objeto dentro do array "regrasGerais".
  Nenhum outro arquivo precisa ser alterado.
*/

export const regrasGerais = [

  // ---------- ACERTOS (somam pontos) ----------

  {
    id: "saudacao_presente",
    tipo: "acerto",
    peso: 5,
    mensagem: "Mensagem inicia com uma saudação",
    testar: (mensagem) => {
      const inicio = mensagem.trim().toLowerCase();
      const saudacoes = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "prezado", "prezada"];
      return saudacoes.some((s) => inicio.startsWith(s));
    },
  },

  {
    id: "tamanho_adequado",
    tipo: "acerto",
    peso: 5,
    mensagem: "Tamanho da mensagem está adequado (nem curta nem longa demais)",
    testar: (mensagem) => {
      const tamanho = mensagem.trim().length;
      return tamanho >= 20 && tamanho <= 500;
    },
  },

  // ---------- PROBLEMAS (tiram pontos) ----------

  {
    id: "mensagem_vazia",
    tipo: "problema",
    peso: 100, // zera a nota, pois não há o que validar
    mensagem: "A mensagem está vazia",
    testar: (mensagem) => mensagem.trim().length === 0,
  },

  {
    id: "caps_lock_excessivo",
    tipo: "problema",
    peso: 15,
    mensagem: "Uso excessivo de letras maiúsculas (parece que está gritando)",
    testar: (mensagem) => {
      const letras = mensagem.replace(/[^a-zA-ZÀ-ÿ]/g, "");
      if (letras.length < 5) return false; // texto curto demais pra avaliar
      const maiusculas = letras.replace(/[^A-ZÀ-Ý]/g, "");
      return maiusculas.length / letras.length > 0.6;
    },
  },

  {
    id: "excesso_exclamacao",
    tipo: "problema",
    peso: 10,
    mensagem: "Uso excessivo de pontos de exclamação",
    testar: (mensagem) => {
      const qtd = (mensagem.match(/!/g) || []).length;
      return qtd >= 3;
    },
  },

  {
    id: "mensagem_muito_curta",
    tipo: "problema",
    peso: 10,
    mensagem: "Mensagem muito curta, pode parecer seca ou incompleta",
    testar: (mensagem) => mensagem.trim().length > 0 && mensagem.trim().length < 10,
  },

  {
    id: "mensagem_muito_longa",
    tipo: "problema",
    peso: 10,
    mensagem: "Mensagem muito longa, considere dividir em partes",
    testar: (mensagem) => mensagem.trim().length > 800,
  },

  {
    id: "links_suspeitos",
    tipo: "problema",
    peso: 20,
    mensagem: "Contém links, verifique se são confiáveis antes de enviar",
    testar: (mensagem) => /https?:\/\/|www\./i.test(mensagem),
  },

  // ---------- SUGESTÕES (não afetam a nota, só orientam) ----------

  {
    id: "sugestao_sem_despedida",
    tipo: "sugestao",
    peso: 0,
    mensagem: "Considere finalizar com uma despedida cordial (ex: 'Att,' ou 'Abraços')",
    testar: (mensagem) => {
      const fim = mensagem.trim().toLowerCase();
      const despedidas = ["att", "atenciosamente", "abraço", "obrigad", "grato", "grata"];
      return !despedidas.some((d) => fim.includes(d));
    },
  },

  {
    id: "sugestao_revisar_pontuacao",
    tipo: "sugestao",
    peso: 0,
    mensagem: "Revise a pontuação, a mensagem não termina com ponto final ou similar",
    testar: (mensagem) => {
      const texto = mensagem.trim();
      if (texto.length === 0) return false;
      const ultimoChar = texto[texto.length - 1];
      return ![".", "!", "?"].includes(ultimoChar);
    },
  },
  {
    id: "termos_proibidos_meta",
    tipo: "problema",
    peso: 25,
    mensagem: "Mensagem contém termos que podem violar políticas da Meta/WhatsApp",
    testar: (mensagem) => {
      const texto = mensagem.toLowerCase();
      const termos = [
        "acao judicial",
"acesso bloqueado",
"advertencia",
"advertência",
"agora mesmo",
"bloqueado",
"bloquearemos",
"bloquear",
"bloqueio",
"bloqueio",
"cancelado",
"cancelamento",
"cancelamento",
"cancelar",
"cancelaremos",
"caso contrario",
"caso contrário",
"cobranca extrajudicial",
"cobranca judicial",
"cobrança extrajudicial",
"cobrança extrajudicial",
"cobrança judicial",
"compareca imediatamente",
"compareça imediatamente",
"debito",
"debito pendente",
"débito",
"débito pendente",
"descumprimento",
"divida",
"dívida",
"efetue o pagamento",
"evite problemas",
"execucao",
"execução",
"execução",
"extrajudicial",
"imediatamente",
"imediatamente",
"inadimplencia",
"inadimplência",
"inadimplente",
"irregular",
"irregularidade",
"juros",
"multa",
"multa",
"multado",
"nao ignore",
"nao responder",
"negativacao",
"negativado",
"negativado",
"negativação",
"negativar",
"não ignore",
"não responder",
"obrigatorio",
"obrigatório",
"pagamento imediato",
"pague agora",
"pague hoje",
"penalidade",
"penalidade",
"pendencia",
"pendência",
"penhora",
"prazo encerrado",
"prazo expirado",
"prazo final",
"processo judicial",
"protestado",
"protesto",
"protesto",
"regularize agora",
"regularize imediatamente",
"restricao",
"restrição",
"restrição",
"restrito",
"risco",
"sancao",
"sanção",
"sanção",
"sem acesso",
"sem acesso",
"suspensao",
"suspensão",
"suspensão",
"ultima chance",
"ultima oportunidade",
"ultimo aviso",
"ultimo lembrete",
"urgencia",
"urgente",
"urgente",
"urgência",
"vencido",
"vencimento hoje",
"última chance",
"última chance",
"última oportunidade",
"último aviso",
"último aviso",
"último lembrete",
////////////////////////////////////////////////////////////////
"ACÃO JUDICIAL",
"ACAO JUDICIAL",
"ACESSO BLOQUEADO",
"ACESSE ESTE LINK",
"ADVERTENCIA",
"ADVERTÊNCIAS",
"ADVERTENCIAS",
"ADVERTÊNCIA",
"AGORA MESMO",
"ATUALIZE SEUS DADOS",
"BLOQUEADA",
"BLOQUEADO",
"BLOQUEAR",
"BLOQUEAREMOS",
"BLOQUEIO",
"CANCELADA",
"CANCELADO",
"CANCELAMENTO",
"CANCELAR",
"CANCELAREMOS",
"CASO CONTRARIO",
"CASO CONTRÁRIO",
"CLIQUE AQUI",
"COBRANCA EXTRAJUDICIAL",
"COBRANCA JUDICIAL",
"COBRANÇA EXTRAJUDICIAL",
"COBRANÇA JUDICIAL",
"CODIGO DE VERIFICACAO",
"COMPARECA IMEDIATAMENTE",
"COMPAREÇA IMEDIATAMENTE",
"CONFIRME SEU CPF",
"CONFIRME SEUS DADOS",
"CONFIRME SUA SENHA",
"CONTA BLOQUEADA",
"CONTA SUSPENSA",
"CÓDIGO DE VERIFICAÇÃO",
"DÉBITO",
"DÉBITOS",
"DEBITO",
"DEBITOS",
"DIVIDA",
"DIVIDAS",
"DÍVIDA",
"DÍVIDAS",
"EFETUE O PAGAMENTO",
"ENVIE SEUS DADOS",
"EXECUCAO",
"EXECUÇÃO",
"EXTRAJUDICIAL",
"EVITE PROBLEMAS",
"EVITE TRANSTORNOS",
"IMEDIATAMENTE",
"INADIMPLENCIA",
"INADIMPLENTE",
"INADIMPLÊNCIA",
"IRREGULAR",
"IRREGULARIDADE",
"IRREGULARIDADES",
"JURO",
"JUROS",
"MORA",
"MULTA",
"MULTADA",
"MULTADO",
"NAO IGNORE",
"NEGATIVACAO",
"NEGATIVADA",
"NEGATIVADO",
"NEGATIVAR",
"NEGATIVAÇÃO",
"NÃO IGNORE",
"PAGAMENTO IMEDIATO",
"PAGAMENTO OBRIGATORIO",
"PAGAMENTO OBRIGATÓRIO",
"PAGUE AGORA",
"PAGUE HOJE",
"PENDENCIA",
"PENDENCIAS",
"PENDÊNCIA",
"PENDÊNCIAS",
"PENALIDADE",
"PENALIDADES",
"PENHORA",
"PENHORADA",
"PENHORADO",
"PERDERA O ACESSO",
"PERDERÁ O ACESSO",
"PIX OBRIGATORIO",
"PIX OBRIGATÓRIO",
"PRAZO ENCERRADO",
"PRAZO ESGOTADO",
"PRAZO EXPIRADO",
"PRAZO FINAL",
"PROCESSO JUDICIAL",
"PROTESTO",
"PROTESTADA",
"PROTESTADO",
"PUNICAO",
"PUNICOES",
"PUNIÇÃO",
"PUNIÇÕES",
"QUITE SUA DIVIDA",
"QUITE SUA DÍVIDA",
"REALIZE O PAGAMENTO",
"REGULARIZACAO",
"REGULARIZAÇÃO",
"REGULARIZE",
"REGULARIZE AGORA",
"REGULARIZE IMEDIATAMENTE",
"RESPONDA AGORA",
"RESPONDA IMEDIATAMENTE",
"RESTRICAO",
"RESTRICOES",
"RESTRIÇÃO",
"RESTRIÇÕES",
"RESTRITA",
"RESTRITO",
"RISCO",
"SANCAO",
"SANCOES",
"SANÇÃO",
"SANÇÕES",
"SEM ACESSO",
"SENHA",
"SERASA",
"SOB PENA",
"SPC",
"SUSPENSA",
"SUSPENSAO",
"SUSPENSO",
"SUSPENSÃO",
"TOKEN",
"ULTIMA CHANCE",
"ULTIMA OPORTUNIDADE",
"ULTIMO AVISO",
"URGENTE",
"URGENTE!",
"URGENTISSIMO",
"URGENTÍSSIMO",
"ÚLTIMA CHANCE",
"ÚLTIMA OPORTUNIDADE",
"ÚLTIMO AVISO",
"VENCE HOJE",
"VENCIDA",
"VENCIDO",
"VENCIMENTO HOJE",

      ];  
       const encontrados = termos.filter((termo) => texto.includes(termo));
      return encontrados.length > 0 ? encontrados : false;
    },
  },

];
