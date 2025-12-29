/**
 * HTML Generator Module
 * Converts translated Markdown to beautiful, styled HTML with download button
 */

import { marked } from 'marked';

// Language display names with flags
const LANGUAGE_NAMES = {
    es: { name: 'Spanish', flag: '🇪🇸' },
    fr: { name: 'French', flag: '🇫🇷' },
    de: { name: 'German', flag: '🇩🇪' },
    zh: { name: 'Chinese', flag: '🇨🇳' },
    ja: { name: 'Japanese', flag: '🇯🇵' },
    pt: { name: 'Portuguese', flag: '🇧🇷' },
    ru: { name: 'Russian', flag: '🇷🇺' },
    hi: { name: 'Hindi', flag: '🇮🇳' },
    ko: { name: 'Korean', flag: '🇰🇷' },
    ar: { name: 'Arabic', flag: '🇸🇦' },
    it: { name: 'Italian', flag: '🇮🇹' },
    nl: { name: 'Dutch', flag: '🇳🇱' },
    pl: { name: 'Polish', flag: '🇵🇱' },
    tr: { name: 'Turkish', flag: '🇹🇷' },
    vi: { name: 'Vietnamese', flag: '🇻🇳' },
    th: { name: 'Thai', flag: '🇹🇭' }
};

/**
 * Generate styled HTML from markdown content
 * @param {string} markdown - The translated markdown content
 * @param {string} langCode - Language code (e.g., 'es', 'fr')
 * @param {string} fileName - Original file name
 * @param {string} downloadUrl - URL to download the markdown file
 * @returns {string} Complete HTML document
 */
export function generateHtmlPreview(markdown, langCode, fileName, downloadUrl) {
    const lang = LANGUAGE_NAMES[langCode] || { name: langCode.toUpperCase(), flag: '🌍' };
    
    // Configure marked for GitHub-flavored markdown
    marked.setOptions({
        gfm: true,
        breaks: true
    });
    
    const htmlContent = marked.parse(markdown);
    
    return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName} - ${lang.name} Translation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
            color: #e6edf3;
            min-height: 100vh;
            line-height: 1.6;
        }
        
        .header {
            background: linear-gradient(90deg, #238636 0%, #2ea043 50%, #238636 100%);
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 20px rgba(35, 134, 54, 0.3);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .flag {
            font-size: 2.5rem;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        .header-info h1 {
            font-size: 1.4rem;
            font-weight: 600;
            color: white;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        
        .header-info p {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.9);
        }
        
        .download-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            background: white;
            color: #238636;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            background: #f0f6fc;
        }
        
        .download-btn svg {
            width: 20px;
            height: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 30px;
        }
        
        .content {
            background: #161b22;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            border: 1px solid #30363d;
        }
        
        /* GitHub-style Markdown Rendering */
        .content h1 {
            font-size: 2rem;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            color: #e6edf3;
        }
        
        .content h2 {
            font-size: 1.5rem;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.4rem;
            margin: 2rem 0 1rem;
            color: #e6edf3;
        }
        
        .content h3, .content h4, .content h5, .content h6 {
            margin: 1.5rem 0 0.75rem;
            color: #e6edf3;
        }
        
        .content p {
            margin-bottom: 1rem;
            color: #c9d1d9;
        }
        
        .content a {
            color: #58a6ff;
            text-decoration: none;
        }
        
        .content a:hover {
            text-decoration: underline;
        }
        
        .content code {
            background: #0d1117;
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 0.9em;
            color: #c9d1d9;
        }
        
        .content pre {
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            margin: 1rem 0;
        }
        
        .content pre code {
            background: transparent;
            padding: 0;
        }
        
        .content ul, .content ol {
            margin: 1rem 0;
            padding-left: 2rem;
            color: #c9d1d9;
        }
        
        .content li {
            margin: 0.5rem 0;
        }
        
        .content blockquote {
            border-left: 4px solid #238636;
            padding-left: 16px;
            margin: 1rem 0;
            color: #8b949e;
        }
        
        .content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        
        .content th, .content td {
            border: 1px solid #30363d;
            padding: 10px 15px;
            text-align: left;
        }
        
        .content th {
            background: #21262d;
            font-weight: 600;
        }
        
        .content img {
            max-width: 100%;
            border-radius: 8px;
            margin: 1rem 0;
        }
        
        .content hr {
            border: none;
            border-top: 1px solid #30363d;
            margin: 2rem 0;
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            color: #8b949e;
            font-size: 0.9rem;
        }
        
        .footer a {
            color: #58a6ff;
            text-decoration: none;
        }
        
        .powered-by {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 10px;
        }
        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .container {
                padding: 20px 15px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-left">
            <span class="flag">${lang.flag}</span>
            <div class="header-info">
                <h1>${fileName} - ${lang.name}</h1>
                <p>Translated by Open Source Globalizer</p>
            </div>
        </div>
        <a href="${downloadUrl}" class="download-btn" download>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5l-5-5h3V4h4v6.5h3l-5 5zM19 18H5v2h14v-2z"/>
            </svg>
            Download .md
        </a>
    </header>
    
    <main class="container">
        <article class="content">
            ${htmlContent}
        </article>
    </main>
    
    <footer class="footer">
        <p>Generated with ❤️ by <a href="https://apify.com" target="_blank">Apify</a></p>
        <div class="powered-by">
            🌍 Powered by <a href="https://lingo.dev" target="_blank">Lingo.dev</a> AI Translation
        </div>
    </footer>
</body>
</html>`;
}
