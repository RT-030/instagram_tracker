#!/usr/bin/env python3
"""Simple repository checks for the static frontend."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class IdCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if key == "id" and value:
                self.ids.append(value)


def check_required_files() -> list[str]:
    errors: list[str] = []
    required = ["index.html", "styles.css", "app.js"]
    for rel in required:
        path = ROOT / rel
        if not path.exists():
            errors.append(f"Missing required file: {rel}")
    return errors


def check_html_ids() -> list[str]:
    errors: list[str] = []
    html_path = ROOT / "index.html"
    content = html_path.read_text(encoding="utf-8")

    parser = IdCollector()
    parser.feed(content)
    ids = parser.ids

    duplicates = {element_id for element_id in ids if ids.count(element_id) > 1}
    if duplicates:
        errors.append(f"Duplicate id(s) in index.html: {', '.join(sorted(duplicates))}")

    required_ids = {
        "loginBtn",
        "authState",
        "metricsGrid",
        "interactionGrid",
        "lostFollowersList",
        "newFollowersList",
        "dontFollowBackList",
        "mutualList",
        "ghostFollowersList",
        "topFollowersList",
        "lostFollowingList",
        "blockEventsList",
    }
    missing = [element_id for element_id in sorted(required_ids) if element_id not in ids]
    if missing:
        errors.append(f"Missing required HTML id(s): {', '.join(missing)}")

    if "<title>" not in content.lower():
        errors.append("Missing <title> in index.html")

    return errors


def check_css_balance() -> list[str]:
    errors: list[str] = []
    css_path = ROOT / "styles.css"
    content = css_path.read_text(encoding="utf-8")

    open_braces = content.count("{")
    close_braces = content.count("}")
    if open_braces != close_braces:
        errors.append(
            "Unbalanced CSS braces in styles.css "
            f"(open={open_braces}, close={close_braces})"
        )

    if ":root" not in content:
        errors.append("Missing :root block in styles.css")

    return errors


def check_js_hooks() -> list[str]:
    errors: list[str] = []
    js_path = ROOT / "app.js"
    content = js_path.read_text(encoding="utf-8")

    required_patterns = [
        r'document\.getElementById\("loginBtn"\)',
        r"addEventListener\(\"click\"",
        r"const dashboardData",
        r"injectList\(",
    ]

    for pattern in required_patterns:
        if not re.search(pattern, content):
            errors.append(f"Missing expected JS pattern: {pattern}")

    return errors


def main() -> int:
    checks = [
        check_required_files,
        check_html_ids,
        check_css_balance,
        check_js_hooks,
    ]

    errors: list[str] = []
    for check in checks:
        errors.extend(check())

    if errors:
        print("❌ Code checks failed:")
        for error in errors:
            print(f" - {error}")
        return 1

    print("✅ All static code checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
