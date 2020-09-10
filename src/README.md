## Overview

This directory is a source of application.

## Source folder structure

It has the following construction:
- **[common](/src/common)** (folder) - contains assets, components, constants and data that is used throughout the application and all of its components.
    - **[assets](/src/common/assets)** - contains assets such as images (application logo etc.).
    - **[components](/src/common/components)** - contains shared components that are used all throughout the application such as button, header, header button and so on.
    - **[constants](/src/common/constants)** - contains constants such as colors, metrics and fonts.
    - **[data](/src/common/data)** - contains files for global testing (so called "dummy data") or data necessary for the execution of the program.
    - **[services](/src/common/services)** - contains global services (such as communication with external APIs) that can be used in many domains.
    - **[state](/src/common/state)** - contains the global reducer.
    - **[styles](/src/common/styles)** - contains themes (light theme/dark theme).
- **[domains](/src/domains)** (folder) - contains feature-specific folders, each of them can have the following subfolders:
    - **components** - contains folders, each of which relates to a specific "role" they play as a component.
    - **data** - contains files for feature-specific testing (so called "dummy data") or data necessary for the execution of certain part of the program.
    - **containers** - contains presentational components. We call them "containers".
    - **models** - contains feature-specific models constructed as a class.
    - **services** - contains feature-specific services such as communication with external APIs.
    - **state** - contains actions related to the domain which we can use to update domain's part of the tree in the reducer and on the backend.
- **[index.js](/src/index.js)** (file) - the root of the application.
- **[routes.js](/src/routes.js)** (file) - navigation. Here we can create routes, add additional screens and configure them.
- **[store.js](/src/store.js)** (file) - store created based on a combined reducer. Here we can add a reducer. Export the store from this file.
and this **README.md** file!

## To-Do

- create a README.md file in each distinct folder: common, domains and subfolders of common, domains for better understanding of the project structure,
- refactor presentational components such that buttons, headers, descriptions etc. are consistent (refactor into discrete components).
