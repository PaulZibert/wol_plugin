import { App } from "obsidian";
import * as en from "../i18n/en.json";
import * as ru from "../i18n/ru.json";
import * as de from "../i18n/de.json";
import * as moment from "moment"

export type Locale = typeof en;

export function getLocale(app: App): Locale {
  const locale = (app as any).locale ?? "en";
  console.log(moment.locale(),app.locale)
  const lang = locale.split("-")[0];
  switch (lang) {
    case "de":
      return de;
    case "ru":
      return ru;
    default:
      return ru;
  }
}

export function t(app: App, key: keyof Locale): string {
  const locale = getLocale(app);
  return locale[key] || en[key] || key;
}
