/**
 * Сборка артефакта для релиза: копирует в release/ всё,
 * что потом пакуется в zip и вешается в GitHub Release (Assets).
 */
import { cpSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const releaseDir = join(root, "release");

mkdirSync(releaseDir, { recursive: true });
cpSync(join(root, "package.json"), join(releaseDir, "package.json"));
cpSync(join(root, "src"), join(releaseDir, "src"), { recursive: true });
if (existsSync(join(root, "package-lock.json"))) {
  cpSync(join(root, "package-lock.json"), join(releaseDir, "package-lock.json"));
}

console.log("Build output: release/");
