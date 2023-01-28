/**
 * @param {import("./nextHeaderTypes").NextHeaderProps} NextHeaderProps
 * @returns {import("./nextHeaderTypes").Header[]} Header[]
 */
export function nextHeader(
  {
    contentTypeOptions,
    contentSecurityPolicy,
    frameOptions,
    referrerPolicy,
    xssProtection,
  } = {
    contentTypeOptions: "nosniff",
    contentSecurityPolicy: {
      "base-uri": ["'none'"],
      "child-src": ["'none'"],
      "connect-src": ["'self'"],
      "default-src": ["'self'"],
      "font-src": ["'self'"],
      "form-action": ["'self'"],
      "frame-ancestors": ["'none'"],
      "frame-src": ["'none'"],
      "img-src": ["'self'"],
      "manifest-src": ["'self'"],
      "media-src": ["'self'"],
      "object-src": ["'none'"],
      // "prefetch-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "worker-src": ["'self'"],
    },
    frameOptions: "DENY",
    referrerPolicy: "no-referrer",
    xssProtection: "1; mode=block",
  }
) {
  /** @type {string[]} */
  const policies = [];
  for (const [directive, source] of Object.entries(contentSecurityPolicy)) {
    policies.push(`${directive} ${source.join(" ")}`);
  }

  return [
    {
      key: "X-Content-Type-Options",
      value: contentTypeOptions,
    },
    {
      key: "Content-Security-Policy",
      value: policies.join("; "),
    },
    {
      key: "X-Frame-Options",
      value: frameOptions,
    },
    {
      key: "Referrer-Policy",
      value: referrerPolicy,
    },
    {
      key: "X-XSS-Protection",
      value: xssProtection,
    },
  ];
}

export function nextDevHeader() {
  return nextHeader({
    contentTypeOptions: "nosniff",
    contentSecurityPolicy: {
      "base-uri": ["'none'"],
      "child-src": ["'none'"],
      "connect-src": ["'self'", "webpack://*", "localhost:8090"],
      "default-src": ["'self'"],
      "font-src": ["'self'"],
      "form-action": ["'self'"],
      "frame-ancestors": ["'none'"],
      "frame-src": ["'none'"],
      "img-src": ["'self'"],
      "manifest-src": ["'self'"],
      "media-src": ["'self'"],
      "object-src": ["'none'"],
      // "prefetch-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "worker-src": ["'self'"],
    },
    frameOptions: "DENY",
    referrerPolicy: "no-referrer",
    xssProtection: "1; mode=block",
  });
}
