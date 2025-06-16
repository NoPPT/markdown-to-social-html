import { JSDOM } from "jsdom";

export function existImageInHtml(content: string) {
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const images = Array.from(document.querySelectorAll("img"));
  const imgs = images
    .map((element) => {
      const dataSrc = element.getAttribute("src");
      if (dataSrc) {
        return dataSrc;
      }
      return null;
    })
    .filter((item) => !!item);

  // imgs[0]?.startsWith("https://mmbiz.qpic.cn")
  return imgs && imgs.length > 0;
}
