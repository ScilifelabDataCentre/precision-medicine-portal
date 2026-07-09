# Precision Medicine Portal (Frontend)

The Precision Medicine Portal is a national resource developed and maintained by SciLifeLab Data Centre. It is intended to serve as a resource for professionals in the field of precision medicine, and content will be added continuously.

The portal supports researchers in precision medicine by providing information on available datasets, including national quality registries, research cohorts, and other structured data relevant to clinical and translational research. Moreover, it provides links to customised dashboards and resources for navigating data management challenges. Researchers can also find guidance on handling sensitive data.

## Table of Contents

- [Background](#background)
- [Cite this portal](#cite-this-portal)
- [Contributing](#contributing)
- [How to get help](#how-to-get-help)
- [Credits](#credits)
- [Development](#development)
  - [Architecture Overview](#architecture-overview)
  - [Running a local copy of the portal](#running-a-local-copy-of-the-portal)

## Background

The [Data Driven Life Science](https://www.scilifelab.se/data-driven/) (DDLS) initiative has appointed four [Data Science Nodes](https://www.scilifelab.se/news/ddls-data-science-nodes-to-be-launched/) (DSNs) to serve as database, data and bioinformatics support for data driven research in life science. This repository contains the code for the frontend of a Precision Medicine Portal by the Precision Medicine DSN, which is hosted at [Karolinska Institutet](https://ki.se/en) and [SciLifeLab](https://www.scilifelab.se).

The portal is one of our main projects. Other projects the team has been or is involved in are presented on the portal.

## Cite this portal

Click on 'Cite this repository' near the top right of this repository to see how to formally cite this repository. Also see the [citation and license](https://precision-medicine-portal.scilifelab.se/citation-and-license) site for detailed information.

## Contributing

We welcome contributions, small and large, to our codebase, dashboards and documentation. They will be published after review and approval by the Precision Medicine Portal team. Fork, open a pull request, or contact us to discuss ideas!
Information on the technical details of the portal can be found in the [development](#development) section.

## How to get help

If you have any questions regarding any of the code or content associated with the portal, please get in touch by emailing us at [precisionmedicine@scilifelab.se](mailto:precisionmedicine@scilifelab.se).

## Credits

The website was built and is maintained by a team at SciLifeLab Data Centre and Karolinska Institutet. We are grateful to many collaborators for their contributions.

## Development

### Architecture Overview

This repository contains a modern web application built with the following architecture, technologies, and tools:

#### Core Technologies

- **Framework**: Next.js 15.3.2 (React-based full-stack framework)
- **Language**: TypeScript 6.x (statically typed JavaScript)
- **Runtime**: Node.js 26.x (Alpine Linux-based Docker image)

#### Frontend Architecture

- **UI Library**: React 19 with React DOM
- **Styling**: Tailwind CSS 4 with custom design system
- **Component Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for modern iconography
- **State Management**: React hooks and context (no external state management library)

#### Key Features & Libraries

- **Analytics**: Matomo integration for web analytics
- **Content**: React Markdown with GitHub Flavored Markdown support
- **Security**: DOMPurify for XSS protection, Google reCAPTCHA integration
- **HTTP Client**: Axios for API requests
- **Utilities**: Class Variance Authority, clsx, tailwind-merge for styling utilities
- **Cookies**: js-cookie and cookies-next for cookie management

#### Development Tools

- **Linting**: ESLint with Next.js configuration
- **Testing**: Cypress 14.3.3 for end-to-end testing
- **Build Tool**: Next.js built-in bundler with Webpack
- **Package Manager**: npm with package-lock.json for dependency management

#### Deployment & Infrastructure

- **Containerization**: Multi-stage Docker build with Node.js Alpine base
- **Output**: Standalone Next.js build for optimized production deployment
- **Port**: Configured for port 3000 with hostname binding

#### Project Structure

```
next-app/
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Reusable React components
│   ├── lib/          # Utility functions and configurations
│   ├── interfaces/   # TypeScript type definitions
│   └── assets/       # Static assets and data files
├── public/           # Static files served directly
├── cypress/         # End-to-end test configuration
└── fonts/           # Custom font files
```

#### Design System

- Custom color palette with semantic naming (primary, secondary, accent, etc.)
- Responsive design with Tailwind CSS breakpoints
- Lato font family integration
- Accessible component primitives from Radix UI

### Running a local copy of the portal and contributing to the codebase

#### Step 1: Fork and clone the repository

**Important**: You must work through a fork of the repository. Do not commit directly to the main repository.

1. Fork the repository: Click the "Fork" button at the top right of the [main repository page](https://github.com/ScilifelabDataCentre/precision-medicine-portal-frontend) to create your own copy.

2. Clone your fork: Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/precision-medicine-portal-frontend.git
   ```

3. Add the upstream remote: Add the original repository as an upstream remote to keep your fork updated:
   ```bash
   git remote add upstream https://github.com/ScilifelabDataCentre/precision-medicine-portal-frontend.git
   ```

Please note that we require all commits to be verified, so you must sign your commits. For information on how to set this up, see the GitHub documentation [here](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

Fetch changes at any time from this remote:

```bash
git pull upstream dev
```

#### Step 2: Set up your development environment

The project is set up using npm. Navigate to the `next-app` directory and use npm to run the available scripts:

##### Available Scripts

###### `npm install`

Installs the dependencies for the project.

###### `npm run dev`

Runs the app in development mode with hot reload.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

###### `npm run build`

Builds the app for production using Next.js optimization.\
The build is minified and optimized for the best performance.\
This also checks the linting.

Note: production builds currently pass `--webpack` to opt out of Next 16's
Turbopack default; this was kept during the Next 16 upgrade to minimize
change (development mode already uses Turbopack). A Turbopack production
build compiles cleanly, so the flag can likely be dropped after a verified
visual comparison — tracked as a follow-up.

###### `npm start`

Starts the production server after building the app.

###### `npm run lint`

Runs ESLint to check code quality and consistency.

###### `npm test`

Runs Cypress end-to-end tests for the application.

##### Docker

You can use the provided Dockerfile to build and run a container.

#### Step 3: Create a branch and develop

To create a new branch and start developing in it:

```bash
git branch my_branch
git checkout my_branch
```

After doing this you can make any changes you want. You must then either add all changed files or specific changed files to your commit:

```bash
git add -A
```

or

```bash
git add my_changed_file
```

You can then commit and push to your branch:

(NOTE: DO NOT FORGET TO SIGN YOUR COMMITS, by policy only signed commits can be merged into the main branches.)

```bash
git commit -S -m "My commit"
git push origin my_branch
```

The code is now in your branch on your fork, but it does not get merged into the main repository without being reviewed as a pull request.

#### Step 4: Make a pull request

Once you're finished with your edits and they are committed and pushed to your branch, it's time to open a pull request from your fork to the main repository.

You can find full documentation on the [GitHub help website](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests). In short:

- Visit your fork: `https://github.com/YOUR_USERNAME/precision-medicine-portal-frontend`
- Find the branch `my_branch` that you created and pushed to
- Click the button that reads _"New Pull Request"_
- GitHub will automatically detect that you want to create a pull request to the upstream repository
- Add/change title as well as a description of what you've done
- Add reviewers from the organization to review your pull request
- Click Create Pull Request

Once created, a member of our team will review your changes and reach out to you if they have any questions or requests for changes.
Once approved, they will be merged and deployed in the next release.
