// Executado após `npm run build:static`: copia a configuração Apache para a pasta out/.
import { copyFileSync, existsSync, rmSync } from "node:fs";

if (!existsSync("out")) {
  console.error("Pasta out/ não encontrada. Rode `npm run build:static`.");
  process.exit(1);
}
copyFileSync("deploy/apache/.htaccess", "out/.htaccess");
copyFileSync("deploy/apache/static.htaccess", "out/_next/static/.htaccess");
// Remove a rota técnica criada quando ainda não há projetos publicados.
rmSync("out/projetos/__sem-projetos", { recursive: true, force: true });
rmSync("out/projetos/__sem-projetos.txt", { force: true });
console.log("\n✓ Site estático gerado em out/ (com .htaccess). Envie o CONTEÚDO de out/ para public_html.\n");
