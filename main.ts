import { App, Plugin, PluginManifest, MarkdownView, Notice } from "obsidian";
import { books } from "./books.json";
import { DEFAULT_SETTINGS, SettingTab, type Settings } from "settings.js";
import { GoogleGenAI } from "@google/genai";
import { getActualBiblePlan } from "utils.js";
import { get } from "http";
import moment from "moment";
import parseChapter from "commands/parseChapter.js";
import makeLinks from "commands/makeLinks.js";
export default class WolLinkPlugin extends Plugin {
  settings: Settings;
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));
    this.addCommand({
      id: "make-wol-link",
      name: "Сделать ссылку на онлайн библиотеку",
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice("Выделите текст");
          return;
        }
        const link = createWolLink2(selection);
        if (link) {
          editor.replaceSelection(link);
        } else {
          new Notice("Не удалось распознать ссылку");
        }
      }
    });
    this.addCommand({
      id: 'gemini',
      name: 'Опознать библейский стих',
      editorCallback: async (editor, view) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice("Выделите текст");
          return;
        }
        const text = await this.makeGeminiRequest(`Напиши ссылку на библейский стих (напр. Бт 1:1), который больше всего подходит к следующей фразе (ответ короткий - только стих). Фраза: ${selection}`);
        if (text) {
          editor.replaceSelection(text);
        }


      }
    })
    this.addCommand({
      id: 'show-plan',
      name: 'Показать план',
      editorCallback: async (editor, view) => {
        const { text, link } = getActualBiblePlan(this.settings.bibleIndex)!;
        let resultText = `[${text}](${link})`;
        if (this.settings.pasteDate) { resultText = `${moment().format('DD.MM.YY')} ${resultText}` };
        editor.replaceSelection(resultText);
        this.settings.bibleIndex++;
        this.saveSettings();
      }
    })
    this.addCommand(parseChapter)
    this.addCommand(makeLinks)
  }
  async makeGeminiRequest(text: string) {
    if (!this.settings.geminiAPIKey) {
      new Notice('API Key не задан')
      return
    }
    const ai = new GoogleGenAI({ apiKey: this.settings.geminiAPIKey });


    const status = this.addStatusBarItem();
    status.setText('⏳ Gemini is thinking…');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
    });
    status.setText('✅ Gemini done');
    setTimeout(() => status.remove(), 1500);
    if (!response.text) {
      new Notice('Gemini не смог ответить')
      return
    }
    return response.text
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

function createWolLink2(text: string) {
  const regex =
   /((?:\d+\s*)?\p{L}+\.?(?:[ \t]+\p{L}+\.?)*)[ \t]+(\d+)\s*:\s*(\d+)(?:\s*[–-]\s*(\d+))?/ug
  const result = text.replaceAll(regex, (match, bookStr, chapter, verse, end) => {
    console.log([match, bookStr, chapter, verse, end])
    bookStr = bookStr.replace('.', '');
    const compare = (a, b) => a.toLowerCase().includes(b.toLowerCase().replace(' ', ''))
    const book = books.find(b => compare(b.name, bookStr) || compare(b.shortcut, bookStr));
    if (!book) {
      return
    }
    const bookId = books.indexOf(book) + 1
    const verseStr = end ?
      `#v=${bookId}:${chapter}:${verse}-${bookId}:${chapter}:${end}`
      : `/${verse}`
    return `[${match}](https://wol.jw.org/ru/wol/b/r2/lp-u/nwtsty/${bookId}/${chapter}${verseStr})`
  })
  return result

}
