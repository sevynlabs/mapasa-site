/** Conteúdo editável da página inicial. Textos conforme especificação aprovada. */
export const homeContent = {
  meta: {
    title: "MAPASA | Eucaliptos & Planejados",
    description:
      "Conheça a MAPASA: eucalipto e móveis planejados com atendimento próximo, participação nas escolhas e compromisso com cada projeto.",
  },
  hero: {
    eyebrow: ["MAPASA", "EUCALIPTOS & PLANEJADOS"],
    headline: { plain: ["Relações", "de confiança,"], highlight: ["projetos que", "ganham vida."] },
    paragraph:
      "Do eucalipto aos móveis planejados, a MAPASA une experiência, atendimento próximo e compromisso com as necessidades de cada cliente.",
    actions: [
      { label: "Conhecer Móveis Planejados", href: "/moveis-planejados", variant: "gold" },
      { label: "Conhecer Eucalipto", href: "/eucalipto", variant: "outlineLight" },
    ],
    cornerLabel: ["DA FLORESTA", "AO PROJETO"],
  },
  specialties: {
    eyebrow: "Nossas especialidades",
    title: ["Duas especialidades.", "Uma mesma essência."],
    description:
      "Produtos diferentes, mas um mesmo compromisso: valorizar as pessoas, compreender suas necessidades e construir relações de confiança.",
    cards: [
      {
        label: "MAPASA EUCALIPTOS",
        title: "Eucalipto com atenção à sua escolha.",
        description:
          "Conheça nossas opções de eucalipto e conte com atendimento próximo para encontrar a solução adequada à sua necessidade.",
        image: "eucalyptusLogs",
        href: "/eucalipto",
        button: "Conhecer Eucalipto",
        buttonVariant: "gold",
      },
      {
        label: "MAPASA PLANEJADOS",
        title: "Seu espaço merece um projeto pensado para você.",
        description:
          "Desenvolvimento, fabricação e instalação de móveis planejados com atenção às suas ideias e escolhas.",
        image: "plannedKitchen",
        href: "/moveis-planejados",
        button: "Conhecer Planejados",
        buttonVariant: "white",
      },
    ],
  },
  differentiation: {
    eyebrow: "Nosso diferencial",
    title: ["Aqui, o relacionamento", "faz parte da solução."],
    description:
      "Mais do que oferecer produtos, buscamos entender necessidades, facilitar escolhas e participar das realizações dos nossos clientes.",
    items: [
      { icon: "users", title: "Proximidade", description: "Entendemos antes de oferecer." },
      { icon: "settings", title: "Participação", description: "Valorizamos suas escolhas." },
      { icon: "shield", title: "Compromisso", description: "Cuidamos dos combinados e da realização." },
    ],
  },
  planned: {
    eyebrow: "Móveis planejados",
    title: ["Ambientes que fazem", "sentido para a sua vida."],
    description:
      "Cada espaço possui necessidades, possibilidades e histórias diferentes. Na MAPASA, desenvolvemos móveis planejados pensando em quem vai utilizar cada ambiente. Do desenvolvimento à instalação, valorizamos suas ideias e a atenção aos detalhes.",
    cta: { label: "Quero planejar meu ambiente", href: "/moveis-planejados" },
  },
  eucalyptus: {
    eyebrow: "Eucalipto",
    title: ["Seu projeto começa", "com uma escolha bem feita."],
    description:
      "Na MAPASA, você pode conhecer nossas peças de eucalipto e participar pessoalmente da escolha. Nossa equipe está disponível para compreender sua necessidade, apresentar as opções e orientar as condições de compra, retirada e entrega.",
    cta: { label: "Solicitar orçamento de eucalipto", href: "/eucalipto#orcamento" },
  },
  story: {
    eyebrow: "Nossa história",
    title: ["Uma história construída", "com trabalho e relacionamento."],
    description:
      "A trajetória da MAPASA começou com o eucalipto e foi fortalecida ao longo do tempo pela dedicação da família e pelos relacionamentos construídos com os clientes. Hoje, ampliamos nossa atuação para os móveis planejados, com novas possibilidades e a mesma essência: valorizar as pessoas e construir relações de confiança.",
    cta: { label: "Conheça nossa história", href: "/sobre" },
  },
  projects: {
    eyebrow: "Projetos realizados",
    title: "Projetos que ganham vida.",
    showAll: { label: "Ver todos os projetos", href: "/projetos" },
    /** Exibidos SOMENTE enquanto não houver projetos reais aprovados em src/data/projects.ts */
    demoCards: [
      { title: "Cozinha planejada", category: "Cozinha", image: "galleryKitchen" },
      { title: "Quarto planejado", category: "Quarto", image: "galleryBedroom" },
      { title: "Sala planejada", category: "Sala de estar", image: "galleryLiving" },
      { title: "Banheiro planejado", category: "Banheiro", image: "galleryBathroom" },
    ],
    demoNotice:
      "Imagens ilustrativas de demonstração. Os projetos executados pela MAPASA serão publicados após aprovação.",
  },
  process: {
    eyebrow: "O jeito MAPASA de atender",
    title: ["Uma boa relação começa", "com uma boa conversa."],
    description:
      "Do primeiro contato à entrega, nossa equipe busca acompanhar cada etapa com atenção e compromisso, valorizando suas necessidades e escolhas.",
    steps: [
      { number: "1", title: "Ouvir", description: "Entender sua necessidade.", icon: "ear" },
      { number: "2", title: "Orientar", description: "Apresentar possibilidades.", icon: "clipboard" },
      { number: "3", title: "Acompanhar", description: "Manter clareza durante o processo.", icon: "badge" },
      { number: "4", title: "Permanecer", description: "Valorizar o relacionamento após a entrega.", icon: "handshake" },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: ["Vamos conversar sobre", "seu próximo projeto?"],
    description:
      "Seja para escolher o eucalipto da sua obra ou planejar um novo ambiente, nossa equipe está pronta para conhecer sua necessidade.",
    actions: [
      { label: "Solicitar orçamento de eucalipto", href: "/eucalipto#orcamento", variant: "gold" },
      { label: "Solicitar projeto de móveis planejados", href: "/moveis-planejados#orcamento", variant: "forest" },
    ],
  },
} as const;
