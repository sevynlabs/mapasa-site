# Site institucional MAPASA — Eucaliptos & Planejados

Site multipágina em **Next.js 15 (App Router) + TypeScript + Tailwind CSS 4**, preparado para publicação na Vercel
ou em qualquer hospedagem comum (versão estática em HTML).
Identidade conforme Brandbook MAPASA 2026 (Verde Floresta, Marrom Cerne, Dourado Claro, Verde Eucalipto, Areia; Jost + Manrope).

> **Regra central do projeto:** nenhum dado comercial, foto, projeto ou depoimento fictício é publicado.
> Tudo o que ainda não foi confirmado aparece como pendência identificada ou simplesmente não é exibido.

---

## 1. Executar localmente

Requisitos: **Node.js 20 ou superior**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Verificações antes de publicar:

```bash
npm run typecheck  # checagem de tipos
npm run build         # build de produção para a Vercel / servidor Node
npm start             # serve o build de produção
npm run build:static  # gera out/ em HTML puro para hospedagens comuns (Hostinger, cPanel…)
```

---

## 2. Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Home fiel à referência visual (11 blocos) |
| `/eucalipto` | Benefícios, catálogo, aplicações, escolha presencial, como comprar, FAQ e formulário |
| `/moveis-planejados` | Introdução, ambientes, projetos, atendimento, processo (6 etapas), acabamentos*, depoimentos*, formulário |
| `/projetos` | Portfólio com filtros por categoria |
| `/projetos/[slug]` | Página individual — gerada **somente** para projetos reais aprovados |
| `/sobre` | Origem, evolução, valores, manifesto |
| `/contato` | Formulário com seletor de especialidade, canais oficiais e mapa* |
| `/privacidade` | Política de privacidade (aguardando texto aprovado) |
| 404 | Página de erro com navegação |

\* Seções exibidas automaticamente apenas quando houver dados confirmados.

---

## 3. Onde editar cada coisa

```
src/
├─ app/                    Páginas (rotas), sitemap, robots, fontes
├─ components/             Componentes reutilizáveis (layout, home, seções, formulários, projetos)
├─ config/
│  ├─ site.ts              ★ CONTATOS DA EMPRESA (WhatsApp, telefone, e-mail, endereço, horários, redes, domínio)
│  ├─ brand.ts             Arquivos oficiais do logotipo
│  ├─ navigation.ts        Menu
│  └─ design-tokens.ts     Tokens de cor/tipografia (espelho do CSS)
├─ content/                ★ TEXTOS de cada página + manifesto de imagens (assets.ts) + formulários + privacidade
├─ data/                   ★ PROJETOS, catálogo de eucalipto, acabamentos, depoimentos
├─ lib/                    Utilitários (WhatsApp, validação de telefone, SEO)
└─ styles/globals.css      Design tokens (Tailwind @theme) e estilos base
public/assets/
├─ brand/                  Logotipos oficiais (SVG)
└─ images/                 Fotografias (home, eucalipto, planejados, projetos, empresa)
```

---

## 4. Configurar contatos (WhatsApp, telefone, e-mail, endereço)

Edite **`src/config/site.ts`**.

**Já configurado (confirmado pela MAPASA em 13/10/2026):** WhatsApp (34) 99913-1919, Instagram `@mapasa`
e endereço Av. Anselmo Alves dos Santos, 1055 - Santa Mônica, Uberlândia - MG.
**Ainda pendente:** telefone fixo, e-mail, horário de atendimento, razão social/CNPJ e domínio.

```ts
export const siteSettings = {
  companyName: "MAPASA",
  phone: "(34) 3333-3333",            // exibição
  whatsappE164: "5534999999999",       // só dígitos: DDI + DDD + número
  email: "contato@dominio.com.br",
  instagram: "https://instagram.com/perfil",
  facebook: null,
  youtube: null,
  address: "Rua Exemplo, 123",
  city: "Cidade",
  state: "MG",
  businessHours: "Seg. a sex., 8h às 18h",
  googleMapsUrl: "https://maps.app.goo.gl/...",
  domain: "https://www.dominio.com.br",
};
```

