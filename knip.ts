import type { KnipConfig } from "knip";

const config: KnipConfig = {
  rules: {
    dependencies: "warn",
    unlisted: "warn",
    binaries: "warn",
    unresolved: "warn",
    exports: "warn",
    nsExports: "warn",
    types: "warn",
    nsTypes: "warn",
    enumMembers: "warn",
    classMembers: "warn",
    duplicates: "warn",
    files: "warn",
  },
  ignoreDependencies: ["lint-staged"],
};

export default config;
