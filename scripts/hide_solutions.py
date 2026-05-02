#!/usr/bin/env python3
"""Wraps non-bash code blocks in task.md files with <details> spoilers."""

import re
from pathlib import Path

LESSONS_DIR = Path(__file__).parent.parent / "lessons"
VISIBLE_LANGS = {"bash", "sh", "shell"}


def wrap_code_blocks(text: str) -> str:
    lines = text.split("\n")
    result = []
    i = 0
    while i < len(lines):
        line = lines[i]
        fence_match = re.match(r"^(```+|~~~+)(\w*)$", line)
        if fence_match:
            fence = fence_match.group(1)
            lang = fence_match.group(2).lower()
            # Collect the full code block
            block = [line]
            i += 1
            while i < len(lines):
                block.append(lines[i])
                if lines[i].startswith(fence) and lines[i].strip() == fence:
                    i += 1
                    break
                i += 1
            if lang in VISIBLE_LANGS:
                result.extend(block)
            else:
                result.append("<details>")
                result.append("<summary>Show hint</summary>")
                result.append("")
                result.extend(block)
                result.append("")
                result.append("</details>")
        else:
            result.append(line)
            i += 1
    return "\n".join(result)


def main():
    task_files = sorted(LESSONS_DIR.glob("*/task.md"))
    for path in task_files:
        original = path.read_text()
        updated = wrap_code_blocks(original)
        if updated != original:
            path.write_text(updated)
            print(f"Updated: {path.relative_to(LESSONS_DIR.parent)}")
        else:
            print(f"No change: {path.relative_to(LESSONS_DIR.parent)}")


if __name__ == "__main__":
    main()
