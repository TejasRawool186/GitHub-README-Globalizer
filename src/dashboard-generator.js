/**
 * Dashboard Generator Module
 * Creates a main HTML dashboard showing all translations with download links
 */

/**
 * Generate the main dashboard HTML with all translation results
 * @param {Array} translations - Array of translation results
 * @param {string} repoUrl - Original repository URL
 * @returns {string} Complete HTML document
 */
export function generateDashboard(translations, repoUrl) {
    const successCount = translations.filter(t => t.status === '✅ Success').length;
    const totalCount = translations.length;

    const translationCards = translations.map(t => `
        <div class="translation-card ${t.status === '✅ Success' ? 'success' : 'error'}">
            <div class="card-header">
                <span class="language">${t.language}</span>
                <span class="status">${t.status}</span>
            </div>
            <div class="card-body">
                <p class="file-name">📄 ${t.file}</p>
                <p class="preview">${t.preview || ''}</p>
                <div class="stats">
                    <span>📝 ${t.word_count || 0} words</span>
                    <span>📊 ${t.char_count || 0} chars</span>
                </div>
            </div>
            <div class="card-actions">
                ${t.download_url ? `<a href="${t.download_url}" class="btn btn-download" download>⬇️ Download .md</a>` : ''}
                ${t.html_preview_url ? `<a href="${t.html_preview_url}" class="btn btn-preview" target="_blank">👁️ View HTML</a>` : ''}
            </div>
        </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌍 Open Source Globalizer - Translation Results</title>
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
            padding: 30px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(35, 134, 54, 0.3);
        }
        
        .header h1 {
            font-size: 2rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .header p {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .stats-banner {
            background: #21262d;
            padding: 20px;
            display: flex;
            justify-content: center;
            gap: 40px;
            border-bottom: 1px solid #30363d;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #58a6ff;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #8b949e;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
        }
        
        .translations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        
        .translation-card {
            background: #161b22;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #30363d;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .translation-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .translation-card.success {
            border-left: 4px solid #238636;
        }
        
        .translation-card.error {
            border-left: 4px solid #f85149;
        }
        
        .card-header {
            background: #21262d;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .language {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .status {
            font-size: 0.9rem;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .file-name {
            font-weight: 600;
            margin-bottom: 10px;
            color: #58a6ff;
        }
        
        .preview {
            font-size: 0.9rem;
            color: #8b949e;
            margin-bottom: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .stats {
            display: flex;
            gap: 20px;
            font-size: 0.85rem;
            color: #8b949e;
        }
        
        .card-actions {
            padding: 15px 20px;
            background: #0d1117;
            display: flex;
            gap: 10px;
        }
        
        .btn {
            flex: 1;
            padding: 10px 15px;
            border-radius: 6px;
            text-decoration: none;
            text-align: center;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        
        .btn-download {
            background: #238636;
            color: white;
        }
        
        .btn-download:hover {
            background: #2ea043;
        }
        
        .btn-preview {
            background: #21262d;
            color: #58a6ff;
            border: 1px solid #30363d;
        }
        
        .btn-preview:hover {
            background: #30363d;
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            color: #8b949e;
            border-top: 1px solid #30363d;
            margin-top: 30px;
        }
        
        .footer a {
            color: #58a6ff;
            text-decoration: none;
        }
        
        .repo-link {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background: #21262d;
            border-radius: 6px;
            color: #58a6ff;
            text-decoration: none;
        }
        
        .repo-link:hover {
            background: #30363d;
        }
        
        @media (max-width: 768px) {
            .stats-banner {
                flex-direction: column;
                gap: 15px;
            }
            
            .translations-grid {
                grid-template-columns: 1fr;
            }
            
            .card-actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>🌍 Open Source Globalizer</h1>
        <p>Your documentation has been translated!</p>
    </header>
    
    <div class="stats-banner">
        <div class="stat">
            <div class="stat-value">${successCount}</div>
            <div class="stat-label">Successful Translations</div>
        </div>
        <div class="stat">
            <div class="stat-value">${totalCount}</div>
            <div class="stat-label">Total Files</div>
        </div>
    </div>
    
    <main class="container">
        <div class="translations-grid">
            ${translationCards}
        </div>
    </main>
    
    <footer class="footer">
        <p>Generated with ❤️ by <a href="https://apify.com" target="_blank">Apify</a></p>
        <p>Powered by <a href="https://lingo.dev" target="_blank">Lingo.dev</a> AI Translation</p>
        ${repoUrl ? `<a href="${repoUrl}" class="repo-link" target="_blank">📦 View Original Repository</a>` : ''}
    </footer>
</body>
</html>`;
}
