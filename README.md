# 📚 English Club da Gabi

Plataforma web **responsiva** (celular e computador) para os alunos de **inglês básico** da professora Gabi.
O aluno pesquisa e assiste vídeos de inglês básico e faz exercícios; a professora escolhe o conteúdo.

Feito com **HTML + CSS + JavaScript puro** — não precisa instalar nada nem ter servidor. É só abrir o `index.html`.

---

## ▶️ Como abrir

**Jeito mais fácil:** dê **dois cliques** no arquivo `index.html`. Ele abre no seu navegador.

> Dica: use **Google Chrome**, **Edge** ou **Firefox** atualizados.

Para instalar no celular como um "app" (ícone na tela inicial), veja a seção **Hospedar online** abaixo.

---

## 🔑 Acessos padrão

O site tem dois modos, escolhidos na tela de login:

| Modo | Usuário | Senha | O que faz |
|------|---------|-------|-----------|
| 👩‍🏫 **Professora (admin)** | `gabi` | `gabi123` | Escolhe o conteúdo, adiciona vídeos, cria os alunos e acompanha o progresso |
| 👦 **Aluno (teste)** | `aluno` | `aluno123` | Assiste vídeos, estuda o vocabulário e faz os exercícios |

> ⚠️ **Troque a senha da professora** logo no primeiro acesso, em **Config → Minha senha**.

---

## 👩‍🏫 O que a professora pode fazer (modo Admin)

- **Conteúdo:** marcar unidades como ★ recomendadas, **adicionar vídeos do YouTube** (é só colar o link) e criar/remover exercícios de cada unidade.
- **Alunos:** criar o acesso (usuário e senha) de cada aluno, redefinir senha e excluir.
- **Turma:** acompanhar o progresso de cada aluno por unidade (% de acertos).
- **Config:** trocar a própria senha, mudar o tema, **exportar/importar** o conteúdo e restaurar/limpar dados.

## 👦 O que o aluno pode fazer (modo Aluno)

- **Início:** boas-vindas, resumo do progresso e conteúdo recomendado pela Gabi.
- **Vídeos:** **pesquisar vídeos** de inglês básico na biblioteca e assistir dentro do app; botão para **buscar mais no YouTube**.
- **Tarefas:** escolher uma aula e, em cada uma:
  - 📖 estudar o **vocabulário** (com vocabulário corporativo/industrial);
  - 🎬 assistir aos **vídeos**;
  - 🎧 ouvir um **áudio** (pessoas conversando sobre o tema — o app fala com a voz do navegador) e fazer os **exercícios de áudio**;
  - 📖 fazer a **tarefa de reading** (texto curto + exercícios);
  - 📝 fazer os **exercícios** de gramática/vocabulário (correção na hora, com explicações em português).
- **Progresso:** ver tarefas concluídas, média de acertos e vídeos assistidos.

---

## 📦 O que já vem pronto

Conteúdo baseado na **Apostila de Inglês Básico — Inglês para o Ambiente Industrial (A1)** da Teacher Gabriella Ferraz. São as **10 aulas da apostila**, cada uma com vocabulário, **vídeos verificados** (testados: no ar e assistíveis dentro do app), **áudio com diálogo + exercícios de áudio**, **tarefa de reading + exercícios** e **exercícios** de gramática — tudo com foco no ambiente industrial (PPCP, Expedição, armazém):

1. 👋 The Alphabet & Greetings (Alfabeto e Cumprimentos)
2. 🔢 Numbers (Números)
3. 🗓️ Days, Months & Time (Dias, Meses e Horas)
4. 🪪 Personal Information — Verb *to be* (Informações Pessoais)
5. ⏰ Daily Routine — Present Simple (Rotina — Presente Simples)
6. 🏭 At the Workplace — There is / There are (No Trabalho)
7. 🎨 Describing People & Things (Descrevendo Pessoas e Coisas)
8. 🔧 Actions Now — Present Continuous (Presente Contínuo)
9. ⏮️ Talking About the Past (Passado)
10. 💬 Communication at Work — Can & Requests (Can e Pedidos)

