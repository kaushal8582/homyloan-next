const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function getAllJsxFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getAllJsxFiles(full, files);
    else if (e.name.endsWith('.jsx')) files.push(full);
  }
  return files;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let needsUseClient = false;

  // Skip if no react-router-dom
  if (!content.includes('react-router-dom')) return false;

  // useNavigate → useRouter
  if (content.includes('useNavigate')) {
    needsUseClient = true;
    content = content.replace(/import\s*\{\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useRouter } from "next/navigation";\n');
    content = content.replace(/import\s*\{\s*useNavigate\s*\}\s*from\s*['']react-router-dom[''];?\s*\n?/g, "import { useRouter } from 'next/navigation';\n");
    content = content.replace(/\bconst\s+navigate\s*=\s*useNavigate\s*\(\s*\)/g, 'const router = useRouter()');
    content = content.replace(/\bnavigate\s*\(/g, 'router.push(');
  }

  // useLocation → usePathname
  if (content.includes('useLocation')) {
    needsUseClient = true;
    content = content.replace(/import\s*\{\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { usePathname } from "next/navigation";\n');
    content = content.replace(/\bconst\s+location\s*=\s*useLocation\s*\(\s*\)/g, 'const pathname = usePathname()');
    content = content.replace(/\blocation\.pathname\b/g, 'pathname');
  }

  // useParams (keep name, change import)
  if (content.includes('useParams') && content.includes('react-router-dom')) {
    needsUseClient = true;
    content = content.replace(/import\s*\{\s*useParams\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useParams } from "next/navigation";\nimport Link from "next/link";\n');
    content = content.replace(/import\s*\{\s*Link\s*,\s*useParams\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useParams } from "next/navigation";\nimport Link from "next/link";\n');
    content = content.replace(/import\s*\{\s*useParams\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useParams } from "next/navigation";\n');
  }

  // useSearchParams
  if (content.includes('useSearchParams') && content.includes('react-router-dom')) {
    needsUseClient = true;
    content = content.replace(/import\s*\{\s*useSearchParams\s*,\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useSearchParams, useRouter } from "next/navigation";\n');
    content = content.replace(/\bconst\s+navigate\s*=\s*useNavigate\s*\(\s*\)/g, 'const router = useRouter()');
    content = content.replace(/\bnavigate\s*\(/g, 'router.push(');
  }

  // Link only (no useParams in same import)
  if (content.includes('from [\'"]react-router-dom[\'"]') && content.includes('Link') && !content.includes('useParams') && !content.includes('useNavigate') && !content.includes('useSearchParams')) {
    content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import Link from "next/link";\n');
    content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['']react-router-dom[''];?\s*\n?/g, "import Link from 'next/link';\n");
  }

  // Link with useParams already handled above; Link with useNavigate
  if (content.includes('react-router-dom') && content.includes('Link')) {
    content = content.replace(/import\s*\{\s*useParams\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useParams } from "next/navigation";\nimport Link from "next/link";\n');
    content = content.replace(/import\s*\{\s*useParams\s*,\s*useNavigate\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?\s*\n?/g, 'import { useParams, useRouter } from "next/navigation";\nimport Link from "next/link";\n');
    content = content.replace(/\bconst\s+navigate\s*=\s*useNavigate\s*\(\s*\)/g, 'const router = useRouter()');
    content = content.replace(/\bnavigate\s*\(/g, 'router.push(');
  }

  // Replace Link to= with href=
  content = content.replace(/\bto=\s*\{/g, 'href={');
  content = content.replace(/\bto="([^"]+)"/g, 'href="$1"');
  content = content.replace(/\bto='([^']+)'/g, "href='$1'");

  // Add "use client" at top if needed and not present
  if (needsUseClient && !content.trimStart().startsWith('"use client"') && !content.trimStart().startsWith("'use client'")) {
    content = '"use client";\n\n' + content;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const files = getAllJsxFiles(srcDir);
let count = 0;
for (const f of files) {
  if (fixFile(f)) {
    count++;
    console.log('Fixed:', path.relative(srcDir, f));
  }
}
console.log('Total fixed:', count);
