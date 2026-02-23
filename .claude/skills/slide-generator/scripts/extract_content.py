#!/usr/bin/env python3
"""
Extract content from PDF and Markdown files for slide generation.

Usage:
    python extract_content.py file1.pdf file2.md [--output extracted.json]

Output: JSON with structured content including:
  - full_text: combined extracted text
  - sections: heading-based structure
  - tables: extracted tables (from PDFs)
  - source_files: list of processed files
"""

import sys
import os
import re
import json
import argparse


def extract_pdf(filepath):
    """Extract text and tables from a PDF file."""
    result = {"text": "", "tables": [], "source": os.path.basename(filepath)}

    try:
        import pdfplumber
        with pdfplumber.open(filepath) as pdf:
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    result["text"] += f"\n\n--- Page {i+1} ---\n\n{page_text}"

                page_tables = page.extract_tables()
                if page_tables:
                    for table in page_tables:
                        result["tables"].append({
                            "page": i + 1,
                            "data": table
                        })
    except ImportError:
        # Fallback to pypdf
        from pypdf import PdfReader
        reader = PdfReader(filepath)
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                result["text"] += f"\n\n--- Page {i+1} ---\n\n{text}"

    return result


def extract_markdown(filepath):
    """Extract structured content from a Markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    result = {
        "text": content,
        "tables": [],
        "source": os.path.basename(filepath)
    }

    # Extract headings structure
    headings = []
    for match in re.finditer(r'^(#{1,6})\s+(.+)$', content, re.MULTILINE):
        level = len(match.group(1))
        title = match.group(2).strip()
        headings.append({"level": level, "title": title, "pos": match.start()})

    result["headings"] = headings

    # Extract markdown tables
    table_pattern = r'(\|.+\|)\n(\|[-:\s|]+\|)\n((?:\|.+\|\n?)+)'
    for match in re.finditer(table_pattern, content):
        header = [cell.strip() for cell in match.group(1).split('|')[1:-1]]
        rows = []
        for row_line in match.group(3).strip().split('\n'):
            row = [cell.strip() for cell in row_line.split('|')[1:-1]]
            rows.append(row)
        result["tables"].append({
            "header": header,
            "rows": rows
        })

    return result


def build_sections(extractions):
    """Build a unified section structure from all extractions."""
    sections = []
    full_text = ""

    for ext in extractions:
        full_text += f"\n\n=== Source: {ext['source']} ===\n\n"
        full_text += ext["text"]

        if "headings" in ext:
            for h in ext["headings"]:
                sections.append({
                    "level": h["level"],
                    "title": h["title"],
                    "source": ext["source"]
                })

    return {
        "full_text": full_text.strip(),
        "sections": sections,
        "tables": sum([ext["tables"] for ext in extractions], []),
        "source_files": [ext["source"] for ext in extractions]
    }


def main():
    parser = argparse.ArgumentParser(description="Extract content from PDF and Markdown files")
    parser.add_argument("files", nargs="+", help="PDF and/or Markdown files to process")
    parser.add_argument("--output", "-o", default="extracted_content.json",
                        help="Output JSON file path")

    args = parser.parse_args()

    extractions = []

    for filepath in args.files:
        if not os.path.exists(filepath):
            print(f"Warning: File not found: {filepath}", file=sys.stderr)
            continue

        ext = os.path.splitext(filepath)[1].lower()

        if ext == ".pdf":
            print(f"Extracting PDF: {filepath}")
            extractions.append(extract_pdf(filepath))
        elif ext in (".md", ".markdown"):
            print(f"Extracting Markdown: {filepath}")
            extractions.append(extract_markdown(filepath))
        else:
            print(f"Warning: Unsupported file type: {filepath}", file=sys.stderr)

    if not extractions:
        print("Error: No valid files processed.", file=sys.stderr)
        sys.exit(1)

    result = build_sections(extractions)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nExtracted content saved to: {args.output}")
    print(f"  Sources: {len(result['source_files'])}")
    print(f"  Sections: {len(result['sections'])}")
    print(f"  Tables: {len(result['tables'])}")
    print(f"  Text length: {len(result['full_text'])} chars")


if __name__ == "__main__":
    main()