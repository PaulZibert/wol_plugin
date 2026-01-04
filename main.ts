import { App, Plugin, PluginManifest, MarkdownView, Notice } from "obsidian";

import { DEFAULT_SETTINGS, SettingTab, type Settings } from "settings.js";
import { GoogleGenAI } from "@google/genai";
import { getActualBiblePlan } from "utils.js";
import { get } from "http";
import moment from "moment";
import createParseChapterCommand from "commands/parseChapter.js";
import createMakeLinksCommand from "commands/makeLinks.js";
import { getLocale, t } from "./src/i18n";
import { initCommands } from "commands";

export default class WolLinkPlugin extends Plugin {
  settings: Settings;
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));
    initCommands(this);
  }
  async makeGeminiRequest(text: string) {
    const i18n = getLocale(this.app);
    if (!this.settings.geminiAPIKey) {
      new Notice(i18n.notice_api_key_not_set)
      return
    }
    const ai = new GoogleGenAI({ apiKey: this.settings.geminiAPIKey });


    const status = this.addStatusBarItem();
    status.setText(i18n.status_gemini_thinking);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
    });
    status.setText(i18n.status_gemini_done);
    setTimeout(() => status.remove(), 1500);
    if (!response.text) {
      new Notice(i18n.notice_gemini_failed_to_respond)
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

