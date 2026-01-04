import WolLinkPlugin from "main";
import { App, Command, Notice } from "obsidian";
import { getLocale } from "src/i18n";

export default function (plugin:WolLinkPlugin):Command{
    const i18n = getLocale(plugin.app);
    return {
          id: 'gemini',
          name: i18n.command_gemini_name,
          editorCallback: async (editor, view) => {
            const selection = editor.getSelection();
            if (!selection) {
              new Notice(i18n.notice_select_text);
              return;
            }
            const text = await plugin.makeGeminiRequest(`${i18n.gemini_request_prompt}${selection}`);
            if (text) {
              editor.replaceSelection(text);
            }
    
    
          }
        }
}