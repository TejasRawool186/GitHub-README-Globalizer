/**
 * Markdown Translator
 * Uses Lingo.dev SDK with AST parsing to translate markdown while preserving code blocks
 */

import { LingoDotDevEngine } from "lingo.dev/sdk";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";

export class MarkdownTranslator {
    /**
     * @param {string} apiKey - Lingo.dev API key
     */
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("Lingo.dev API Key is missing! Please provide it in input or set LINGO_TOKEN env var.");
        }
        this.lingo = new LingoDotDevEngine({ apiKey });
    }

    /**
     * Translates markdown content to target language while preserving code blocks
     * @param {string} markdown - Source markdown content
     * @param {string} targetLang - Target language code (e.g., 'es', 'zh')
     * @returns {Promise<string>} - Translated markdown
     */
    async translate(markdown, targetLang) {
        // 1. Parse markdown to AST
        const processor = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkStringify, {
                bullet: '-',
                fence: '`',
                fences: true,
                incrementListMarker: true
            });

        const ast = processor.parse(markdown);

        // 2. Extract text nodes (skip code blocks and inline code)
        const textNodes = {};
        const nodeMap = new Map();

        visit(ast, (node) => {
            // Only translate text content nodes
            if (node.type === 'text') {
                const value = node.value?.trim();
                // Skip empty text, URLs, and very short strings
                if (value &&
                    value.length > 2 &&
                    !value.startsWith('http') &&
                    !value.match(/^[a-zA-Z0-9._-]+$/)) {  // Skip things that look like code identifiers
                    const id = `t_${Math.random().toString(36).substring(2, 9)}`;
                    textNodes[id] = node.value;
                    nodeMap.set(id, node);
                }
            }
        });

        // If no text to translate, return original
        if (Object.keys(textNodes).length === 0) {
            console.log('No translatable text found, returning original');
            return markdown;
        }

        console.log(`Found ${Object.keys(textNodes).length} text nodes to translate`);

        // 3. Batch translate via Lingo.dev SDK
        let translatedMap;
        try {
            translatedMap = await this.lingo.localizeObject(textNodes, {
                sourceLocale: "en",
                targetLocale: targetLang,
            });
        } catch (error) {
            console.error('Lingo.dev translation error:', error.message);
            throw new Error(`Translation failed: ${error.message}`);
        }

        // 4. Reassemble AST with translated content
        for (const [id, node] of nodeMap) {
            if (translatedMap[id]) {
                node.value = translatedMap[id];
            }
        }

        // 5. Stringify back to markdown
        const result = processor.stringify(ast);

        // 6. Add "Powered by" footer
        const footer = `\n\n---\n> 🌍 Translated by [Open Source Globalizer](https://apify.com) powered by [Lingo.dev](https://lingo.dev)`;

        return result + footer;
    }
}
