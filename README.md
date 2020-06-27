# Quick Reference

## XML portion should be properly formatted

You cannot have <endpoint> without the closing </endpoint> tag. Also not sure that it will work as these are not
valid HTML tags. If you need to use <br/> don't forget the trailling /

## MD file header should always be present

The system will gracefully handle missing headers but things like title and proper sidebar name will be missing.

Here is an example:
```---
id: document_consumer_entry
title: Becoming a Document Consumer
sidebar_label: Introduction
---
``` 

Sidebar label is optional: If the sidebar label is the same as the title you can remove the sidebar_label property.
Id is optional: id is only to be used if the id is different that the file name, which is not recommended 

## Do not use level 1 titles, use the `title` header property instead

## When something does not make sense, kill the process and relaunch


# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Continuous Integration

Some common defaults for linting/formatting have been set for you. If you integrate your project with an open source Continuous Integration system (e.g. Travis CI, CircleCI), you may check for issues using the following command.

```
$ yarn ci
```
