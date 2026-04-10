# Coolify Redirect Snippets for tipsmega888.com

These redirects should be applied at the proxy layer because the frontend uses `output: "export"`.

## Legacy URLs to redirect

- `/download-mega888-apk` -> `/blog/mega888-apk-download-2026`
- `/kredit-percuma-mega888` -> `/blog/mega888-free-credit-no-deposit-2026`
- `/mega888-register-malaysia` -> `/blog/mega888-register-akaun-baru-2026`

## Option A, Caddy snippet

If the frontend app allows custom Caddy directives, add handlers before the generic `handle_path`:

```caddy
redir /download-mega888-apk /blog/mega888-apk-download-2026 301
redir /kredit-percuma-mega888 /blog/mega888-free-credit-no-deposit-2026 301
redir /mega888-register-malaysia /blog/mega888-register-akaun-baru-2026 301
```

## Option B, Traefik labels

If the app allows custom Traefik labels, add these labels to the `tipsmega-frontend` app:

```text
traefik.http.middlewares.tipsmega-legacy-1.redirectregex.regex=^https?://(www\.)?tipsmega888\.com/download-mega888-apk/?$
traefik.http.middlewares.tipsmega-legacy-1.redirectregex.replacement=https://tipsmega888.com/blog/mega888-apk-download-2026
traefik.http.middlewares.tipsmega-legacy-1.redirectregex.permanent=true

traefik.http.middlewares.tipsmega-legacy-2.redirectregex.regex=^https?://(www\.)?tipsmega888\.com/kredit-percuma-mega888/?$
traefik.http.middlewares.tipsmega-legacy-2.redirectregex.replacement=https://tipsmega888.com/blog/mega888-free-credit-no-deposit-2026
traefik.http.middlewares.tipsmega-legacy-2.redirectregex.permanent=true

traefik.http.middlewares.tipsmega-legacy-3.redirectregex.regex=^https?://(www\.)?tipsmega888\.com/mega888-register-malaysia/?$
traefik.http.middlewares.tipsmega-legacy-3.redirectregex.replacement=https://tipsmega888.com/blog/mega888-register-akaun-baru-2026
traefik.http.middlewares.tipsmega-legacy-3.redirectregex.permanent=true
```

Then attach the middlewares to the HTTPS router for `tipsmega888.com` before gzip, for example:

```text
traefik.http.routers.https-0-oeraw35walk5dm0d19t8kjkr.middlewares=tipsmega-legacy-1,tipsmega-legacy-2,tipsmega-legacy-3,gzip
```

## Verification

After deploy, verify:

```bash
curl -I https://tipsmega888.com/download-mega888-apk
curl -I https://tipsmega888.com/kredit-percuma-mega888
curl -I https://tipsmega888.com/mega888-register-malaysia
```

Expected result: `301` to the correct `/blog/...` URLs.
