/**
 * MANIFESTO DE IMAGENS
 * ------------------------------------------------------------
 * Cada imagem tem um caminho fixo em /public. Para usar a fotografia real,
 * basta substituir o arquivo mantendo o MESMO nome e alterar `status` para "real".
 * Os recortes são controlados pelo layout (object-fit: cover + proporção fixa),
 * portanto a troca não altera a diagramação.
 *
 * status:
 *  - "illustrative": arquivo provisório (recorte da referência visual aprovada). Exibe selo "Imagem ilustrativa".
 *  - "pending": não existe imagem aprovada. O site mostra uma área reservada identificada.
 *  - "real": fotografia oficial e autorizada da MAPASA. Nenhum selo é exibido.
 */
export type AssetStatus = "illustrative" | "pending" | "real";

export type SiteAsset = {
  src: string;
  alt: string;
  status: AssetStatus;
  /** Descrição do que deve ser fotografado, exibida enquanto estiver pendente. */
  brief: string;
  /** Ponto focal para o recorte (CSS object-position). */
  focus?: string;
};

export const assets = {
  heroKitchen: {
    src: "/assets/images/home/cozinha-hero.jpg",
    alt: "Cozinha planejada contemporânea com ilha em madeira e iluminação quente",
    status: "illustrative",
    brief: "Cozinha planejada executada pela MAPASA, horizontal, luz quente.",
    focus: "60% 50%",
  },
  eucalyptusLogs: {
    src: "/assets/images/eucalipto/toras-patio.jpg",
    alt: "Pátio da MAPASA com postes de eucalipto tratado empilhados sob o sol",
    status: "real",
    brief: "Pátio da MAPASA com postes de eucalipto.",
    focus: "50% 55%",
  },
  eucalyptusDetail: {
    src: "/assets/images/eucalipto/toras-detalhe.jpg",
    alt: "Toras de eucalipto empilhadas no pátio da MAPASA, vistas de perto",
    status: "real",
    brief: "Detalhe das toras de eucalipto no pátio da MAPASA.",
    focus: "45% 50%",
  },
  plannedKitchen: {
    src: "/assets/images/planejados/cozinha-projeto.jpg",
    alt: "Cozinha planejada com marcenaria em madeira clara e bancada de pedra",
    status: "illustrative",
    brief: "Projeto real de cozinha planejada, horizontal.",
    focus: "50% 50%",
  },
  plannedThumb1: {
    src: "/assets/images/planejados/ambiente-1.jpg",
    alt: "Detalhe de armários planejados",
    status: "illustrative",
    brief: "Detalhe de ambiente planejado.",
  },
  plannedThumb2: {
    src: "/assets/images/planejados/ambiente-2.jpg",
    alt: "Armários planejados de dormitório",
    status: "illustrative",
    brief: "Dormitório ou closet planejado.",
  },
  plannedThumb3: {
    src: "/assets/images/planejados/ambiente-3.jpg",
    alt: "Gabinete planejado de banheiro",
    status: "illustrative",
    brief: "Banheiro planejado.",
  },
  galleryKitchen: {
    src: "/assets/images/projetos/cozinha.jpg",
    alt: "Exemplo ilustrativo de cozinha planejada",
    status: "illustrative",
    brief: "Cozinha planejada executada.",
  },
  galleryBedroom: {
    src: "/assets/images/projetos/quarto.jpg",
    alt: "Exemplo ilustrativo de quarto planejado",
    status: "illustrative",
    brief: "Quarto planejado executado.",
  },
  galleryLiving: {
    src: "/assets/images/projetos/sala.jpg",
    alt: "Exemplo ilustrativo de sala planejada",
    status: "illustrative",
    brief: "Sala planejada executada.",
  },
  galleryBathroom: {
    src: "/assets/images/projetos/banheiro.jpg",
    alt: "Exemplo ilustrativo de banheiro planejado",
    status: "illustrative",
    brief: "Banheiro planejado executado.",
  },
  companyExterior: {
    src: "/assets/images/empresa/fachada.jpg",
    alt: "Galpões e pátio da MAPASA com toras de eucalipto em primeiro plano",
    status: "real",
    brief: "Fotografia real da operação da MAPASA",
    focus: "55% 45%",
  },
  companyTeam: {
    src: "/assets/images/empresa/equipe.jpg",
    alt: "Equipe MAPASA",
    status: "pending",
    brief: "Fotografia real e autorizada da equipe",
  },
  contactTeamMember: {
    src: "/assets/images/empresa/atendimento.jpg",
    alt: "Integrante da equipe de atendimento MAPASA",
    status: "pending",
    brief: "Retrato real e autorizado de um integrante do atendimento",
  },
} satisfies Record<string, SiteAsset>;

export type AssetKey = keyof typeof assets;
