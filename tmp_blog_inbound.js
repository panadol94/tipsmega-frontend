const { BLOG_ARTICLES } = require('./app/data/blogArticles.ts');
const inbound = new Map(BLOG_ARTICLES.map(a=>[a.slug,0]));
for (const a of BLOG_ARTICLES) for (const s of a.relatedArticles||[]) if (inbound.has(s)) inbound.set(s, inbound.get(s)+1);
const rows = BLOG_ARTICLES.map(a=>({slug:a.slug, category:a.category, relatedCount:(a.relatedArticles||[]).length, inbound:inbound.get(a.slug)||0, title:a.title}));
rows.sort((a,b)=> (a.inbound-b.inbound) || (a.relatedCount-b.relatedCount) || a.slug.localeCompare(b.slug));
console.log(JSON.stringify(rows.slice(0,20), null, 2));