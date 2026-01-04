import type { Command, App, Plugin } from "obsidian";
import { t } from "../src/i18n";

export default function createParseChapterCommand(plugin:Plugin): Command {
  return {
    id: 'parse',
    name: t(app, 'command_parse_chapter_name'),
    editorCallback: async (editor, view) => {
      const doc = editor.getDoc();
      let content = doc.getValue();

      content = content
        .replace(/(?<!\*)\*(?!\*)/g, '\\*')
        // Заменяем [1](...) на **1**
        .replace(/\[(\*?\d+\*?)\]\([^)]+\)/g, '**$1**')
        // Удаляем [+](...)
        .replace(/\[\+\]\([^)]+\)/g, '');

      doc.setValue(content);
    }
  };
}
