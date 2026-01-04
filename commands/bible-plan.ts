import * as moment from "moment";
import { Command, Plugin } from "obsidian";
import { getLocale } from "src/i18n";
import { getActualBiblePlan } from "utils";

export default function createShowPlanCommand(plugin:Plugin): Command{
    const i18n = getLocale(plugin.app);
    return {
          id: 'show-plan',
          name: i18n.command_show_plan_name,
          editorCallback: async (editor, view) => {
            const { text, link } = getActualBiblePlan(this.settings.bibleIndex)!;
            let resultText = `[${text}](${link})`;
            if (this.settings.pasteDate) { resultText = `${moment().format('DD.MM.YY')} ${resultText}` };
            editor.replaceSelection(resultText);
            this.settings.bibleIndex++;
            this.saveSettings();
          } 
        }
    }