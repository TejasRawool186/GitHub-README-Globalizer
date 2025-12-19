/**
 * GitHub Utilities
 * Fetches raw markdown content from GitHub repository URL
 */

/**
 * Converts a GitHub repo URL to raw content URL and fetches file
 * @param {string} repoUrl - GitHub repository URL (e.g., https://github.com/apify/crawlee)
 * @param {string} filePath - Path to file in repo (e.g., README.md, docs/README.md)
 * @param {string} branch - Branch name (optional, auto-detects if empty)
 * @returns {Promise<{content: string, branch: string}>} - Raw content and detected branch
 */
export async function fetchGitHubFile(repoUrl, filePath = 'README.md', branch = '') {
    // Parse the repository URL
    const urlPattern = /github\.com\/([^/]+)\/([^/]+)/;
    const match = repoUrl.match(urlPattern);

    if (!match) {
        throw new Error(`Invalid GitHub URL: ${repoUrl}`);
    }

    const [, owner, repo] = match;
    // Clean repo name (remove .git suffix if present)
    const cleanRepo = repo.replace(/\.git$/, '');

    // If branch is specified, use it directly
    if (branch && branch.trim()) {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch.trim()}/${filePath}`;
        const response = await fetch(rawUrl);

        if (!response.ok) {
            throw new Error(`File not found: ${filePath} on branch ${branch}`);
        }

        const content = await response.text();
        return { content, branch: branch.trim() };
    }

    // Auto-detect branch (try main, master, then others)
    const branchesToTry = ['main', 'master', 'develop', 'dev'];

    for (const tryBranch of branchesToTry) {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${tryBranch}/${filePath}`;

        try {
            const response = await fetch(rawUrl);

            if (response.ok) {
                const content = await response.text();
                console.log(`✅ Found ${filePath} on branch: ${tryBranch}`);
                return { content, branch: tryBranch };
            }
        } catch (error) {
            // Continue to next branch
        }
    }

    throw new Error(`Could not find ${filePath} in ${repoUrl}. Tried branches: ${branchesToTry.join(', ')}`);
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use fetchGitHubFile instead
 */
export async function fetchRawGithub(repoUrl) {
    const result = await fetchGitHubFile(repoUrl, 'README.md', '');
    return result.content;
}
