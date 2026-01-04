import type { Command, App, Plugin } from "obsidian";
import stringSimilarity from 'string-similarity';
import { t } from "../src/i18n";

export default function createMakeLinksCommand(plugin:Plugin): Command {
  return {
    id: 'make-links',
    name: t(plugin.app, 'command_make_links_name'),
    editorCallback: async (editor, view) => {
        const files = view.app.vault.getMarkdownFiles()
            .filter(f => f.parent?.isRoot())
            .map(f => f.basename.toLowerCase());
        const doc = editor.getDoc();
        let content = doc.getValue();

        

        let frontmatter = '';
        let body = content;

        const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n?/);
        if (fmMatch) {
            frontmatter = fmMatch[0]; // сохраняем фронтматтер как есть
            body = content.slice(frontmatter.length); // остальной текст
        }

        const words = body.split(/([\s.,;!?()\[\]«»"“”]+)/);

        const threshold = 0.7; // порог похожести 0..1
        const used: string[] = []
        const result = words.map(word => {
            // Игнорируем разделители
            if (!/[А-Яа-яA-Za-z0-9]/.test(word)) {
                return word
            };

            const bestMatch = stringSimilarity.findBestMatch(word.toLowerCase(), files);
            if (bestMatch.bestMatch.rating >= threshold) {
                if (used.includes(bestMatch.bestMatch.target)) {
                    return word;
                }
                used.push(bestMatch.bestMatch.target);
                return `[[${bestMatch.bestMatch.target}|${word}]]`;
            } else {
                return word;
            }
        }).join("");

        doc.setValue(frontmatter + result);
    }
  };
}
