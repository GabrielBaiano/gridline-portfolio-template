# Gridline Portfolio Template

Um template de portfólio para desenvolvedores com estética minimalista arquitetural, construído com **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS** e **TypeScript**.

Conta com grid dashed de 690px centralizado, sintetizador de som nativo via Web Audio API (zero dependências de áudio ou arquivos MP3 pesados), heatmap de contribuições em Server Component, micro-interações táteis de aplausos, leitor de artigos de blog com code blocks, easter egg do jogo Snake e integração pronta para Vercel.

---

## ⚡ Funcionalidades

- **Design Grid Arquitetural**: Container de 690px centralizado com bordas pontilhadas lineares (`repeating-linear-gradient`), banners em dot-grid no topo e rodapé.
- **Engine de Som Tátil (Web Audio API)**: Sons sintetizados em memória (PCM AudioBuffers) com latência zero. Micro-sons para hover (`tick`), clique mecânico (`press`), switches (`toggle`), recompensas (`chime`) e som de limite excedido (`error`).
- **Botão de Aplausos com Partículas**: Sistema de claps com animação flutuante de `+1`, limite de 10 claps por leitor com feedback tátil (o botão treme, fica vermelho e toca som de negado ao bater o limite).
- **Activity Calendar Otimizado**: Heatmap estilo GitHub gerado em build-time como React Server Component (0 KB de JSON enviado ao cliente), com suporte a arrastar/rolar no mobile.
- **Blog Técnico com SSG**: Páginas dedicadas (`/blog/[slug]`), blocos de código com cópia de 1 clique, estimativa de leitura, feed RSS (`/feed.xml`) e `sitemap.xml`.
- **Easter Eggs Retrô**:
  - **Snake Game** no banner do topo (clique triplo).
  - **Space Invaders** no banner do rodapé (clique triplo com aliens animados, disparos de laser, partículas e placar).
  - Suportam teclado (setas/WASD/Espaço) e mouse/touch no mobile.
