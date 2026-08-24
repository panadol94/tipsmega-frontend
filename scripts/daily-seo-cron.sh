#!/bin/bash
# Daily SEO Cronjob for TipsMega888
# Runs: Submit homepage to Google Indexing API + Generate GSC report

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/tipsmega-seo.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Starting daily SEO cronjob..." >> "$LOG_FILE"

# 1. Submit homepage to Google Indexing API
echo "[$DATE] Submitting homepage to Google..." >> "$LOG_FILE"
python3 /root/.openclaw/gsc_index.py "https://tipsmega888.com/" >> "$LOG_FILE" 2>&1 || true

# 2. Submit trusted page
echo "[$DATE] Submitting trusted page..." >> "$LOG_FILE"
python3 /root/.openclaw/gsc_index.py "https://tipsmega888.com/trusted" >> "$LOG_FILE" 2>&1 || true

# 3. Submit selected company pages (rotate daily)
COMPANIES=("Winbest" "Ezrich88" "X9" "Atas")
DAY_OF_WEEK=$(date +%u)
COMPANY_INDEX=$(( (DAY_OF_WEEK - 1) % ${#COMPANIES[@]} ))
TODAY_COMPANY=${COMPANIES[$COMPANY_INDEX]}

echo "[$DATE] Submitting company page: $TODAY_COMPANY..." >> "$LOG_FILE"
python3 /root/.openclaw/gsc_index.py "https://tipsmega888.com/trusted/$TODAY_COMPANY" >> "$LOG_FILE" 2>&1 || true

# 4. Generate GSC report (if script exists)
if [ -f "/root/.openclaw/gsc_query.py" ]; then
    echo "[$DATE] Generating GSC report..." >> "$LOG_FILE"
    python3 /root/.openclaw/gsc_query.py sc-domain:tipsmega888.com > "/tmp/seo_report_$(date +%Y%m%d).md" 2>&1 || true
fi

echo "[$DATE] Daily SEO cronjob completed!" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
