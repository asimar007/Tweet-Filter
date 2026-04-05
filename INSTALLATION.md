# ZenX — Installation Guide

> ZenX is not yet published on the Chrome Web Store. This guide walks you through installing it manually from source in under 2 minutes.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Chrome / Chromium Installation](#chrome--chromium-installation)
- [Firefox Installation](#firefox-installation)
- [Updating ZenX](#updating-zenx)
- [Uninstalling ZenX](#uninstalling-zenx)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

You need the following installed before you begin:

| Tool | Purpose | Install |
| --- | --- | --- |
| **Git** | Clone the repository | [git-scm.com](https://git-scm.com) |
| **Bun** | Install dependencies & build | `curl -fsSL https://bun.sh/install \| bash` |
| **Chrome / Brave / Edge** | Run the extension | Any Chromium-based browser |

Verify your setup:

```bash
git --version   # should print git version 2.x.x
bun --version   # should print 1.x.x
```

---

## Chrome / Chromium Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/asimar007/ZenX.git
cd ZenX
```

### Step 2 — Install Dependencies

```bash
bun install
```

### Step 3 — Build the Extension

```bash
bun run build
```

This produces a `.output/chrome-mv3/` folder. That is your built extension — do not delete it.

### Step 4 — Open Chrome Extensions Page

Open a new tab and navigate to:

```
chrome://extensions
```

Or go to: **Menu (⋮) → More Tools → Extensions**

### Step 5 — Enable Developer Mode

In the top-right corner of the Extensions page, toggle on **Developer Mode**.

```
┌─────────────────────────────────────────┐
│  Extensions              Developer mode ●│
└─────────────────────────────────────────┘
```

### Step 6 — Load the Extension

1. Click **"Load unpacked"** (appears after enabling Developer Mode)
2. In the file picker, navigate to your cloned folder
3. Select the `.output/chrome-mv3/` directory
4. Click **"Select Folder"**

ZenX will now appear in your extensions list with its icon.

### Step 7 — Pin ZenX to Your Toolbar

1. Click the **puzzle piece icon** (🧩) in the Chrome toolbar
2. Find **ZenX** in the list
3. Click the **pin icon** (📌) next to it

ZenX is now pinned and ready to use. Visit [x.com](https://x.com) to see it in action.

---

## Firefox Installation

### Step 1 — Clone & Build for Firefox

```bash
git clone https://github.com/asimar007/ZenX.git
cd ZenX
bun install
bun run build:firefox
```

This produces a `.output/firefox-mv2/` folder.

### Step 2 — Open Firefox Debugging Page

Open a new tab and navigate to:

```
about:debugging#/runtime/this-firefox
```

### Step 3 — Load Temporary Add-on

1. Click **"Load Temporary Add-on..."**
2. Navigate to your cloned folder
3. Open the `.output/firefox-mv2/` directory
4. Select any file inside it (e.g. `manifest.json`)

> **Note:** Temporary add-ons in Firefox are removed when the browser restarts. You will need to reload it each session until ZenX is published on Firefox Add-ons.

---

## Updating ZenX

When a new version is released, pull the latest changes and rebuild:

```bash
cd ZenX

# Pull latest changes
git pull origin main

# Rebuild
bun install
bun run build
```

Then go to `chrome://extensions` and click the **refresh icon** (🔄) on the ZenX card. No need to re-load unpacked — Chrome picks up the rebuilt files automatically.

---

## Uninstalling ZenX

### Chrome

1. Go to `chrome://extensions`
2. Find **ZenX**
3. Click **"Remove"**
4. Confirm the prompt

### Firefox

1. Go to `about:addons`
2. Find **ZenX** under Extensions
3. Click the **three-dot menu (⋯)** → **Remove**

---

## Troubleshooting

### Build fails with "command not found: bun"

Bun is not installed or not on your PATH. Install it:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then restart your terminal and try again.

---

### `.output/chrome-mv3/` folder does not exist after build

The build may have failed silently. Run:

```bash
bun run build
```

and check the terminal output for errors. Common causes:

- Missing `node_modules` — run `bun install` first
- TypeScript errors — run `bun run compile` to see them

---

### Extension loads but does nothing on x.com

1. Make sure the extension is **enabled** — check the toggle on `chrome://extensions`
2. Click the ZenX icon and verify the main toggle inside the popup is **ON**
3. Reload the x.com tab after enabling

---

### "This extension is not from the Chrome Web Store" warning

This is a standard Chrome warning for unpacked extensions. Click **"Keep"** or **"Enable anyway"** — this is safe because you built the extension yourself from the source code.

---

### Settings are not saving

ZenX uses Chrome Sync Storage. Make sure you are signed into Chrome. If you prefer not to sync, settings also fall back to local storage.

---

### Tweets are not being filtered

Open Chrome DevTools on x.com (`F12` → Console) and look for any ZenX-related errors. Common causes:

- X (Twitter) updated their DOM structure — open an [issue on GitHub](https://github.com/asimar007/ZenX/issues) with details
- The filter category for those keywords is unchecked — open the popup and verify

---

## Need Help?

- Open an issue: [github.com/asimar007/ZenX/issues](https://github.com/asimar007/ZenX/issues)
- Visit the landing page: [zenx.asimsk.site](https://zenx.asimsk.site)
