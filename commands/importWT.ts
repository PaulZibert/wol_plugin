import  moment from "moment";

import { Editor, Plugin, requestUrl } from "obsidian";

async function getDOM(url:string){
const res = await requestUrl({ url });
            const html = res.text;

            const parser = new DOMParser();
            return parser.parseFromString(html, "text/html");
}
import { App, Modal, Setting } from 'obsidian';

export class ExampleModal extends Modal {
  constructor(app: App, onSubmit: (result: string) => void,defVal = '') {
    super(app);
	this.setTitle('Week');

	let name = defVal;
    new Setting(this.contentEl)
      .setName('Week')
      .addText((text) =>
        text.setValue(defVal)
        .onChange((value) => {
          name = value;
        }));

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Submit')
          .setCta()
          .onClick(() => {
            this.close();
            onSubmit(name);
          }));
  }
}

async function openModal(week:string) {
    return new Promise((resolve, reject) => {
         new ExampleModal(this.app, resolve,week).open();
    })
 
}

export default function (plugin: Plugin) {
    return {
        id: "import-wt",
        name: "Import WT",
        editorCallback: async (editor:Editor,view) => {
            const week = await openModal((moment().week() - 1).toString());
            const url = 'https://wol.jw.org/ru/wol/meetings/r2/lp-u/2026/'+week
            const doc = await getDOM(url);

            const ref = doc.querySelector("#materialNav > nav > ul:nth-child(4) > li > a")?.getAttribute("href");
                        const doc2 = await getDOM(`https://wol.jw.org${ref}`);
            const questions = doc2.querySelectorAll(".qu")
            let text = ''
            questions.forEach(question => {
                text += '- **'+question.textContent.trim() + '**\n\n'
            })
            editor.replaceSelection(text)
        }
    }
}