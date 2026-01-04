import { App, Plugin } from "obsidian";
import makeWolLink from "./makeWolLink";
import createMakeLinksCommand from "./makeLinks";
import createParseChapterCommand from "./parseChapter";
import recognizeText from "./recognize-text";
import WolLinkPlugin from "main";
import BiblePlan from "./bible-plan";
import importWT from "./importWT";

export function initCommands(plugin:WolLinkPlugin) {
    const app = plugin;
    plugin.addCommand(makeWolLink(plugin));
    plugin.addCommand(createMakeLinksCommand(plugin));
    plugin.addCommand(createParseChapterCommand(plugin));
    plugin.addCommand(recognizeText(plugin));
    plugin.addCommand(BiblePlan(plugin))
    plugin.addCommand(importWT(plugin));
}