O que muda automaticamente ao preencher:

| Campo | Efeito |
| --- | --- |
| `whatsappE164` | Botão circular do cabeçalho abre o WhatsApp; botão fixo aparece no celular; formulários abrem o WhatsApp com a mensagem pré-preenchida |
| `phone`, `email`, redes | Aparecem no rodapé e na página de contato |
| `address` + `city` + `state` | Mapa na página de contato e dados estruturados LocalBusiness |
| `domain` | URLs canônicas, sitemap, Open Graph e dados estruturados |

**Sem WhatsApp configurado**, o formulário valida os campos, monta a solicitação e oferece o botão **Copiar solicitação** —
informando claramente que nada foi enviado. Não há envio simulado nem número falso.

---

## 5. Substituir o logotipo

Arquivos em `public/assets/brand/`:

| Arquivo | Uso | Situação |
| --- | --- | --- |
| `mapasa-logo-principal.svg` | Cabeçalho (fundo Areia) | **Oficial** (fornecido pela MAPASA) |
| `mapasa-logo-negativa.svg` | Rodapé (fundo Verde Floresta) | **Provisório**: mesmo vetor oficial com cores trocadas (palavra em branco, ripas em Dourado Claro). Substituir pelo arquivo "Negativa" do Brandbook, com o mesmo nome |
| `mapasa-simbolo.svg` | Símbolo de sete ripas (reserva) | Extraído do vetor oficial, sem alteração de geometria |

O componente detecta os arquivos sozinho no build. Enquanto não existirem, o site mostra um espaço reservado
com o nome do arquivo esperado — **o logotipo nunca é recriado em CSS ou fonte**.
Se a proporção de um novo arquivo for diferente, ajuste `ratio` em `src/config/brand.ts`.

---

## 6. Substituir fotografias

As imagens estão listadas em **`src/content/assets.ts`**, cada uma com um `status`:

- `illustrative` — arquivo provisório (recortes da referência visual aprovada). Exibe o selo **“Imagem ilustrativa”**.
- `pending` — sem imagem. Exibe uma área reservada com a descrição do que fotografar.
- `real` — fotografia oficial e autorizada. Nenhum selo.

Para trocar: **salve a foto real no mesmo caminho e com o mesmo nome**, e mude o `status` para `"real"`.
O layout usa proporções fixas e `object-fit: cover`, então o recorte não muda. Ajuste `focus` (ex.: `"50% 40%"`) se quiser
mover o ponto de enquadramento.

| Arquivo | Onde aparece | Status atual |
| --- | --- | --- |
| `images/home/cozinha-hero.jpg` | Hero da home | ilustrativa |
| `images/eucalipto/toras-patio.jpg` | Card de eucalipto e faixa de contato (home), hero de /eucalipto, “Origem” em /sobre | **real** (pátio da MAPASA, tratada) |
| `images/eucalipto/toras-detalhe.jpg` | Faixa “Seu projeto começa…” (home), “Escolha presencial” em /eucalipto | **real** (detalhe das toras, tratada) |
| `images/planejados/cozinha-projeto.jpg` | Card planejados, seção planejados, hero /moveis-planejados | ilustrativa |
| `images/planejados/ambiente-1..3.jpg` | Miniaturas da seção planejados | ilustrativa |
| `images/projetos/{cozinha,quarto,sala,banheiro}.jpg` | Cards de demonstração e grade de ambientes | ilustrativa |
| `images/empresa/fachada.jpg` | Nossa história (home) e hero de /sobre | **real** (galpões e pátio, tratada) |
| `images/empresa/equipe.jpg` | /sobre | **pendente** |
| `images/empresa/atendimento.jpg` | Faixa de contato da home (enquanto pendente, a faixa usa a foto do pátio) | **pendente** |

Recomendações: JPG horizontal com no mínimo **2000 px** de largura para o hero e **1400 px** para as demais.
Retratos de funcionários e fachadas devem ser **reais e autorizados**.

Para publicar o site definitivo sem nenhum selo, depois de trocar todas as fotos, altere
`SHOW_PLACEHOLDER_BADGES` para `false` em `src/config/site.ts`.

