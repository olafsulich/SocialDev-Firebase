# Contribution Guidelines

SocialDev is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/olafsulich/SocialDev/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission. Please add tests to any new features.

## Pull Requests

In order to create a pull request for SocialDev, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## Folder Structure

Description of the project files and directories.

```bash
├── .circleCI/                 # CircleCI
│    ├── config.yml            # CircleCi configuration file
├── .firebase/                 # Hosting information
├── .storybook/                # Storybook
     ├── config.yml            # Storybook configuration file
├── functions/                 # Firebase Functions
     ├── index.js
├── public/                    # Files that will write to dist on build
├── src/                       # All SocialDev app source files
│   ├── assets/                # Supplemental assets
│   ├── components/            # Components in Atomic Design System
│       ├── atoms/             # Basic blocks for building bigger parts
│       ├── molecules/         # Many of atoms components connect to each other
│       ├── organisms/         # Biggest one's
│   └── firebase/              # Firebase config and refs files.
│   └── hooks/                 # All of custom Hooks in there
│   └── routes/                # Utils routes for React Router
│   └── templates/             # Templates for further pages
│   └── theme/                 # Global Styles and color utils
│   └── utils/                 # Utilities functions
│   └── views/                 # Pages
│   └── index.js               # Main React file
│   └── setupTests.js          # Tests configuration file
├── .eslintrc                  # Eslint configuration file
├── .firebaserc                # Firebase configuration file
├── .gitignore                 # Files ignored by git
├── .prettierrc                # Code convention enforced by Prettier
├── firebase.json              # Firebase app setting
├── firestore.rules            # Firebase database(firestore) security rules.
├── LICENSE                    # License for this open source project
├── package-lock.json          # Package lockfile
├── package.json               # Dependencies and additional information
├── README.md
└── storage.rules              # Firebase storage security rules
```

## Scripts

An explanation of the `package.json` scripts.

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `build`           | Create a production build            |
| `start`           | Start a dev server                   |
| `eject`           | Eject CRA                            |
| `test`            | Run tests in the command line        |
| `storybook`       | Open Storybook                       |
| `build-storybook` | Build Storybook                      |
| `firebase-deploy` | Build and deploy project to firebase |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                                    | Description                              |
| ------------------------------------------------------- | ---------------------------------------- |
| [React](https://reactjs.org/)                           | Library for building user interfaces     |
| [React Router](https://reacttraining.com/react-router/) | Declarative routing for React            |
| [Firebase](https://firebase.google.com/)                | Google development platform              |
| [Styled Components](https://styled-components.com/)     | Visual primitives for the component age. |
| [CirclCI](https://circleci.com/)                        | Continuous Integration platform          |
| [StoryBook](https://storybook.js.org/)                  | UI components explorer                   |
| [Moment](https://momentjs.com/)                         | Js library, helps with formatting dates  |
| [React Hook Form](https://react-hook-form.com/)         | Forms with easy-to-use validation.       |
| [React Testing Library](https://testing-library.com/)   | Testing library for React                |
| [Husky](https://github.com/okonet/lint-staged)          | Pre-commit tool.                         |
| [Lint-staged](https://github.com/okonet/lint-staged)    | Pre-commit tool.                         |
| [Eslint](https://eslint.org/)                           | Javascript Linter                        |

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc) and [Prettier](.prettierrc).

- React: functional style with Hooks (no classes)
- `const` preferred over `let`
