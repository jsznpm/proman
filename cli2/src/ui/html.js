import htm from "htm";
import { createElement } from "react";

// htm bound to React.createElement — lets us write JSX-like markup with no
// build step (plain Node ESM).
export const html = htm.bind(createElement);
