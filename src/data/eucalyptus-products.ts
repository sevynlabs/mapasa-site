/**
 * CATÁLOGO DE EUCALIPTO
 * ------------------------------------------------------------
 * Cadastre somente produtos confirmados pela MAPASA.
 * Não informe medidas, tratamentos ou comprimentos sem confirmação.
 * Preços não são exibidos no site: a disponibilidade é sempre "Sob consulta".
 *
 * Exemplo:
 * {
 *   id: "mourao-tratado",
 *   name: "Nome confirmado do produto",
 *   image: "/assets/images/eucalipto/produtos/mourao.jpg",
 *   imageStatus: "real",
 *   description: "Descrição confirmada.",
 *   specifications: [{ label: "Tratamento", value: "..." }],
 *   applications: ["Cercas"],
 *   availability: "Sob consulta",
 * }
 */
export type EucalyptusProduct = {
  id: string;
  name: string;
  image: string | null;
  imageStatus?: "real" | "illustrative";
  description: string;
  specifications: { label: string; value: string }[];
  applications: string[];
  availability: "Sob consulta";
};

export const eucalyptusProducts: EucalyptusProduct[] = [];
