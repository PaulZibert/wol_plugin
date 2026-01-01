import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import WolPlugin from './main';
import { getActualBiblePlan } from 'utils.js';

export interface Settings {
  geminiAPIKey: string;
  bibleIndex: number
  pasteDate:boolean
}
export const DEFAULT_SETTINGS: Settings = {
  geminiAPIKey: "",
  bibleIndex: 1,
  pasteDate:false
}

export class SettingTab extends PluginSettingTab {
  plugin: WolPlugin;

  constructor(app: App, plugin: WolPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Gemini API Key')
      .setDesc('Stored locally in Obsidian settings')
      .addText(text =>
        text
          .setPlaceholder('AIza...')
          .setValue(this.plugin.settings.geminiAPIKey)
          .onChange(async value => {
            this.plugin.settings.geminiAPIKey = value.trim();
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName('Bible Index')
      .setDesc('index of entry in plan')
      .addText(text => {
        text.inputEl.type = 'number';
        text.setPlaceholder('1')
          .setValue(this.plugin.settings.bibleIndex.toString())
          .onChange(async value => {
            const nvalue = Number(value);
            this.plugin.settings.bibleIndex = nvalue
            if(nvalue){
              new Notice(`Bible Index changed (${getActualBiblePlan(nvalue)?.text})`);
              await this.plugin.saveSettings();
            }
          })
      })

    new Setting(containerEl)
      .setName('Paste Date')
      .setDesc('Paste date to Bible Plan')
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.pasteDate)
          .onChange(async value => {
            this.plugin.settings.pasteDate = value;
            await this.plugin.saveSettings();
          });
      });

  }
}