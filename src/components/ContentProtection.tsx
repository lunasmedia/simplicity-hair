"use client";

import { useEffect } from "react";

/**
 * Deters casual copying of text and saving of images.
 *
 * Note: nothing on a public website can make this impossible (screenshots,
 * browser dev tools and the browser cache all still work). This blocks the
 * everyday routes: right-click / long-press menus, text selection + copy,
 * dragging images out, and the Save Page / View Source shortcuts.
 *
 * Form fields and anything marked with the `allow-copy` class stay usable,
 * so visitors can still type, and copy things like the studio email address
 * or their booking reference.
 */
const ALLOWED = 'input, textarea, select, [contenteditable="true"], .allow-copy';

const isAllowed = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest(ALLOWED);

export function ContentProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (!isAllowed(e.target)) e.preventDefault();
    };

    const onCopy = (e: ClipboardEvent) => {
      const sel = document.getSelection();
      const anchor = sel?.anchorNode instanceof Element ? sel.anchorNode : sel?.anchorNode?.parentElement;
      if (!isAllowed(e.target) && !isAllowed(anchor ?? null)) e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      // Save page (S) and view source (U)
      if (key === "s" || key === "u") e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCopy);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCopy);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