**No total:** 25 vídeos verificados, 80 exercícios, 30 perguntas de áudio (listening) e 30 de reading — todos de correção automática. Os vídeos são de canais reconhecidos (BBC Learning English, Oxford Online English, Shaw English, EnglishClass101, Woodward English, entre outros).

> 🎧 **Sobre o áudio:** os diálogos são falados pela **voz do navegador** (Text-to-Speech). É automático e funciona offline; a qualidade da voz depende do navegador/sistema. Não são gravações de pessoas reais — para isso seria preciso subir arquivos de áudio.

> 📄 **Apostila em PDF:** o arquivo `Apostila_Ingles_Basico_A1.pdf` é a **versão do professor (com gabarito)** e por isso **não é incluído no repositório publicado** (fica só no seu computador). O conteúdo dela já está dentro do app.

---

## 🌐 Hospedar online (para os alunos acessarem pelo celular)

Abrindo só pelo `index.html`, cada aparelho é independente. Para os alunos acessarem por um **link**, publique a pasta (é grátis):

- **Netlify Drop** — acesse [app.netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta `App_ingles`. Você recebe um link na hora.
- **GitHub Pages** — suba a pasta num repositório e ative o Pages.
- **Vercel** — importe a pasta e publique.

Com o site publicado, no celular use **"Adicionar à tela de início"** (o app foi preparado como PWA) para virar um ícone.

---

## ⚠️ Importante saber (limitação e evolução)

Este app guarda os dados **no navegador de cada aparelho** (`localStorage`). Ou seja:

- O **conteúdo que já vem pronto** aparece para **todos** os alunos, em qualquer aparelho. ✅
- Os **acessos dos alunos, o progresso e os vídeos que a professora adicionar** ficam salvos **só naquele aparelho**. Eles **não** sincronizam sozinhos entre celulares.

**Como contornar hoje:** em **Config → Exportar conteúdo**, a professora gera um arquivo `.json` com suas unidades/vídeos e usa **Importar conteúdo** em outro aparelho.

**Para sincronizar de verdade** (todos os alunos e o progresso num único lugar, em tempo real), o próximo passo é ligar um banco de dados gratuito como o **Firebase** (Firestore + Authentication) ou o **Supabase**. A estrutura de dados do app (em `assets/js/store.js`) já é separada justamente para facilitar essa evolução. Posso implementar isso se você quiser.

> 🔒 **Sobre a senha:** por ser um app sem servidor, a autenticação é simples (as senhas são guardadas com hash SHA-256 no navegador). É ótimo para uso em sala de aula, mas **não** substitui um login de verdade com servidor. Não use senhas importantes.

---

## 🗂️ Estrutura dos arquivos

```
App_ingles/
├── index.html                 ← abra este arquivo
├── manifest.webmanifest       ← permite "instalar" no celular
├── README.md
└── assets/
    ├── css/styles.css         ← visual (responsivo, tema claro/escuro)
    ├── img/icon.svg           ← ícone do app
    └── js/
        ├── content.js         ← as 10 unidades, vídeos e exercícios
        ├── store.js           ← dados (localStorage) e senhas
        ├── auth.js            ← login
        └── app.js             ← telas e lógica do site
```

## ✏️ Como editar o conteúdo pelo código (opcional)

Quase tudo pode ser feito pelo **modo Professora**, sem mexer no código.
Se quiser editar direto, o conteúdo fica em `assets/js/content.js` (é bem organizado, com comentários explicando cada campo). Depois de editar, use **Config → Restaurar conteúdo original** para recarregar a nova versão.

---

Feito com carinho para ajudar os alunos da Gabi a aprender inglês. 💜
# english-club-gabi
