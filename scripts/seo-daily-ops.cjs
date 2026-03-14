#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'content', 'seo-30day-calendar.json');
if (!fs.existsSync(file)) {
  console.error('Missing content/seo-30day-calendar.json');
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(file, 'utf8'));

function getArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function getDateInTimeZone(timeZone) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return formatter.format(new Date());
}

const targetDate = getArg('date') || process.env.SEO_DATE;
if (targetDate && !isValidDate(targetDate)) {
  console.error('Invalid date. Use YYYY-MM-DD via --date=YYYY-MM-DD or SEO_DATE.');
  process.exit(1);
}

const timeZone = getArg('tz') || process.env.SEO_TIMEZONE || 'Asia/Kuala_Lumpur';
const effectiveDate = targetDate || getDateInTimeZone(timeZone);

const todayRow =
  rows.find((r) => r.date === effectiveDate) ||
  rows.find((r) => r.status === 'planned' && r.date >= effectiveDate) ||
  rows.find((r) => r.status === 'planned');

if (!todayRow) {
  console.log('✅ No pending SEO item in calendar.');
  process.exit(0);
}

const title = todayRow.title;
const cta = todayRow.cta;
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const payload = {
  requestedDate: effectiveDate,
  scheduleDate: todayRow.date,
  timeZone,
  topic: title,
  checklist: [
    `Draft article: ${title}`,
    'Add internal links to /blog, /games, /trusted',
    'Add one FAQ section with 2-3 Q&A',
    'Optimize title (50-60 chars) and meta description (140-155 chars)',
    'Publish article and submit URL in Google Search Console URL Inspection',
    'Post to Telegram + Facebook + short video caption'
  ],
  posts: {
    telegram: `🔥 ${title}\n\nContent baru dah live. Practical guide + data, bukan sembang kosong.\n\n👉 ${cta}\nhttps://tipsmega888.com/blog`,
    facebook: `${title}\n\nKami share step-by-step untuk bantu korang main lebih smart.\n\n✅ ${cta}\n#mega888 #tipsslot #rtp`,
    tiktokHook: `${title} — 30 saat je, terus faham point paling penting!`
  }
};

const outFile = path.join(outDir, `seo-daily-pack-${todayRow.date}.json`);
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2));

console.log(`✅ SEO daily pack generated: ${outFile}`);
console.log(`Requested date: ${effectiveDate} (${timeZone})`);
console.log(`Scheduled topic date: ${todayRow.date}`);
console.log(`Topic: ${title}`);
