// Packs the standalone build into deploy/apshop-plesk.zip, ready to extract into the Plesk application root.
// Run via `npm run package:plesk` (builds first).
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const outDir = join(root, "deploy");
const appDir = join(outDir, "app");
const zipPath = join(outDir, "apshop-plesk.zip");

if (!existsSync(join(standalone, "server.js"))) {
  console.error("ไม่พบ .next/standalone/server.js — ต้องรัน `next build` (output: standalone) ก่อน");
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });

// standalone/ already has server.js, package.json and the traced node_modules;
// static assets and public/ must be copied in next to it.
cpSync(standalone, appDir, { recursive: true });
cpSync(join(root, ".next", "static"), join(appDir, ".next", "static"), { recursive: true });
cpSync(join(root, "public"), join(appDir, "public"), { recursive: true });

// Passenger restarts the app when this file's mtime changes.
mkdirSync(join(appDir, "tmp"), { recursive: true });
writeFileSync(join(appDir, "tmp", "restart.txt"), "");

// Use Windows' bsdtar (makes real zips with "/" separators); elsewhere use zip.
if (process.platform === "win32") {
  const tar = join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe");
  execFileSync(tar, ["-a", "-c", "-f", zipPath, "-C", appDir, "."], { stdio: "inherit" });
} else {
  execFileSync("zip", ["-qr", zipPath, "."], { cwd: appDir, stdio: "inherit" });
}

console.log(`\n✓ สร้างไฟล์แล้ว: ${zipPath}`);
console.log("  อัปโหลดและแตกไฟล์ลงใน Application Root บน Plesk, ตั้ง Startup file = server.js");