---

## 7. Cadastrar projetos reais

Edite **`src/data/projects.ts`** (há um exemplo comentado no arquivo):

1. Crie a pasta `public/assets/images/projetos/<slug>/` com as fotos autorizadas.
2. Adicione o projeto em `allProjects` com `approvedForPublication: true`.

Resultado automático:
- a home troca os 4 cards de **demonstração** pelos projetos reais;
- `/projetos` lista e filtra por categoria (cozinhas, quartos, salas, banheiros, comerciais);
- `/projetos/<slug>` é gerada com galeria, necessidade do cliente e solução;
- o sitemap inclui a nova página.

Projetos com `approvedForPublication: false` nunca aparecem e suas URLs retornam 404.

## 8. Outros conteúdos condicionais

| Arquivo | Seção | Comportamento sem dados |
| --- | --- | --- |
| `src/data/eucalyptus-products.ts` | Catálogo de eucalipto | Mostra “Catálogo em atualização” + botão de consulta |
| `src/data/finishes.ts` | “Detalhes que fazem diferença” | Seção oculta |
| `src/data/testimonials.ts` | Depoimentos | Seção oculta (exige `permissionGranted: true`) |
| `src/content/planejados.ts` → `environments` | Grade de ambientes | Use `confirmed: false` para ocultar uma categoria não confirmada |
| `src/content/privacy.ts` | Política de privacidade | Publicada (LGPD), gerada a partir do funcionamento real do site. Contatos, endereço, razão social e CNPJ vêm de `site.ts`. **Atualize o texto se o site passar a usar analytics, pixel, cookies ou backend que armazene dados** |

Produtos de eucalipto: **não informe medidas, tratamentos ou preços sem confirmação**. A disponibilidade é sempre “Sob consulta”.

---

## 9. Publicar o site

Há dois caminhos. Os dois geram exatamente o mesmo site.

| | **A. Vercel** (recomendado) | **B. Hospedagem comum** (Hostinger, cPanel, Locaweb, KingHost…) |
| --- | --- | --- |
| Custo | Plano gratuito atende um site institucional | O plano que a empresa já tiver |
| Como atualiza | Automático a cada alteração enviada ao GitHub | Gerar a pasta `out/` de novo e reenviar |
| Imagens | Otimizadas automaticamente (AVIF/WebP, tamanhos por tela) | Servidas como estão (JPG/SVG) |
| SSL/HTTPS | Automático | Ativar o SSL gratuito no painel |

### Antes de qualquer publicação

Defina o domínio — sem ele, o site funciona, mas não gera sitemap nem links canônicos:

- em `src/config/site.ts`, preencha `domain: "https://www.seudominio.com.br"`, **ou**
- defina a variável `NEXT_PUBLIC_SITE_URL` (na Vercel ou num arquivo `.env.production`).

### A. Vercel

