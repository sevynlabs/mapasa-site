/** Configuração editável dos formulários de orçamento. */
export type ServiceKey = "eucalipto" | "planejados";

export const services: { key: ServiceKey; label: string }[] = [
  { key: "eucalipto", label: "Eucalipto" },
  { key: "planejados", label: "Móveis planejados" },
];

export const eucalyptusFormOptions = {
  applications: ["Construções", "Propriedades rurais", "Varandas e estruturas", "Outra aplicação"],
  fulfillment: ["Retirada", "Entrega", "Ainda não sei"],
};

export const plannedFormOptions = {
  environments: ["Cozinha", "Quarto", "Sala", "Banheiro", "Ambiente comercial", "Mais de um ambiente"],
  propertyStage: ["Imóvel pronto", "Em construção", "Em reforma"],
};

export const formCopy = {
  privacyNote:
    "Seus dados são usados apenas para responder a esta solicitação. Os formulários deste site não armazenam informações em banco de dados.",
  submitWhatsApp: "Enviar pelo WhatsApp",
  submitUnconfigured: "Preparar minha solicitação",
};
