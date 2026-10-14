/**
 * Arquivos do logotipo (Brandbook MAPASA 2026), em /public/assets/brand/.
 *
 * - mapasa-logo-principal.svg: arquivo OFICIAL fornecido pela MAPASA.
 * - mapasa-logo-negativa.svg: PROVISÓRIO — mesmo vetor oficial com as cores trocadas para fundo escuro
 *   (palavra e descritor em branco, símbolo em Dourado Claro). Substitua pelo arquivo "Negativa" oficial
 *   do Brandbook assim que disponível, mantendo o mesmo nome.
 * - mapasa-simbolo.svg: símbolo de sete ripas extraído do vetor oficial, sem alteração de geometria.
 *
 * `ratio` = largura ÷ altura do arquivo. Se um novo arquivo tiver outra proporção, atualize aqui.
 * Se um arquivo for removido, o site volta a exibir um espaço reservado identificado — nunca um logotipo recriado.
 */
export const logoAssets = {
  principal: {
    src: "/assets/brand/mapasa-logo-principal.svg",
    description: "Versão principal (fundos claros)",
    ratio: 3726.76 / 815.3,
  },
  negativa: {
    src: "/assets/brand/mapasa-logo-negativa.svg",
    description: "Versão negativa (fundos escuros)",
    ratio: 3726.76 / 815.3,
  },
  simbolo: {
    src: "/assets/brand/mapasa-simbolo.svg",
    description: "Símbolo de sete ripas",
    ratio: 797.81 / 767.21,
  },
} as const;

export type LogoVariant = keyof typeof logoAssets;
