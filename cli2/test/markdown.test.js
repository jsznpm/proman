import { test } from "node:test";
import assert from "node:assert/strict";
import { renderMarkdownToAnsi } from "../src/markdown.js";
import { mdToHtml } from "../src/render.js";

test("renderMarkdownToAnsi returns a string containing the text", () => {
  const out = renderMarkdownToAnsi("# Hello\n\nworld");
  assert.equal(typeof out, "string");
  assert.match(out, /Hello/);
  assert.match(out, /world/);
});

test("terminal renderer does not break the HTML renderer (isolated marked)", () => {
  renderMarkdownToAnsi("# Heading");
  const html = mdToHtml("# Heading", { title: "t" });
  assert.match(html, /<h1[^>]*>Heading<\/h1>/);
});
