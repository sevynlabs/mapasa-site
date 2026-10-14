import "server-only";
import fs from "node:fs";
import path from "node:path";

/** Verifica, no build/servidor, se um arquivo existe em /public. */
export function publicFileExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}
