# Tutorial — como rodar o site *Thorn*

Este guia mostra, passo a passo, como baixar o projeto, abrir o site no seu computador, rodar os testes e gerar a versão final para publicar. Os comandos funcionam no Windows (PowerShell ou Git Bash), no macOS e no Linux.

---

## 1. O que você precisa instalar (uma vez só)

| Programa | Para quê | Onde baixar |
|---|---|---|
| **Node.js 20.19 ou mais recente** (recomendado: a versão LTS) | roda o site e os scripts | <https://nodejs.org> |
| **Git** | baixa e envia o código para o GitHub | <https://git-scm.com> |
| **GitHub CLI** (opcional) | facilita o login no GitHub | <https://cli.github.com> |

Depois de instalar, abra um terminal e confira:

```bash
node -v
```

```bash
npm -v
```

O primeiro comando deve mostrar `v20.19` ou um número maior (por exemplo, `v22.x` ou `v24.x`).

---

## 2. Baixar o projeto

O repositório é **privado**, então primeiro faça login no GitHub com a conta que tem acesso:

```bash
gh auth login
```

Depois clone o projeto e entre na pasta:

```bash
git clone https://github.com/edpl22/advanced-english-book.git
```

```bash
cd advanced-english-book
```

> Já tem a pasta no computador? Pule este passo e só entre nela com `cd`.

---

## 3. Instalar as dependências

Dentro da pasta do projeto:

```bash
npm install
```

Isso cria a pasta `node_modules/` (pode levar um ou dois minutos na primeira vez). Só é preciso repetir quando o `package.json` mudar.

---

## 4. Abrir o site em modo de desenvolvimento

```bash
npm run dev
```

O terminal vai mostrar algo como:

```
VITE v7  ready in 600 ms
➜  Local:   http://localhost:5173/
```

Abra esse endereço no navegador. Enquanto o comando estiver rodando, qualquer arquivo que você salvar atualiza a página sozinho. Para parar, aperte **Ctrl + C** no terminal.

### O que tem no site

| Aba | Conteúdo |
|---|---|
| **The Book** | 29 unidades de gramática e vocabulário, cada uma com explicação, exemplos, erros comuns, foco em provas, exercícios e revisão |
| **Daily Challenge** | 10 questões por dia, de 10 tópicos sorteados (iguais para todos na mesma data). Fazer todos os dias mantém o streak, que zera se você pular um dia |
| **Practice Tests** | simulados montados a partir do banco (mais de 3000 pontos) e dos geradores, filtrando por nível, tópico, tipo de questão e prova (inclusive vestibulares militares) |
| **TOEFL Simulator** | 6 simulados completos no formato de 2026, além da prática de uma tarefa por vez |
| **Lexicon** | 1000 palavras raras com IPA, etimologia, exemplo e o jogo *Real or Fake?* |
| **Old & Middle English** | linha do tempo, letras antigas, textos e um quiz com 153 perguntas |
| **My Progress** | seu histórico, que fica salvo só no navegador (localStorage) |

---

## 5. Rodar os testes e as verificações de conteúdo

```bash
npm test
```

Roda cerca de 2.900 testes automáticos: correção de respostas, geradores de exercícios, unidades, TOEFL e Lexicon.

```bash
npm run bank:validate
```

Confere o banco de questões e os textos de leitura: formato, gabaritos e questões duplicadas.

```bash
npm run bank:stats
```

Mostra o total de itens por tópico, nível, tipo e prova, e diz se cada meta do projeto foi atingida.

```bash
npm run typecheck
```

Verifica os tipos do TypeScript.

---

## 6. Gerar a versão final (produção)

```bash
npm run build
```

Os arquivos prontos vão para a pasta `dist/`. Para conferir essa versão no navegador:

```bash
npm run preview
```

Abra o endereço que aparecer (normalmente `http://localhost:4173`).

O site é **estático**. A navegação usa `#/` nos endereços e os caminhos são relativos, então a pasta `dist/` funciona em qualquer hospedagem de arquivos estáticos (GitHub Pages, Netlify, Vercel, um servidor comum) sem configuração extra. Depois da primeira visita, um *service worker* deixa o site funcionando também **offline**.

> **Site no ar:** <https://edpl22.github.io/advanced-english-book/>. A cada `git push` na branch `main`, o GitHub Actions roda os testes, gera o build e publica a nova versão sozinho (veja a aba *Actions* do repositório). O arquivo do fluxo é `.github/workflows/deploy.yml`.

---

## 7. Salvar e enviar alterações para o GitHub

```bash
git add -A
```

```bash
git commit -m "Descreva aqui o que mudou"
```

```bash
git push
```

Para baixar alterações feitas em outro computador:

```bash
git pull
```

---

## 8. Onde fica cada coisa

```
content/            todo o conteúdo do livro
  units/            as 29 unidades (u01-…ts a u29-…ts)
  bank/<tópico>/    lotes do banco de questões (JSON)
  reading/          60 textos de leitura (r001.json … r060.json)
  lexicon/          as 1000 entradas do Lexicon
  medieval/         Old & Middle English
  toefl/            simulados TOEFL, banco de prática e toefl.config.ts
src/
  features/         uma pasta por aba do site
  lib/checking/     correção automática das respostas
  lib/generators/   geradores de exercícios ilimitados
  styles/           estilos visuais (aparência de livro)
scripts/            bank:stats, bank:validate e bank:balance
```

---

## 9. Problemas comuns

| Sintoma | Solução |
|---|---|
| `'npm' não é reconhecido` | O Node.js não está instalado ou o terminal foi aberto antes da instalação. Instale o Node e abra um terminal novo. |
| `Port 5173 is in use` | Já existe outro `npm run dev` rodando. Feche-o com Ctrl + C ou use o endereço que o Vite sugerir. |
| Erro de versão do Node ao rodar o Vite | Atualize o Node para a versão 20.19 ou mais recente. |
| A página não mostra uma mudança | Recarregue com Ctrl + Shift + R. Se for a versão de `preview`, rode `npm run build` de novo. |
| Quero apagar meu progresso | Na aba **My Progress**, use “reset everything” (exporte antes, se quiser guardar uma cópia). |
| `git push` pede login | Rode `gh auth login` e escolha HTTPS. |
