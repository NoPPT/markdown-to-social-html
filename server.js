import express from "express";
import { convertMarkdownToWxgzhSocialHtml } from "./dist/index.js";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = 3000;

// 添加中间件来解析JSON请求体
app.use(express.json({ limit: "2mb" }));
// 添加中间件来解析URL编码的请求体
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// 添加请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Content-Type:", req.headers["content-type"]);
  // console.log("Request body:", req.body);
  next();
});

app.post("/", async (req, res) => {
  const { content, themeId } = req.body || {};

  if (!content) {
    return res.status(400).send("Missing required parameter: content");
  }

  const result = await convertMarkdownToWxgzhSocialHtml(
    content,
    themeId || "default"
  );
  res.send(result.html);
});

app.get("/", async (req, res) => {
  const { themeId } = req.query || {};

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const path = join(__dirname, "test/test.md");
  const md = await readFile(path, "utf8");

  const result = await convertMarkdownToWxgzhSocialHtml(
    md,
    themeId || "default"
  );
  res.send(result.html);
});

// 添加错误处理中间件
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
