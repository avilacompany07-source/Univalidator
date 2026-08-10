import { sugestoesFinanceiro } from "./financeiro.js";
import { sugestoesRelacionamento } from "./relacionamento.js";
import { sugestoesSecretaria } from "./secretaria.js";
import { sugestoesComercial } from "./comercial.js";

export const sugestoesPorCategoria = {
    financeiro: sugestoesFinanceiro,
    relacionamento: sugestoesRelacionamento,
    secretaria: sugestoesSecretaria,
    comercial: sugestoesComercial,
    outros: []
};
