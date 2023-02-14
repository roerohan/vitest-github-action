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

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contributors](#contributors-)



<!-- ABOUT THE PROJECT -->
## About The Project

GitHub actions error and coverage reporter for vitest.

### Built With

* [vitest](https://vitest.dev/)
* [@actions/core](https://www.npmjs.com/package/@actions/core)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
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

You can use the `GithubReporter` exported by this package in your `vite.config.ts` or `vitest.config.ts` (or their JS equivalent) files to have your errors reported on your GitHub pull request.

```ts
import { defineConfig } from 'vitest/config';
import { GithubReporter } from 'vitest-github-action';

export default defineConfig({
    test: {
        reporters: process.env.GITHUB_ACTIONS
            ? ['default', new GithubReporter()]
            : 'default',
    },
});
```

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
