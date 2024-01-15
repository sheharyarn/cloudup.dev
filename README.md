<!-- Heading: Start -->
<h1 align="center">
  <a href="https://cloudup.dev/">
    <img alt="CloudUp" src='static/logo.png' width='400px'/>
  </a>
</h1>

<h4 align="center">

[![Follow on Twitter][shield-twitter]][social-twitter] [![Follow on Github][shield-github]][social-github] [![Visit CloudUp][shield-site]][cloudup]

</h4>

<p align="center">
  <b>Tools to jump-start development on the cloud!</b><br/>
  <sub>Community sourced tools and configurations for beginners to simplify working with Docker, Kubernetes and more</sub>
</p>

<p align="center">
  <a href="https://gdglahore.com/">
    <img alt="GDG Lahore" src='static/gdg-lahore.png' width='300px'/>
  </a>
</p>

<br/>
<!-- Heading: End -->

## [Dockerfile Collection][cloudup]

This project contains a collection of optimized and production-ready Dockerfile images for different programming
languages and frameworks. Just choose your language and variant in the dropdowns, and you'll be presented with
a Dockerfile (along with helpful description in comments), ready to use in your project.

For minor customizations, just specify custom values in the settings box and a tailored Dockerfile will be
generated for you on the fly.

[Try it out →][cloudup]

<br/>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Development Dependencies](#development-dependencies)
- [Contributing](#contributing)
- [Kubernetes Manifest Generator](#kubernetes-manifest-generator)
- [License](#license)

## Installation

To install all the dependencies of the project. Run the following command in your terminal

```bash
npm install 
```
## Usage

Once the dependencies are installed, you can start the local development server using the following command:

```bash
npm run start 
```

This will launch the Gatsby development server, and you can access your site at **http://localhost:8000**

## Development Dependencies
  This project includes the following development dependencies:

  - `gatsby-plugin-root-import: Version 2.0.9`
  - This plugin allows you to use absolute imports in your Gatsby project, making import paths more concise.
  - `prettier: Version 3.1.1`
  - Prettier is a code formatter that ensures consistent code style in your project.

## Scripts
The following scripts are available for common tasks:

- Clean the Gatsby cache and public directories.

```bash
npm run clean 
```
- Format project files using Prettier.

```bash
npm run format 
```

- Serve the production build locally.

```bash
npm run serve 
```

- Build the Gatsby project for production.

```bash
npm run build 
```


## Kubernetes Manifest Generator

Under construction.

## Contributing
  Pull requests are welcome. Just follow the following steps to get started

- [Fork][github-fork] the repository, Enhance, Send PR
- Lock issues with any bugs or feature requests
- Implement something from Roadmap
- Spread the word :heart:


## License

This source code is available as open source under the terms of the [MIT License][license].

<br>

[cloudup]: https://cloudup.dev/
[logo]: static/logo.png
[license]: ./LICENSE
[shield-twitter]: https://img.shields.io/twitter/follow/sheharyarn?color=%231adba2&label=Follow%20on%20Twitter&style=flat-square
[shield-github]: https://img.shields.io/github/followers/sheharyarn?color=%231adba2&label=Follow%20on%20Github&style=flat-square
[shield-site]: https://img.shields.io/badge/Visit-CloudUp.dev%20%E2%86%92-green?&style=flat-square&color=1adba2
[social-twitter]: https://twitter.com/sheharyarn
[social-github]: https://github.com/sheharyarn
[github-fork]: https://github.com/sheharyarn/cloudup.dev/fork
