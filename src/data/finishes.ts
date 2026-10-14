/**
 * ACABAMENTOS CONFIRMADOS (Móveis Planejados)
 * Cadastre apenas materiais, padrões e ferragens efetivamente trabalhados pela MAPASA.
 * Enquanto a lista estiver vazia, a seção "Detalhes que fazem diferença" não é exibida.
 */
export type Finish = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

export const confirmedFinishes: Finish[] = [];
