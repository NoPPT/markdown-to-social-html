import { Theme, themes } from "./theme.js";
import {
  initMarkdownRenderer,
  renderMarkdown,
  handleFrontMatter,
} from "./main.js";
import { existImageInHtml } from "./domParse.js";

initMarkdownRenderer();

export const convertMarkdownToWxgzhSocialHtml = async (
  content: string,
  themeId: string
) => {
  let theme: Theme | undefined = themes["default"];
  if (themeId) {
    theme = themes[themeId];
    if (!theme) {
      theme = Object.values(themes).find(
        (theme) => theme.name.toLowerCase() === themeId.toLowerCase()
      );
    }
  }

  if (!theme) {
    throw new Error("Invalid theme ID");
  }

  const preHandlerContent = handleFrontMatter(content);
  const title = preHandlerContent.title ?? "";
  const cover = preHandlerContent.cover ?? "";
  const digest = preHandlerContent.description ?? "";

  const html = await renderMarkdown(preHandlerContent.body, theme.id);

  const existImage = existImageInHtml(html);

  return {
    html,
    title,
    cover,
    digest,
    needCover: !existImage,
  };
};
