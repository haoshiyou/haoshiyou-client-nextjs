// declaration.d.ts
// declare module
declare module '*.scss';

// configure for css-modules
declare module '*.less' {
  const resource: {[key: string]: string};
  export = resource;
}