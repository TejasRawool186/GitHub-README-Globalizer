# 🌍 Open Source Globalizer

**Translate your GitHub README.md into any language without breaking your code.**

[![Powered by Lingo.dev](https://img.shields.io/badge/Powered%20by-Lingo.dev-blue)](https://lingo.dev)
[![Apify Actor](https://img.shields.io/badge/Apify-Actor-green)](https://apify.com)

## 🚀 What It Does

This Apify Actor fetches a `README.md` from any GitHub repository, translates it into your chosen languages using **Lingo.dev AI**, and delivers perfectly formatted Markdown files ready to commit.

### ✨ The Secret Sauce

We use **AST (Abstract Syntax Tree) parsing** to surgically separate "human text" from "computer code". This means:

- ✅ Your `npm install` commands stay as `npm install` (not `npm instalar`)
- ✅ Code blocks remain untouched
- ✅ Inline code preserves formatting
- ✅ Links and URLs stay intact

## 🎯 Features

| Feature | Description |
|---------|-------------|
| **Code-Safe** | Uses Remark AST parsing to protect all code blocks |
| **Multilingual** | Spanish, Chinese, Japanese, French, German, Portuguese, Russian, Hindi |
| **Instant Download** | Get `.md` files with one-click download links |
| **Table View** | "Google Maps style" dashboard in Apify Console |
| **Health Check Proof** | 100% Reliability Score guaranteed |

## 📦 How to Use

1. **Enter your GitHub Repo URL**
   - Example: `https://github.com/apify/crawlee`

2. **Select Target Languages**
   - Choose from: `es`, `zh`, `ja`, `fr`, `de`, `pt`, `ru`, `hi`

3. **Run the Actor**
   - View results in the beautiful Table View
   - Download translated files with one click!

## 🔑 API Key

You have two options:

1. **Provide your own**: Enter your Lingo.dev API key in the input
2. **Use the Actor's key**: Leave empty to use the default (pay-per-use)

## 📊 Output

Each translation produces:

```json
{
  "language": "ES",
  "file_name": "README.es.md",
  "status": "✅ Success",
  "download_url": "https://api.apify.com/v2/...",
  "preview_snippet": "Translated content preview..."
}
```

## 🏆 Built For

- **Lingo.dev Hackathon 2025** - Showcasing the power of AI translation
- **Apify $1M Challenge** - Gold standard user experience

---

*Made with ❤️ by [Tejas Rawool](https://github.com/TejasRawool) | Powered by [Lingo.dev](https://lingo.dev) & [Apify](https://apify.com)*
