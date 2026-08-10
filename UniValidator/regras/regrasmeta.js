export const regrasMeta = [

{
id:"palavra_bloqueado",
tipo:"problema",
peso:20,
mensagem:"Evite utilizar a palavra 'bloqueado'.",
testar:(m)=>/\bbloqueado\b/i.test(m)
},

{
id:"palavra_bloqueio",
tipo:"problema",
peso:20,
mensagem:"Evite utilizar a palavra 'bloqueio'.",
testar:(m)=>/\bbloqueio\b/i.test(m)
},

{
id:"palavra_negativado",
tipo:"problema",
peso:25,
mensagem:"Evite mencionar negativação pelo WhatsApp.",
testar:(m)=>/negativad/i.test(m)
},

{
id:"palavra_multa",
tipo:"problema",
peso:15,
mensagem:"Evite utilizar a palavra 'multa'.",
testar:(m)=>/\bmulta\b/i.test(m)
},

{
id:"palavra_penalidade",
tipo:"problema",
peso:15,
mensagem:"Evite utilizar 'penalidade'.",
testar:(m)=>/\bpenalidade\b/i.test(m)
},

{
id:"palavra_execucao",
tipo:"problema",
peso:25,
mensagem:"Evite mencionar execução judicial.",
testar:(m)=>/execuç[aã]o|execucao/i.test(m)
},

{
id:"palavra_acao_judicial",
tipo:"problema",
peso:30,
mensagem:"Evite mencionar ação judicial.",
testar:(m)=>/ação judicial|acao judicial/i.test(m)
},

{
id:"palavra_extrajudicial",
tipo:"problema",
peso:25,
mensagem:"Evite mencionar cobrança extrajudicial.",
testar:(m)=>/extrajudicial/i.test(m)
},

{
id:"palavra_suspensao",
tipo:"problema",
peso:15,
mensagem:"Evite utilizar suspensão.",
testar:(m)=>/suspens[aã]o/i.test(m)
},

{
id:"palavra_cancelamento",
tipo:"problema",
peso:10,
mensagem:"Evite utilizar cancelamento de forma ameaçadora.",
testar:(m)=>/\bcancelamento\b/i.test(m)
},

{
id:"palavra_sem_acesso",
tipo:"problema",
peso:10,
mensagem:"Evite utilizar 'sem acesso'.",
testar:(m)=>/sem acesso/i.test(m)
},

{
id:"palavra_urgente",
tipo:"problema",
peso:8,
mensagem:"Evite utilizar 'URGENTE'.",
testar:(m)=>/\burgente\b/i.test(m)
},

{
id:"palavra_imediatamente",
tipo:"problema",
peso:8,
mensagem:"Evite utilizar 'imediatamente'.",
testar:(m)=>/imediatamente/i.test(m)
},

{
id:"ultima_chance",
tipo:"problema",
peso:12,
mensagem:"Evite utilizar 'última chance'.",
testar:(m)=>/última chance|ultima chance/i.test(m)
},

{
id:"ultimo_aviso",
tipo:"problema",
peso:12,
mensagem:"Evite utilizar 'último aviso'.",
testar:(m)=>/último aviso|ultimo aviso/i.test(m)
},

{
id:"pague_agora",
tipo:"problema",
peso:15,
mensagem:"Evite utilizar 'pague agora'.",
testar:(m)=>/pague agora/i.test(m)
},

{
id:"nao_ignore",
tipo:"problema",
peso:12,
mensagem:"Evite utilizar 'não ignore'.",
testar:(m)=>/não ignore|nao ignore/i.test(m)
},

{
id:"muitas_exclamacoes",
tipo:"problema",
peso:5,
mensagem:"Há muitas exclamações.",
testar:(m)=>(m.match(/!/g)||[]).length>=3
},

{
id:"muitas_interrogacoes",
tipo:"problema",
peso:5,
mensagem:"Há muitas interrogações.",
testar:(m)=>(m.match(/\?/g)||[]).length>=3
},

{
id:"caps_lock",
tipo:"problema",
peso:10,
mensagem:"Há excesso de letras maiúsculas.",
testar:(m)=>{
const letras=m.replace(/[^a-zA-ZÀ-ÿ]/g,"");
if(letras.length<15) return false;
const maiusculas=letras.replace(/[^A-ZÀ-Ý]/g,"");
return (maiusculas.length/letras.length)>0.35;
}
},

{
id:"muitos_links",
tipo:"problema",
peso:10,
mensagem:"Há muitos links.",
testar:(m)=>{
const links=m.match(/https?:\/\/|www\./gi)||[];
return links.length>2;
}
},

{
id:"muitos_emojis",
tipo:"problema",
peso:5,
mensagem:"Há emojis em excesso.",
testar:(m)=>{
const emojis=(m.match(/😀|😁|😂|🤣|😊|😍|👍|👏|🙏|❤️|❤|✔️|✅|⚠️|🚨|📢|📲|📞|💰|💳|🎓|📚|📄|📌/g)||[]);
return emojis.length>5;
}
},

{
id:"texto_muito_longo",
tipo:"problema",
peso:10,
mensagem:"Mensagem muito longa.",
testar:(m)=>m.length>1200
},

{
id:"texto_muito_curto",
tipo:"problema",
peso:8,
mensagem:"Mensagem muito curta.",
testar:(m)=>m.trim().length<20
},

{
id:"letras_repetidas",
tipo:"problema",
peso:5,
mensagem:"Há letras repetidas em excesso.",
testar:(m)=>/(.)\1{4,}/i.test(m)
},

{
id:"pontuacao_repetida",
tipo:"problema",
peso:5,
mensagem:"Há pontuação repetida em excesso.",
testar:(m)=>/!{3,}|\?{3,}|\.{5,}/.test(m)
},

{
id:"muitos_valores",
tipo:"problema",
peso:8,
mensagem:"Há excesso de referências financeiras.",
testar:(m)=>{
const ocorrencias=m.match(/R\$|pix|boleto|pagamento|valor/gi)||[];
return ocorrencias.length>5;
}
}

];