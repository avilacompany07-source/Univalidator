# UniValidator

**Validador de Mensagens Institucionais**

Ferramenta interna para auxiliar setores da instituição na revisão de
mensagens enviadas por WhatsApp. O objetivo é analisar mensagens e indicar
boas práticas de comunicação institucional e risco de denúncia.

> ⚠️ O UniValidator **não é um sistema oficial da Meta** e não possui
> qualquer tipo de aprovação, homologação ou vínculo com o WhatsApp ou a
> Meta. É uma ferramenta interna independente, criada apenas para apoio à
> revisão de texto antes do envio.

## O que ele faz

O usuário seleciona a categoria da mensagem (Financeiro, Relacionamento,
Secretaria, Comercial ou Outros), cola o texto e clica em **Validar**. O
sistema então analisa a mensagem e retorna:

- **Qualidade da comunicação** — nota de 0 a 100
- **Risco de denúncia** — 🟢 Baixo risco / 🟡 Médio risco / 🔴 Alto risco
- **Boas práticas institucionais** identificadas na mensagem
- **Problemas encontrados**
- **Sugestões** de melhoria

## Tecnologias

Projeto 100% em **HTML, CSS e JavaScript puro** (ES Modules). Sem React,
Vue, Angular, TypeScript ou qualquer framework/bundler.

## Estrutura de pastas

```
univalidator/
├── index.html              # Estrutura da tela
├── style.css                # Identidade visual (verde e preto)
├── script.js                 # Conecta a interface ao motor de validação
├── README.md
└── regras/
    ├── motor.js               # Executa as regras e calcula nota/status
    ├── regrasGerais.js         # Regras válidas para qualquer categoria
    └── categorias/
        ├── index.js              # Mapeia categoria -> array de regras
        ├── financeiro.js
        ├── relacionamento.js
        ├── secretaria.js
        ├── comercial.js
        └── outros.js
```

## Como rodar localmente

O `script.js` usa `type="module"`, então o navegador bloqueia a execução
se você abrir o `index.html` direto (`file://`). É preciso servir os
arquivos por um servidor local. Formas simples:

**Opção 1 — VSCode + Live Server**
1. Instale a extensão **Live Server**.
2. Clique com o botão direito em `index.html` → **"Open with Live Server"**.

**Opção 2 — Python** (se tiver instalado)
```bash
python -m http.server 5500
```
Depois acesse `http://localhost:5500` no navegador.

## Como adicionar uma nova regra de validação

Cada regra é um objeto neste formato:

```js
{
  id: "identificador_unico",
  tipo: "acerto" | "problema" | "sugestao",
  peso: 10, // quanto desconta da nota (só usado quando tipo = "problema")
  mensagem: "Texto exibido pro usuário",
  testar: (mensagem) => boolean, // retorna true se a regra "disparar"
}
```

- Regras que valem para **qualquer categoria** vão em
  `regras/regrasGerais.js`.
- Regras específicas de uma categoria vão no arquivo correspondente dentro
  de `regras/categorias/` (ex: `financeiro.js`).
- Para criar uma **categoria nova**, crie o arquivo em
  `regras/categorias/`, registre-o em `regras/categorias/index.js` e
  adicione a `<option>` correspondente no `index.html`.

Nenhum outro arquivo precisa ser alterado para adicionar regras — a
arquitetura foi pensada para isso.

## Terminologia utilizada

O sistema utiliza sempre os seguintes termos, evitando qualquer referência
a aprovação oficial de terceiros:

- Baixo risco / Médio risco / Alto risco
- Boas práticas institucionais
- Risco de denúncia
- Qualidade da comunicação

---

UniValidator • Uso interno Uniamérica
