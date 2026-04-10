# Legacy Redirect Rules for Static Export Deploy

These root-level legacy URLs are not redirecting live and should be handled at the deployment layer (Nginx, Caddy, Coolify proxy, or CDN rules), because Next.js `redirects()` does not apply automatically with `output: "export"`.

## Required redirects

- `/download-mega888-apk` -> `/blog/mega888-apk-download-2026`
- `/kredit-percuma-mega888` -> `/blog/mega888-free-credit-no-deposit-2026`
- `/mega888-register-malaysia` -> `/blog/mega888-register-akaun-baru-2026`

## Suggested Nginx rules

```nginx
location = /download-mega888-apk {
  return 301 /blog/mega888-apk-download-2026;
}

location = /kredit-percuma-mega888 {
  return 301 /blog/mega888-free-credit-no-deposit-2026;
}

location = /mega888-register-malaysia {
  return 301 /blog/mega888-register-akaun-baru-2026;
}
```

## Suggested CDN / proxy behavior

Use permanent redirects (301) and preserve the scheme + host.
