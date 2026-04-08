/**
 * Add new blog posts from content/*.md to blogArticles.ts data
 * Run: node scripts/add-blog-posts.cjs
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function markdownToHtml(md) {
  let html = md.replace(/^---[\s\S]*?---\n/, '');
  
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^---$/gm, '<hr/>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>(\n|$))+/g, (match) => '<ul>' + match.replace(/\n/g, '') + '</ul>');
  
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headerCells = header.split('|').map(c => c.trim()).filter(Boolean);
    const rowsData = rows.trim().split('\n').map(row => 
      row.split('|').map(c => c.trim()).filter(Boolean)
    );
    return '<table><tr>' + headerCells.map(c => `<th>${c}</th>`).join('') + '</tr>' + 
      rowsData.map(cells => '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</table>';
  });
  
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|li|table|hr|div)/.test(block)) return block;
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('\n');
  
  return html;
}

function parseFrontmatter(md) {
  const fm = {};
  const lines = md.split('\n');
  let inFm = false;
  for (const line of lines) {
    if (line.trim() === '---') { inFm = !inFm; continue; }
    if (!inFm) break;
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (key === 'keywords') {
        fm[key] = val.split(',').map(k => k.trim()).filter(Boolean);
      } else if (key === 'featured' || key === 'order') {
        fm[key] = key === 'featured' ? val === 'true' : parseInt(val) || 0;
      } else {
        fm[key] = val;
      }
    }
  }
  return fm;
}

const contentDir = path.join(rootDir, 'content');
const blogFiles = fs.readdirSync(contentDir).filter(f => f.startsWith('blog-post-') && f.endsWith('.md')).sort();

console.log(`Found ${blogFiles.length} blog post files`);

const newArticles = blogFiles.map(file => {
  const md = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const fm = parseFrontmatter(md);
  const content = markdownToHtml(md);
  
  return {
    slug: fm.slug || file.replace('.md', ''),
    title: fm.title || '',
    category: fm.category || 'tips',
    keywords: fm.keywords || [],
    description: fm.description || '',
    content,
    faq: [],
    relatedArticles: [],
    relatedGames: [],
    publishedAt: fm.date || '2026-04-08',
    updatedAt: fm.date || '2026-04-08',
  };
});

const dataFile = path.join(rootDir, 'app', 'data', 'blogArticles.ts');
let dataContent = fs.readFileSync(dataFile, 'utf-8');

// Find the last "  }" that closes the last article object (before the ]; closing the array)
// The pattern is: [whitespace]}[whitespace]\n];
// We want to insert BEFORE the closing } of the last article
const arrayEndPattern = /\n\]\s*;\s*\n/;
const match = dataContent.match(arrayEndPattern);
if (!match) {
  console.error('Could not find array end pattern');
  process.exit(1);
}

// Insert point is just before the ] of the array closing
const insertIndex = dataContent.indexOf(match[0]);
// Go back to find the } that closes the last object
let lastObjEnd = insertIndex - 1;
while (dataContent[lastObjEnd] === ' ' || dataContent[lastObjEnd] === '\t') lastObjEnd--;
if (dataContent[lastObjEnd] !== '}') {
  console.error('Expected } but found:', dataContent[lastObjEnd]);
  process.exit(1);
}
// Insert point is right after that }
const insertPoint = lastObjEnd + 1;

const beforeInsert = dataContent.slice(0, insertPoint);
const afterInsert = dataContent.slice(insertPoint);

const newArticlesStr = newArticles.map(article => {
  return `,\n  {\n    "slug": ${JSON.stringify(article.slug)},\n    "title": ${JSON.stringify(article.title)},\n    "category": ${JSON.stringify(article.category)},\n    "keywords": ${JSON.stringify(article.keywords)},\n    "description": ${JSON.stringify(article.description)},\n    "content": ${JSON.stringify(article.content)},\n    "faq": [],\n    "relatedArticles": [],\n    "relatedGames": [],\n    "publishedAt": ${JSON.stringify(article.publishedAt)},\n    "updatedAt": ${JSON.stringify(article.updatedAt)}\n  }`;
}).join('');

const newDataContent = beforeInsert + newArticlesStr + afterInsert;

fs.writeFileSync(dataFile, newDataContent);
console.log(`✅ Added ${newArticles.length} articles to blogArticles.ts`);
console.log('New slugs:', newArticles.map(a => a.slug).join(', '));
