<p align="center">
  <img src="public/images/logo/template-icon.png" alt="Gridline Portfolio Template" width="120"/>
</p>

# Gridline Portfolio Template

Template minimalista de portfólio para desenvolvedores com grade arquitetural tracejada, microinterações sonoras com Web Audio, calendário de contribuições e minigames retrô em canvas. Construído com Next.js 15, React 19, TypeScript e Tailwind CSS.

[English](README.md) · [Português](README.pt.md) · [Demonstração ao Vivo](https://gabrielbaiano.vercel.app/) · [Usar Template](https://github.com/GabrielBaiano/gridline-portfolio-template/generate)

---

## Início Rápido

Para começar com o template limpo e sem dados pessoais, clone a branch [`template`](https://github.com/GabrielBaiano/gridline-portfolio-template/tree/template):

```bash
git clone -b template https://github.com/GabrielBaiano/gridline-portfolio-template.git meu-portfolio
cd meu-portfolio
pnpm install
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Personalização

Todo o conteúdo (bio, redes sociais, experiências, projetos, artigos do blog, skills) fica concentrado em um único arquivo:

```
src/data/portfolio.ts
```

Edite esse arquivo para substituir os dados mockados pelos seus.

## Funcionalidades

- **Grade Arquitetural**: Container de 690px com bordas tracejadas e banners interativos em dot-grid.
- **Efeitos Sonoros Web Audio**: Síntese de áudio nativa no navegador sem arquivos de áudio externos.
- **Calendário de Atividades**: Heatmap estilo GitHub gerado no build.
- **Blog Técnico**: Seções com blocos de código formatados e contador de palmas persistente.
- **Easter Eggs Retrô**: Clique triplo no banner superior abre o Snake; no banner inferior abre o Space Invaders.
- **Dark Mode**: Alternância de tema persistida com detecção automática do sistema.

## Deploy

Deploy direto na Vercel:

1. Suba o repositório para o seu GitHub.
2. Importe o projeto no painel da Vercel.
3. (Opcional) Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SITE_URL`: Seu domínio de produção (para SEO e feed RSS).
   - `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`: Credenciais Upstash Redis para persistir visitas e palmas entre restarts serverless. Sem elas, roda em memória.

## Licença

[MIT](LICENSE)
