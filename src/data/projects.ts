/**
 * PORTFÓLIO REAL DA MAPASA
 * ------------------------------------------------------------
 * Cadastre aqui SOMENTE projetos verdadeiros, executados pela MAPASA,
 * com fotografias autorizadas pelo cliente.
 *
 * Um projeto só aparece no site (lista, filtros, home e página própria em
 * /projetos/[slug]) quando `approvedForPublication` for `true`.
 *
 * Exemplo de cadastro (copie, preencha e altere approvedForPublication):
 *
 * {
 *   slug: "cozinha-familia-silva",           // vira /projetos/cozinha-familia-silva
 *   title: "Cozinha com ilha em madeira",
 *   category: "cozinhas",
 *   summary: "Frase curta para o card.",
 *   description: "Texto principal do projeto.",
 *   clientNeed: "O que o cliente precisava.",
 *   solution: "O que a MAPASA desenvolveu.",
 *   coverImage: "/assets/images/projetos/cozinha-familia-silva/capa.jpg",
 *   images: ["/assets/images/projetos/cozinha-familia-silva/01.jpg"],
 *   materials: [],                            // apenas materiais confirmados
 *   approvedForPublication: true,
 * }
 */
export const projectCategories = [
  { key: "cozinhas", label: "Cozinhas", singular: "Cozinha" },
  { key: "quartos", label: "Quartos", singular: "Quarto" },
  { key: "salas", label: "Salas", singular: "Sala de estar" },
  { key: "banheiros", label: "Banheiros", singular: "Banheiro" },
  { key: "comerciais", label: "Comerciais", singular: "Ambiente comercial" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["key"];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  clientNeed?: string;
  solution?: string;
  coverImage: string;
  images: string[];
  materials?: string[];
  approvedForPublication: boolean;
};

const allProjects: Project[] = [];

export const publishedProjects = (): Project[] =>
  allProjects.filter((p) => p.approvedForPublication);

export const getProjectBySlug = (slug: string) =>
  publishedProjects().find((p) => p.slug === slug);

export const categoryLabel = (key: ProjectCategory) =>
  projectCategories.find((c) => c.key === key)?.singular ?? key;
