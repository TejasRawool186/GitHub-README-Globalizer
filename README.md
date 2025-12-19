# 🌍 Open Source Globalizer

**Translate your GitHub documentation into any language without breaking your code.**

[![Powered by Lingo.dev](https://img.shields.io/badge/Powered%20by-Lingo.dev-blue?style=for-the-badge)](https://lingo.dev)
[![Apify Actor](https://img.shields.io/badge/Apify-Actor-green?style=for-the-badge)](https://apify.com)
[![16+ Languages](https://img.shields.io/badge/Languages-16+-orange?style=for-the-badge)](#supported-languages)

---

## 🚀 What It Does

This Apify Actor fetches markdown documentation from any GitHub repository, translates it into your chosen languages using **Lingo.dev AI**, and delivers perfectly formatted files ready to commit.

> 💡 **Perfect for**: Open source maintainers, documentation teams, and anyone who wants to make their projects accessible globally!

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🛡️ **Code-Safe** | Uses AST parsing to protect all code blocks, inline code, and commands |
| 📄 **Multi-File** | Translate README, CONTRIBUTING, CHANGELOG, and more in one run |
| 🌿 **Branch Support** | Specify any branch (main, develop, v2) or auto-detect |
| 🌍 **16 Languages** | From Spanish to Thai, covering 2+ billion native speakers |
| 📊 **Progress Tracking** | Real-time status updates during translation |
| 📥 **Direct Download** | One-click download links for all translated files |

---

## 🌐 Supported Languages

| Language | Code | Language | Code |
|----------|------|----------|------|
| 🇪🇸 Spanish | `es` | 🇰🇷 Korean | `ko` |
| 🇫🇷 French | `fr` | 🇸🇦 Arabic | `ar` |
| 🇩🇪 German | `de` | 🇮🇹 Italian | `it` |
| 🇨🇳 Chinese | `zh` | 🇳🇱 Dutch | `nl` |
| 🇯🇵 Japanese | `ja` | 🇵🇱 Polish | `pl` |
| 🇧🇷 Portuguese | `pt` | 🇹🇷 Turkish | `tr` |
| 🇷🇺 Russian | `ru` | 🇻🇳 Vietnamese | `vi` |
| 🇮🇳 Hindi | `hi` | 🇹🇭 Thai | `th` |

---

## 📦 How to Use

### Step 1: Get Your API Key
1. Visit [lingo.dev](https://lingo.dev)
2. Sign up / Sign in
3. Go to Dashboard → Developer API
4. Generate your API Key

### Step 2: Configure the Actor
1. Enter your **GitHub Repository URL**
   - Example: `https://github.com/apify/crawlee`
2. Select **Branch** (optional, auto-detects if empty)
3. Choose **Files to Translate**
   - README.md, CONTRIBUTING.md, CHANGELOG.md, etc.
4. Select **Target Languages**
   - Pick from 16 supported languages
5. Paste your **Lingo.dev API Key**

### Step 3: Run & Download
- Click **Start** and watch the progress
- Download translated files from the results table

---

## 📊 Output Example

Each translation produces a row in the dataset:

| File | Language | Status | Words | Download |
|------|----------|--------|-------|----------|
| README.md | 🇪🇸 Spanish | ✅ Success | 1,250 | [📥 Download](#) |
| README.md | 🇨🇳 Chinese | ✅ Success | 1,180 | [📥 Download](#) |
| CONTRIBUTING.md | 🇪🇸 Spanish | ✅ Success | 450 | [📥 Download](#) |

---

## 🎯 Use Cases

- **Open Source Projects**: Make your documentation accessible to contributors worldwide
- **Developer Tools**: Translate SDK documentation for global adoption
- **Startups**: Localize your GitHub README for international markets
- **Education**: Translate tutorials and guides for students globally

---

## 🔧 Technical Details

### How It Works

1. **Fetch**: Downloads markdown files from GitHub (with branch auto-detection)
2. **Parse**: Uses Remark AST to separate text from code
3. **Translate**: Sends text nodes to Lingo.dev AI (code blocks untouched)
4. **Reassemble**: Rebuilds the markdown with translated content
5. **Deliver**: Stores files with direct download links

### What Stays Untouched

- ✅ Code blocks (```js, ```python, etc.)
- ✅ Inline code (`npm install`)
- ✅ URLs and links
- ✅ HTML tags
- ✅ Markdown formatting

---

## 📄 License

ISC License - Use freely for any purpose.

---

*Made with ❤️ by [Tejas Rawool](https://github.com/TejasRawool186) | Powered by [Lingo.dev](https://lingo.dev) & [Apify](https://apify.com)*
