/*
  ===========================================================
  ÍNDICE DE CATEGORIAS
  ===========================================================
  Junta todas as regras específicas de cada categoria em um
  único objeto, usando a "key" igual ao value do <select> no
  index.html. É esse objeto que o motor de validação consulta
  pra saber quais regras extras aplicar.

  Quando criar uma nova categoria:
  1. Crie o arquivo regras/categorias/novaCategoria.js
  2. Importe aqui embaixo
  3. Adicione a entrada no objeto "regrasPorCategoria"
  4. Adicione a <option> correspondente no index.html
*/

import { regrasFinanceiro } from "./financeiro.js";
import { regrasRelacionamento } from "./relacionamento.js";
import { regrasSecretaria } from "./secretaria.js";
import { regrasComercial } from "./comercial.js";
import { regrasOutros } from "./outros.js";

export const regrasPorCategoria = {
  financeiro: regrasFinanceiro,
  relacionamento: regrasRelacionamento,
  secretaria: regrasSecretaria,
  comercial: regrasComercial,
  outros: regrasOutros,
};