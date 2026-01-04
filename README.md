# WolLinkPlugin - Your Ultimate Bible Study Companion for Obsidian

![GitHub release (latest by date)](https://img.shields.io/github/v/release/<your-github-username>/<your-repo-name>)
![GitHub all releases](https://img.shields.io/github/downloads/<your-github-username>/<your-repo-name>/total)
![GitHub last commit](https://img.shields.io/github/last-commit/<your-github-username>/<your-repo-name>)

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
  - [Manual Installation](#manual-installation)
- [Usage](#usage)
- [Commands](#commands)
- [Settings](#settings)

## About

WolLinkPlugin is an Obsidian plugin designed to enhance your Bible study and note-taking experience, particularly for users who frequently reference the Watchtower Online Library (wol.jw.org) and wish to leverage the power of Artificial Intelligence for verse identification. It streamlines the process of creating links to biblical texts and provides tools for intelligent text processing.

## Features

*   **Smart Wol.jw.org Link Generation**: Easily convert selected Bible references into direct links to wol.jw.org, supporting various reference formats (e.g., "Бт 1:1", "Бытие 1:1-5").
*   **AI-Powered Bible Verse Identification**: Utilize Google Generative AI to identify the most relevant Bible verse from any selected text, making contextual verse lookup effortless.
*   **Bible Reading Plan Integration**: Quickly insert your current Bible reading plan entry (text and corresponding wol.jw.org link) into your notes, with an option to include the current date.
*   **Automatic Internal Link Creation**: Automatically transforms words in your notes into internal Obsidian links by matching them against existing Markdown file basenames in your vault, ensuring consistent cross-referencing.
*   **Text Cleanup for Bible Chapters**: A dedicated command to clean up copied text from chapters, by escaping special characters and reformatting specific link patterns for better readability within Obsidian.

## Installation

### From within Obsidian (Recommended)

1.  Open Obsidian **Settings**.
2.  Go to **Community plugins**.
3.  Click **Browse** and search for "WolLinkPlugin".
4.  Click **Install**.
5.  Once installed, enable the plugin in the **Community plugins** tab.

### Manual Installation

1.  Download the latest `main.js`, `manifest.json`, and `styles.css` (if present) from the [releases page](https://github.com/<your-github-username>/<your-repo-name>/releases).
2.  Create a new folder named `wol-link-plugin` in your vault's `.obsidian/plugins/` directory.
3.  Copy the downloaded files into this new folder.
4.  Reload Obsidian.
5.  Go to **Settings → Community plugins** and enable the plugin.

## Usage

WolLinkPlugin integrates seamlessly into your Obsidian workflow through a set of powerful commands. Simply open the Command Palette (`Cmd/Ctrl + P`) and search for the commands listed below.

## Commands

This plugin adds the following commands to Obsidian's command palette:

*   **`WolLinkPlugin: Сделать ссылку на онлайн библиотеку`** (`make-wol-link`)
    *   **Description**: Converts selected Bible references (e.g., "Бт 1:1", "Бытие 1:1-5") into markdown links pointing to the Watchtower Online Library (wol.jw.org).
    *   **How to use**: Select a Bible reference in your editor and run this command.

*   **`WolLinkPlugin: Опознать библейский стих`** (`gemini`)
    *   **Description**: Uses Google Generative AI to identify the most fitting Bible verse for your selected text. Requires a configured Gemini API Key.
    *   **How to use**: Select a passage of text and run this command. The identified verse will replace your selection.

*   **`WolLinkPlugin: Показать план`** (`show-plan`)
    *   **Description**: Inserts the current entry from your personalized Bible reading plan, including a link to wol.jw.org. Optionally adds the current date.
    *   **How to use**: Run this command to insert the plan entry. The plugin automatically advances to the next entry.

*   **`WolLinkPlugin: Создать ссылки`** (`make-links`)
    *   **Description**: Automatically scans your note for words that match existing Markdown file names in your vault's root and converts them into internal Obsidian links `[[filename|word]]`. Each file will be linked only once per note.
    *   **How to use**: Run this command on your active note to create internal links.

*   **`WolLinkPlugin: Убрать лишнее в главе`** (`parse`)
    *   **Description**: Cleans up selected text, primarily designed for content copied from Bible chapters. It escapes single asterisks and reformats specific link patterns (e.g., `[1](...)` becomes `**1**`, `[+](...)` is removed).
    *   **How to use**: Select text you wish to clean and run this command.

## Settings

To configure WolLinkPlugin:

1.  Open Obsidian **Settings**.
2.  Navigate to **Community plugins** and find "WolLinkPlugin".
3.  Click on the gear icon next to it or the plugin name to open its settings.

Available settings:

*   **Gemini API Key**: Your API key for accessing Google Generative AI services. This is required for the "Опознать библейский стих" command.
*   **Bible Index**: Controls your progress through the integrated Bible reading plan. You can manually adjust this to start at a specific point.
*   **Paste Date**: A toggle to include the current date automatically when inserting a Bible reading plan entry using the "Показать план" command.