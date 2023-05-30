[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/roerohan/vitest-github-action">
    <img src="https://project-logo.png" alt="Logo" width="80">
  </a> -->

  <h3 align="center">vitest-github-action</h3>

  <p align="center">
    GitHub actions error and coverage reporter for vitest.
    <br />
    <a href="https://github.com/roerohan/vitest-github-action"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/roerohan/vitest-github-action">View Demo</a>
    ·
    <a href="https://github.com/roerohan/vitest-github-action/issues">Report Bug</a>
    ·
    <a href="https://github.com/roerohan/vitest-github-action/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors-)

<!-- ABOUT THE PROJECT -->

## About The Project

GitHub actions error and coverage reporter for vitest.

### Built With

- [vitest](https://vitest.dev/)
- [@actions/core](https://www.npmjs.com/package/@actions/core)
- [@actions/github](https://www.npmjs.com/package/@actions/github)
- [@actions/github](https://www.npmjs.com/package/@actions/github)
- [istanbuljs](https://istanbul.js.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the Repo

```sh
git clone https://github.com/roerohan/vitest-github-action.git
```

2. Install NPM packages

```sh
npm install
```

<!-- USAGE EXAMPLES -->

## Usage

You can use `vitest-github-action` to report `vitest` errors (in the "Files" section of a Pull Request), and report the coverage of tests (as comments on a
Pull Request).

This repository provides 2 ways of performing the above actions:


- A GitHub action that you can use directly from the marketplace to enable error and coverage reporting.
- A `npm` module that exports the relevant classes so that you can use them in your `vitest` configuration.
  

### Github Action

You can directly use the GitHub action and pass configuration options to report errors and coverage on GitHub.
The following sample action demonstrates how that can be done.

```yaml
name: "Run vitest tests"
on:
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Run `npm install`
        run: |
          npm install
          npm run build

      - name: Run vitest and report issues
        uses: roerohan/vitest-github-action@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          config: ./vitest.config.ts
          coverage: true
```

### NPM Package

The package exports 2 classes:

1. `GithubReporter` to report errors in the files section of a PR, and
2. `GithubIstanbulCoverageProviderModule` to comment coverage reports on the PR.

You can use the `GithubReporter` exported by this package in your `vite.config.ts` or `vitest.config.ts` (or their JS equivalent) files to have your errors reported on your GitHub pull request.

```ts
import { defineConfig } from "vitest/config";
import { GithubReporter } from "vitest-github-action";

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["default", new GithubReporter()]
      : "default",
  },
});
```

The `GithubIstanbulCoverageProviderModule` is a wrapper over the [istanbul](https://istanbul.js.org/) coverage provider that reports the coverage as
a PR comment alongside the default reporting methods such as `text`, `json`, `json-summary`, etc.

To use the `GithubIstanbulCoverageProviderModule`, first, you need to create a file called `vitest-github-coverage-provider.ts` which has the following lines:

```ts
import { GithubIstanbulCoverageProviderModule } from "vitest-github-action";

export default GithubIstanbulCoverageProviderModule;
```

The `customProviderModule` configuration of `vitest` requires the coverage provider module to be a default export. This is why we are re-exporting it
from a file as a default export. Additionally, it's easier to write the path to this file rather than the entire path from `node_modules`.

Then, you need to update your `vitest` configuration to the following.

```ts
import { defineConfig } from "vitest/config";
import { GithubReporter } from "vitest-github-action";

export default defineConfig({
  test: {
    coverage: {
      provider: "custom",
      customProviderModule: "vitest-github-coverage-provider",
      // @ts-expect-error github-summary is a custom reporter and is not recognized.
      reporter: ["github-summary"],
    },
  },
});
```

Upon adding this configuration, the coverage report will be generated and commented on the PR.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/roerohan/vitest-github-action/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[roerohan-url]: https://roerohan.github.io
[issues-shield]: https://img.shields.io/github/issues/roerohan/vitest-github-action.svg?style=flat-square
[issues-url]: https://github.com/roerohan/vitest-github-action/issues
