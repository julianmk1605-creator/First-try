// Registers the ponytail plugin in this project's .claude/settings.json.
// Equivalent to `/plugin marketplace add DietrichGebert/ponytail` + `/plugin install ponytail@ponytail`,
// but works where /plugin is unavailable (e.g. Claude Code on the web): settings are read at session start.
// Run: node src/install.ts
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const path = ".claude/settings.json";
const settings = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};

settings.extraKnownMarketplaces = {
  ...settings.extraKnownMarketplaces,
  ponytail: { source: { source: "github", repo: "DietrichGebert/ponytail" } },
};
settings.enabledPlugins = { ...settings.enabledPlugins, "ponytail@ponytail": true };

mkdirSync(".claude", { recursive: true });
writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
console.log(`ponytail enabled in ${path}; start a new session to load it.`);
