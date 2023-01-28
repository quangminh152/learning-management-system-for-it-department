/**
 * A CSP Directive Poroperty
 */
export type CSPDirective = string[];

/**
 * A CSP Config
 */
export type CSPConfig = {
  "base-uri": CSPDirective;
  "child-src": CSPDirective;
  "connect-src": CSPDirective;
  "default-src": CSPDirective;
  "font-src": CSPDirective;
  "form-action": CSPDirective;
  "frame-ancestors": CSPDirective;
  "frame-src": CSPDirective;
  "img-src": CSPDirective;
  "manifest-src": CSPDirective;
  "media-src": CSPDirective;
  "object-src": CSPDirective;
  "prefetch-src": CSPDirective;
  "script-src": CSPDirective;
  "style-src": CSPDirective;
  "worker-src": CSPDirective;
  "block-all-mixed-content"?: CSPDirective;
  "plugin-types"?: CSPDirective;
  "navigate-to"?: CSPDirective;
  "require-sri-for"?: CSPDirective;
  "require-trusted-types-for"?: CSPDirective;
  sandbox?: CSPDirective;
  "script-src-attr"?: CSPDirective;
  "script-src-elem"?: CSPDirective;
  "style-src-attr"?: CSPDirective;
  "style-src-elem"?: CSPDirective;
  "trusted-types"?: CSPDirective;
  "upgrade-insecure-requests"?: CSPDirective;
  "report-to"?: CSPDirective;
  "report-uri"?: CSPDirective;
};

/**
 * Response header key-value pair
 */
export type Header = {
  key: string;
  value: string;
};

export type HeaderConfig = string;

export type PermPolicyDirectiveList =
  | "experimental"
  | "legacy"
  | "proposed"
  | "standard";

/**
 * nextSafe's primary config object
 */
export type NextHeaderProps = {
  contentTypeOptions?: HeaderConfig;
  contentSecurityPolicy?: CSPConfig;
  frameOptions?: HeaderConfig;
  permissionsPolicy?: {
    [key: string]: string;
  };
  permissionsPolicyDirectiveSupport?: PermPolicyDirectiveList[];
  referrerPolicy?: HeaderConfig;
  xssProtection?: HeaderConfig;
};
