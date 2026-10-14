import { siteSettings } from "@/config/site";
import { getWhatsAppDisplay } from "@/lib/whatsapp";

/**
 * POLÍTICA DE PRIVACIDADE
 * ------------------------------------------------------------
 * Texto elaborado com base no funcionamento real deste site (13/10/2026):
 *  - formulários não armazenam dados; a solicitação é aberta no WhatsApp e só é enviada quando o titular confirma;
 *  - não há cookies próprios, ferramentas de análise ou publicidade;
 *  - a página de contato incorpora um mapa do Google;
 *  - o provedor de hospedagem gera registros de acesso.
 *
 * Os contatos, o endereço, a razão social e o CNPJ vêm de src/config/site.ts.
 * Se o site passar a usar analytics, pixel de anúncios, cookies ou um backend que armazene dados,
 * ESTE TEXTO PRECISA SER ATUALIZADO antes da publicação da mudança.
 */
export type PolicySection = { heading: string; paragraphs: string[]; list?: string[] };

const s = siteSettings;
const whatsapp = getWhatsAppDisplay();
const fullAddress = [s.address, [s.city, s.state].filter(Boolean).join(" - ")].filter(Boolean).join(", ");
const identity = [
  s.legalName ? `${s.companyName} (${s.legalName})` : s.companyName,
  s.cnpj ? `inscrita no CNPJ sob o nº ${s.cnpj}` : null,
  fullAddress ? `com endereço em ${fullAddress}` : null,
]
  .filter(Boolean)
  .join(", ");

const channels = [
  whatsapp ? `WhatsApp ${whatsapp}` : null,
  s.email ? `e-mail ${s.email}` : null,
  fullAddress ? `presencialmente em ${fullAddress}` : null,
].filter(Boolean) as string[];

