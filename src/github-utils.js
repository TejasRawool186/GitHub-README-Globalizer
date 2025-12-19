/**
 * GitHub Utilities
 * Fetches raw README.md content from GitHub repository URL
 */

/**
 * Converts a GitHub repo URL to raw README.md URL and fetches content
 * @param {string} repoUrl - GitHub repository URL (e.g., https://github.com/apify/crawlee)
 * @returns {Promise<string>} - Raw markdown content
 */
export async function fetchRawGithub(repoUrl) {
    // Parse the repository URL
    const urlPattern = /github\.com\/([^/]+)\/([^/]+)/;
    const match = repoUrl.match(urlPattern);
    
    if (!match) {
        throw new Error(`Invalid GitHub URL: ${repoUrl}`);
    }
    
    const [, owner, repo] = match;
    // Clean repo name (remove .git suffix if present)
    const cleanRepo = repo.replace(/\.git$/, '');
    
    // Try multiple branch names (main, master)
    const branches = ['main', 'master'];
    
    for (const branch of branches) {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}/README.md`;
        
        try {
            console.log(`Trying to fetch README from: ${rawUrl}`);
            const response = await fetch(rawUrl);
            
            if (response.ok) {
                const content = await response.text();
                console.log(`Successfully fetched README.md (${content.length} bytes)`);
                return content;
            }
        } catch (error) {
            console.log(`Branch ${branch} not found, trying next...`);
        }
    }
    
    throw new Error(`Could not find README.md in ${repoUrl}. Tried branches: ${branches.join(', ')}`);
}
