import { test } from "node:test";
import assert from "node:assert/strict";
import { extractUrl } from "../src/commands/list.js";
import { isPodcastFolder } from "../src/config.js";

test("extractUrl pulls a bare URL", () => {
  assert.equal(extractUrl("https://example.com/ep1\n"), "https://example.com/ep1");
});

test("extractUrl pulls URL from a Markdown link", () => {
  assert.equal(
    extractUrl("[Episode 1](https://example.com/ep1) notes"),
    "https://example.com/ep1"
  );
});

test("extractUrl returns null when no link", () => {
  assert.equal(extractUrl("no link here"), null);
});

test("isPodcastFolder matches case-insensitively", () => {
  assert.equal(isPodcastFolder("podcast"), true);
  assert.equal(isPodcastFolder("Podcast"), true);
  assert.equal(isPodcastFolder("blog"), false);
});
