# react-boilerplate

Just another react boilerplate. Very simple.

## Included

1. React with Webpack (dev and prod configs) + Webpack-dev-server
2. Babel transpiler (with polyfill)
3. postcss with autoprefixer
4. styled-components
5. state management with react Context and useReducer
6. eslint
7. font-awesome (loaded from CDN)
8. Some components included: Button (wrapper from @trendmicro), Icon, Paragraph, Span, Input (with label)...
9. global css file (generated from `scss/app.scss`)

## Scripts

`npm run dev:build` build development build to `./output`.

`npm run dev:server` run webpack dev server (with hot module) to `localhost:8080`

`npm run prod:build` build production build to `./output`.

## Bundles size (gzipped production build)

`vendor.js`: 96kB

`app.js`: 3.11kB