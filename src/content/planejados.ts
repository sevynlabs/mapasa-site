export const planejadosContent = {
  meta: {
    title: "Móveis Planejados",
    description:
      "Móveis planejados desenvolvidos, fabricados e instalados pela MAPASA com atenção às suas necessidades, ideias e escolhas.",
  },
  hero: {
    eyebrow: "MAPASA PLANEJADOS",
    title: "Seu espaço merece um projeto pensado para você.",
    description:
      "Móveis planejados desenvolvidos com atenção às suas necessidades, da concepção à instalação.",
    cta: { label: "Quero planejar meu ambiente", href: "#orcamento" },
    secondary: { label: "Ver o processo", href: "#processo" },
  },
  intro: {
    eyebrow: "Personalização",
    title: "Cada ambiente tem uma história. Cada projeto merece atenção.",
    description:
      "A MAPASA desenvolve, fabrica e instala móveis planejados, valorizando a personalização e as necessidades de cada cliente.",
    pillars: ["Desenvolvimento do projeto", "Fabricação", "Instalação"],
  },
  environments: {
    eyebrow: "Ambientes",
    title: "Ambientes para viver melhor.",
    /**
     * Exibir somente categorias confirmadas pela empresa.
     * Para ocultar uma categoria, altere `confirmed` para false.
     */
    items: [
      { key: "cozinhas", label: "Cozinhas", image: "galleryKitchen", confirmed: true },
      { key: "quartos", label: "Quartos", image: "galleryBedroom", confirmed: true },
      { key: "salas", label: "Salas", image: "galleryLiving", confirmed: true },
      { key: "banheiros", label: "Banheiros", image: "galleryBathroom", confirmed: true },
      { key: "comerciais", label: "Ambientes comerciais", image: null, confirmed: true },
    ],
  },
  projects: {
    eyebrow: "Portfólio",
    title: "Projetos que ganham vida.",
    cta: { label: "Ver todos os projetos", href: "/projetos" },
    emptyText:
      "O portfólio está sendo preparado. Entre em contato para conhecer os trabalhos disponíveis.",
  },
  differentiation: {
    eyebrow: "Atendimento",
    title: "Seu projeto começa com uma boa conversa.",
    description:
      "Do primeiro contato à instalação, acompanhamos cada etapa com proximidade, valorizando suas ideias e escolhas.",
    items: [
      "Escuta das suas necessidades",
      "Personalização das soluções",
      "Participação nas escolhas",
      "Clareza durante o projeto",
      "Acompanhamento da execução",
    ],
  },
  process: {
    eyebrow: "Processo",
    title: "Da ideia à realização.",
    steps: [
      "Primeira conversa",
      "Levantamento das necessidades",
      "Desenvolvimento do projeto",
      "Apresentação da proposta",
      "Fabricação",
      "Instalação",
    ],
  },
  finishes: {
    eyebrow: "Acabamentos",
    title: "Detalhes que fazem diferença.",
  },
  testimonials: {
    eyebrow: "Depoimentos",
    title: "A experiência de quem realizou com a MAPASA.",
  },
  form: {
    eyebrow: "Orçamento",
    title: "Vamos conversar sobre seu projeto?",
    description:
      "Conte qual ambiente você deseja planejar e em que etapa está o imóvel. Nossa equipe retorna para a primeira conversa.",
  },
} as const;
