# Sequence Diagrams

This application allows for developers to create `.seqdiag` files that export into SVGs and provide a simple search functionality for users to be able to quickly search files.

## Getting Started

We use `pnpm` as a package manager and NodeJS `v20.x` for runtime.

### Build & Run Locally

```zsh
pnpm install
pnpm build:diagrams
pnpm dev
```

## Build Diagrams

To add your own diagrams, just simply create a `.seqdiag` file anywhere in the `public/diagrams` folder. The build script takes in account for nested folders so you can have any folder structure you want.  For example purposes, I've added a few diagrams for reference.

This application uses the [js-sequence](https://bramp.github.io/js-sequence-diagrams/) library for uml formatting.