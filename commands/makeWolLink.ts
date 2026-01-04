import { Command, Plugin } from "obsidian";
import { getLocale } from "src/i18n";
import { books } from "../books.json";

export default function (plugin:Plugin):Command{
  const i18n = getLocale(plugin.app)
    return {
      id: "make-wol-link",
      name: i18n.command_make_wol_link_name,
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice(i18n.notice_select_text);
          return;
        }
        const link = createWolLink2(selection);
        if (link) {
          editor.replaceSelection(link);
        } else {
          new Notice(i18n.notice_failed_to_recognize_link);
        }
      }
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
