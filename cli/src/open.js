import { spawn } from "node:child_process";
import { platform } from "node:process";

/**
 * Open a file/path in the OS default application (browser for .html).
 * Non-blocking and best-effort: failures are reported but never throw.
 */
export function openInBrowser(filePath) {
  let cmd, args;
  if (platform === "win32") {
    // empty "" is the window title arg required by `start`
    cmd = "cmd";
    args = ["/c", "start", "", filePath];
  } else if (platform === "darwin") {
    cmd = "open";
    args = [filePath];
  } else {
    cmd = "xdg-open";
    args = [filePath];
  }
  try {
    const child = spawn(cmd, args, { detached: true, stdio: "ignore" });
    child.on("error", (err) => {
      console.error(`Could not open ${filePath}: ${err.message}`);
    });
    child.unref();
  } catch (err) {
    console.error(`Could not open ${filePath}: ${err.message}`);
  }
}
