import type { Command } from "obsidian";

export default {
    id: 'parse',
    name: 'Убрать лишнее в главе',
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
} as Command