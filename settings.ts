import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import WolPlugin from './main';
import { getActualBiblePlan } from 'utils.js';
import { t } from './src/i18n';

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
      .setName(t(this.app, 'setting_gemini_api_key_name'))
      .setDesc(t(this.app, 'setting_gemini_api_key_desc'))
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
      .setName(t(this.app, 'setting_bible_index_name'))
      .setDesc(t(this.app, 'setting_bible_index_desc'))
      .addText(text => {
        text.inputEl.type = 'number';
        text.setPlaceholder('1')
          .setValue(this.plugin.settings.bibleIndex.toString())
          .onChange(async value => {
            const nvalue = Number(value);
            this.plugin.settings.bibleIndex = nvalue
            if(nvalue){
              new Notice(`${t(this.app, 'notice_bible_index_changed_prefix')}${getActualBiblePlan(nvalue)?.text})`);
              await this.plugin.saveSettings();
            }
          })
      })

    new Setting(containerEl)
      .setName(t(this.app, 'setting_paste_date_name'))
      .setDesc(t(this.app, 'setting_paste_date_desc'))
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