export const privacyPolicy: {
  approved: boolean;
  lastUpdated: string | null;
  sections: PolicySection[];
} = {
  approved: true,
  lastUpdated: "13 de outubro de 2026",
  sections: [
    {
      heading: "1. Quem somos",
      paragraphs: [
        `Esta Política de Privacidade explica como a ${identity}, atuante no comércio de eucalipto e em móveis planejados ("MAPASA", "nós"), trata os dados pessoais de quem visita este site e entra em contato por meio dele.`,
        "Para os dados tratados a partir deste site, a MAPASA é a controladora, nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).",
      ],
    },
    {
      heading: "2. Quais dados tratamos",
      paragraphs: ["Tratamos apenas os dados necessários para responder ao seu contato e manter o site funcionando com segurança:"],
      list: [
        "Dados que você informa nos formulários de orçamento: nome, número de WhatsApp, especialidade de interesse (eucalipto ou móveis planejados) e as informações da sua solicitação, como aplicação desejada, medidas ou quantidades, cidade, preferência de retirada ou entrega, ambiente, etapa do imóvel, referências e a descrição da sua necessidade.",
        "Dados que você nos envia diretamente pelo WhatsApp, Instagram ou presencialmente, ao conversar com a nossa equipe.",
        "Registros técnicos de acesso gerados automaticamente pelo provedor de hospedagem do site, como endereço IP, data e hora do acesso, página visitada e tipo de navegador.",
      ],
    },
    {
      heading: "3. Como funcionam os formulários",
      paragraphs: [
        "Os formulários deste site não gravam suas informações em banco de dados nem as enviam para servidores da MAPASA. Ao clicar em enviar, os dados preenchidos são organizados em uma mensagem que é aberta no WhatsApp, no seu próprio dispositivo, endereçada ao número oficial da MAPASA.",
        "A mensagem só é enviada quando você a confirma dentro do WhatsApp. A partir desse momento, a conversa também passa a ser tratada pelo WhatsApp, serviço operado por terceiro e sujeito às políticas próprias dessa plataforma.",
      ],
    },
    {
      heading: "4. Para que usamos os dados",
      paragraphs: ["Utilizamos os dados pessoais para:"],
      list: [
        "responder às suas solicitações de orçamento e de contato;",
        "compreender sua necessidade, apresentar opções, disponibilidade e condições de compra, retirada, entrega, projeto e instalação;",
        "combinar visitas, atendimentos e a execução do que for contratado;",
        "manter a segurança e o funcionamento adequado do site;",
        "cumprir obrigações legais e regulatórias e exercer direitos em processos judiciais ou administrativos.",
      ],
    },
    {
      heading: "5. Bases legais",
      paragraphs: ["Os tratamentos descritos se apoiam nas seguintes hipóteses do art. 7º da LGPD:"],
      list: [
        "execução de procedimentos preliminares relacionados a contrato, a pedido do titular (inciso V), para responder a orçamentos e preparar propostas;",
        "execução de contrato (inciso V), quando houver compra ou contratação de serviços;",
        "cumprimento de obrigação legal ou regulatória (inciso II), inclusive a guarda de registros de acesso exigida pelo Marco Civil da Internet (Lei nº 12.965/2014);",
        "legítimo interesse (inciso IX), para a segurança e o funcionamento do site, sempre respeitando seus direitos e expectativas.",
      ],
    },
    {
      heading: "6. Cookies e ferramentas de terceiros",
      paragraphs: [
        "Este site não utiliza cookies próprios, ferramentas de análise de audiência nem tecnologias de publicidade.",
        "A página de contato exibe um mapa do Google Maps incorporado. Ao carregar essa página, o Google pode coletar informações do seu navegador e utilizar cookies conforme a política de privacidade do próprio Google. Os links para WhatsApp e Instagram levam a serviços de terceiros, que possuem políticas próprias.",
      ],
    },
    {
      heading: "7. Compartilhamento de dados",
      paragraphs: [
        "A MAPASA não vende nem aluga dados pessoais. Os dados podem ser tratados pelos fornecedores estritamente necessários à operação do site e do atendimento, como o provedor de hospedagem, o WhatsApp e o Google (mapa), além de autoridades públicas quando houver obrigação legal ou ordem judicial.",
        "Alguns desses fornecedores podem armazenar ou processar dados em servidores localizados fora do Brasil, situação em que a transferência ocorre nas hipóteses admitidas pela LGPD.",
      ],
    },
    {
      heading: "8. Por quanto tempo mantemos os dados",
      paragraphs: [
        "As informações das solicitações e conversas são mantidas pelo tempo necessário para atender ao pedido e à eventual relação comercial dele decorrente, e depois pelo prazo exigido para cumprimento de obrigações legais ou para o exercício de direitos.",
        "Os registros de acesso ao site são mantidos pelo prazo mínimo de 6 meses previsto no Marco Civil da Internet.",
      ],
    },
    {
      heading: "9. Segurança",
      paragraphs: [
        "O site é servido por conexão criptografada (HTTPS) e foi construído para não armazenar os dados dos formulários. Adotamos medidas técnicas e administrativas razoáveis para proteger os dados pessoais, mas nenhum sistema é totalmente imune a incidentes. Caso ocorra um incidente de segurança que possa gerar risco ou dano relevante, adotaremos as providências previstas na LGPD.",
      ],
    },
    {
      heading: "10. Seus direitos",
      paragraphs: ["Nos termos do art. 18 da LGPD, você pode solicitar à MAPASA, a qualquer momento:"],
      list: [
        "confirmação da existência de tratamento e acesso aos seus dados;",
        "correção de dados incompletos, inexatos ou desatualizados;",
        "anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;",
        "portabilidade dos dados, observada a regulamentação aplicável;",
        "eliminação dos dados tratados com base em consentimento, quando for o caso, e revogação desse consentimento;",
        "informação sobre as entidades com as quais seus dados foram compartilhados;",
        "oposição a tratamento realizado em desconformidade com a lei.",
      ],
    },
    {
      heading: "11. Como falar com a MAPASA sobre seus dados",
      paragraphs: [
        channels.length
          ? `Para exercer seus direitos ou tirar dúvidas sobre esta Política, entre em contato pelos nossos canais oficiais: ${channels.join("; ")}. Poderemos solicitar informações para confirmar sua identidade antes de atender ao pedido.`
          : "Para exercer seus direitos ou tirar dúvidas sobre esta Política, entre em contato pelos canais oficiais indicados na página de contato.",
        "Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
    },
    {
      heading: "12. Público do site",
      paragraphs: [
        "Este site é destinado a pessoas maiores de 18 anos interessadas nos produtos e serviços da MAPASA. Não coletamos intencionalmente dados de crianças e adolescentes.",
      ],
    },
    {
      heading: "13. Atualizações desta Política",
      paragraphs: [
        "Esta Política pode ser atualizada para refletir mudanças no site, nos nossos serviços ou na legislação. A versão vigente estará sempre disponível nesta página, com a data da última atualização.",
      ],
    },
  ],
};

/** Usado somente se `approved` for false. */
export const currentFormBehavior = [
  "Os formulários deste site não armazenam seus dados em banco de dados nem em servidores da MAPASA.",
  "Ao enviar uma solicitação, as informações preenchidas são organizadas em uma mensagem que você mesmo envia pelo WhatsApp oficial da empresa.",
  "Os dados informados (nome, WhatsApp e detalhes da necessidade) são usados exclusivamente para responder à sua solicitação de orçamento.",
];
