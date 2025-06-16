declare module "./main.js" {
  export function initMarkdownRenderer(): void;
  export function handleFrontMatter(markdown: string): {
    title?: string;
    description?: string;
    cover?: string;
    body: string;
  };
  export function renderMarkdown(
    content: string,
    themeId: string
  ): Promise<string>;
}

export {};