1. Envie a pasta do projeto para um repositório no GitHub (sem `node_modules`, `.next` e `out`; o `.gitignore` já cuida disso).
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório. O framework Next.js é detectado sozinho; não altere os comandos.
3. Em **Settings → Environment Variables**, crie:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.seudominio.com.br`
   - `NEXT_PUBLIC_ALLOW_INDEXING` = `false` (veja “Indexação no Google”)
4. Clique em **Deploy**. Em seguida, em **Settings → Domains**, adicione o domínio e siga as instruções de DNS que a Vercel mostrar
   (normalmente um registro `A` para `76.76.21.21` e um `CNAME` de `www` para `cname.vercel-dns.com`).

Cabeçalhos de segurança (HSTS, nosniff, frame-options, referrer e permissions policy) e cache das imagens já estão configurados em `next.config.ts`.

### B. Hospedagem comum (Apache / LiteSpeed)

1. No computador, dentro da pasta do projeto:
   ```bash
   npm install
   npm run build:static
   ```
   Isso gera a pasta **`out/`** com o site completo em HTML, já com o arquivo `.htaccess`.
2. No painel da hospedagem, abra o **Gerenciador de Arquivos** → pasta **`public_html`** (apague a página padrão da hospedagem, se houver).
3. Envie **o conteúdo** da pasta `out/` (não a pasta em si). Dica: compacte o conteúdo em `.zip`, envie e use “Extrair” no próprio painel.
4. Ative o **SSL gratuito** (Let's Encrypt) no painel. O `.htaccess` já força HTTPS.
5. Confira: `seudominio.com.br`, `/eucalipto/`, `/contato/` e um endereço inexistente (deve mostrar a página 404 da MAPASA).

O `.htaccess` (fonte em `deploy/apache/`) faz: HTTPS obrigatório, redireciona `www.` para o domínio sem `www`
(para manter o `www`, troque as linhas indicadas no arquivo), página 404 personalizada, cabeçalhos de segurança,
compressão gzip, cache de 30 dias para imagens e de 1 ano para os arquivos versionados em `_next/static`, e bloqueio de listagem de pastas.

> Arquivos ocultos: alguns gerenciadores não mostram arquivos que começam com ponto. Ative “mostrar arquivos ocultos”
> e confirme que `.htaccess` está em `public_html` e em `public_html/_next/static/`.

Para atualizar depois: altere o conteúdo, rode `npm run build:static` de novo e substitua os arquivos em `public_html`.

### Indexação no Google

Por padrão o site envia `noindex` e o `robots.txt` bloqueia buscadores, para que a versão com fotos ilustrativas
**não seja indexada**. Quando as fotos reais estiverem no lugar:

1. confirme o domínio (`domain` ou `NEXT_PUBLIC_SITE_URL`);
2. troque as fotos e defina `SHOW_PLACEHOLDER_BADGES = false` em `src/config/site.ts`;
3. defina `NEXT_PUBLIC_ALLOW_INDEXING=true` (na Vercel, ou num arquivo `.env.production` antes do `npm run build:static`) e publique de novo;
4. cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie `https://seudominio.com.br/sitemap.xml`.

---

## 10. Checklist de pendências da MAPASA

- [x] Logotipo principal oficial
- [ ] Logotipo versão **negativa** oficial (hoje é uma derivação provisória)
- [x] WhatsApp, Instagram e endereço
- [ ] Telefone fixo (se houver), e-mail, horário de atendimento, razão social e CNPJ, domínio
- [x] Fotografias reais do pátio e da operação (eucalipto)
- [ ] Fotografias reais: equipe, retrato do atendimento, cozinha planejada para o hero e ambientes
- [ ] Projetos executados com fotos autorizadas pelos clientes
- [ ] Confirmação das categorias de ambientes atendidas (inclusive “Ambientes comerciais”)
- [ ] Catálogo de eucalipto (nomes, medidas e aplicações confirmadas)
- [ ] Acabamentos e materiais trabalhados (opcional)
- [ ] Depoimentos com autorização registrada (opcional)
- [x] Política de Privacidade publicada (recomendável revisão jurídica e inclusão de razão social/CNPJ)
- [ ] Confirmação das respostas da FAQ de eucalipto (`src/content/eucalipto.ts`), em especial entrega e visita presencial

---

## 11. Notas técnicas

- **Fontes**: Jost e Manrope são servidas localmente via `next/font/local` (`src/fonts/`) — sem chamadas externas e sem salto de layout.
- **Formulários**: validação de telefone brasileiro (DDD + 8/9 dígitos), mensagens acessíveis, foco no primeiro erro,
  campo *honeypot* antispam e nenhum armazenamento de dados. Para incluir um backend de recebimento (e-mail ou CRM),
  conecte em `onSubmit` de `src/components/forms/LeadForm.tsx` e, se aplicável, adicione um captcha (ex.: Cloudflare Turnstile).
- **Acessibilidade**: HTML semântico, link “Pular para o conteúdo”, foco visível dourado, menus e acordeões com ARIA,
  contraste AA, respeito a `prefers-reduced-motion`.
- **SEO**: metadados e Open Graph por página, `sitemap.xml`, `robots.txt`, URLs canônicas, dados estruturados apenas com dados reais.
- **Performance**: todas as páginas são estáticas; imagens via `next/image` (AVIF/WebP, lazy load abaixo da dobra).