- **Agendamento Rápido**: Botão "Book a call" integrado direto com seu link do [Cal.com](https://cal.com).
- **Full Dark / Light Mode**: Alternador de tema persistido no `localStorage`.

---

## 🚀 Como Rodar Localmente

### 1. Pré-requisitos
- Node.js 18.18+ (recomendado Node 20+)
- pnpm (recomendado), npm ou yarn

### 2. Clonar e Instalar

```bash
git clone https://github.com/GabrielBaiano/gridline-portifolio-template.git
cd gridline-portifolio-template

# Instale as dependências
pnpm install
```

### 3. Configurar Variáveis de Ambiente (Opcional)

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

### 4. Executar em Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🌐 Como Colocar no Ar (Deploy na Vercel)

O template foi projetado para deploy com 1 clique na [Vercel](https://vercel.com) com custo zero.

### Passo 1: Subir o Código no GitHub
Se ainda não fez fork ou push para seu próprio repositório:
```bash
git add .
git commit -m "feat: meu portfolio personalizado"
git push origin main
```

### Passo 2: Importar na Vercel
1. Acesse o dashboard da [Vercel](https://vercel.com) e clique em **Add New... > Project**.
2. Conecte sua conta do GitHub e selecione o repositório do seu portfólio.
3. As configurações padrão já são detectadas automaticamente:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build` (ou `pnpm build`)
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

### Passo 3: Configurar as Environment Variables (Keys)

Na tela de importação (ou em **Settings > Environment Variables** do seu projeto na Vercel):

```ini
# URL do seu domínio ou subdomínio da Vercel (usado para canonical URLs, Sitemap e RSS)
NEXT_PUBLIC_SITE_URL=https://seu-portfolio.vercel.app

# (OPCIONAL) Upstash Redis para persistência global de Views e Claps
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

Clique em **Deploy**. Em cerca de 1 a 2 minutos o site estará online!

---

## 🔑 Variáveis de Ambiente e Coisas Opcionais

O site **funciona 100% mesmo se você NÃO configurar nenhuma variável**. Porém, aqui está o que cada uma faz:

### 1. `NEXT_PUBLIC_SITE_URL` *(Recomendado)*
- **Para que serve**: Define a URL canônica usada para gerar o `sitemap.xml` e o feed RSS (`/feed.xml`).
- **Padrão**: Se omitido, utiliza `https://gabrielbaiano.dev`.
- **Exemplo**: `https://meunome.dev` ou `https://meu-portfolio.vercel.app`.

### 2. `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` *(Opcional - Contador Persistente)*
- **Para que serve**: Como a Vercel roda em arquitetura Serverless, a memória das rotas de API (`/api/visitors` e `/api/claps`) é efêmera e reseta quando a função entra em cold boot. Se você quiser que o contador de visualizações do site e os claps dos artigos fiquem **persistidos globalmente e acumulados para sempre**, você usa o Redis gratuito da Upstash.
- **É de graça?**: Sim! A Upstash oferece plano gratuito com até 10.000 requisições por dia (mais que suficiente para portfólios pessoais).
- **Como obter as chaves**:
  1. Entre em [upstash.com](https://upstash.com) e crie uma conta gratuita com seu GitHub.
  2. Clique em **Create Database**, escolha um nome (ex: `portfolio-redis`) e a região mais próxima (ex: `sa-east-1` ou `us-east-1`).
  3. No painel do banco criado, role até a seção **REST API**.
  4. Copie o `UPSTASH_REDIS_REST_URL` e o `UPSTASH_REDIS_REST_TOKEN` e cole nas variáveis da Vercel.
  *(Dica: você também pode instalar a integração oficial da Upstash diretamente no Marketplace da Vercel com 1 clique).*

### 3. Integração de Reunião com Cal.com *(Opcional)*
- **Para que serve**: O botão no topo da página permite que recrutadores ou clientes agendem uma call com você diretamente.
- **É de graça?**: Sim, o [Cal.com](https://cal.com) é gratuito e open source.
- **Como configurar**: Crie seu usuário no Cal.com e defina a URL em `src/data/portfolio.ts`:
  ```ts
  personal: {
    calendarUrl: "https://cal.com/seu-usuario",
  }
  ```
  Se você não quiser o botão de booking, basta deixar `calendarUrl: ""` ou remover a propriedade que o botão não será exibido.

---

## 🛠️ Personalização do Conteúdo

Todo o conteúdo do site fica centralizado em um único arquivo:

👉 **`src/data/portfolio.ts`** (também exportado na raiz como `portfolio.config.ts`).

### O que você pode alterar:
- **`personal`**:
  - `name`: Seu nome ou pseudônimo (ex: `GabrielBaiano`).
  - `role`: Seu cargo / especialidade (ex: `Frontend Engineer`).
  - `avatar`: Caminho da sua foto (coloque seu arquivo em `/public/images/logo/avatar.jpg`).
  - `statusBadge`: Status de trabalho (ex: `Open for opportunities`).
  - `bio`: Parágrafos da sua biografia.
  - `email`: Seu e-mail de contato.
  - `calendarUrl`: Seu link de agendamento (ex: `https://cal.com/...`).
- **`socials`**: Suas redes (GitHub, LinkedIn, X/Twitter, etc.).
- **`experiences`**: Histórico profissional com período, cargo, empresa, resumo e tags de tecnologias.
- **`projects`**: Seus projetos com título, descrição, tecnologias, links de preview e repositório, e página interna de detalhes.
- **`blogs`**: Artigos técnicos completos com seções, snippets de código (`CodeBlock`) e tags.
- **`skills`**: Suas habilidades técnicas categorizadas.

---

## 🎮 Easter Eggs Retrô (Minigames)

Ambos os banners de dot-grid contêm minigames retrô secretos renderizados em HTML5 Canvas sobre o fundo pontilhado:

### 1. Snake Game (Banner do Topo)
- **Como ativar**: Dê um **clique triplo rápido** (3 cliques em menos de 750ms) no banner do topo.
- **Controles**: Setas ou `W, A, S, D` no teclado; gestos swipe no celular.
- **Sair**: Tecla `Esc` ou botão `✕`.

### 2. Space Invaders (Banner do Rodapé)
- **Como ativar**: Dê um **clique triplo rápido** no banner inferior do rodapé.
- **Mecânicas**:
  - Canhão laser do jogador com controle horizontal.
  - Frotas de aliens animados (Crab e Squid) com descida progressiva e cadência acelerada.
  - Lasers dos aliens com sistema de vidas (3 vidas) e piscar de invulnerabilidade.
  - Placar em tempo real (`SCORE`), explosões de fagulhas em pixel art e áudio sintetizado.
- **Controles no PC**:
  - Mover: `← / →` ou `A / D` (ou arraste do mouse).
  - Atirar: Barra de `Espaço`, `W` ou clique/tap do mouse.
  - Sair: Tecla `Esc` ou botão `ESC ✕`.
- **Controles no Celular**: Toque e arraste para mover o canhão e disparar.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor local de desenvolvimento na porta 3000 |
| `pnpm build` | Compila o build de produção otimizado com SSG |
| `pnpm start` | Inicia o servidor com o build de produção localmente |
| `pnpm tsc --noEmit` | Validação estática de tipos TypeScript |

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE). Sinta-se livre para usar, clonar e modificar para seu próprio portfólio.
