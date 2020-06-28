/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: 'e-Box Technical Documentation Site',
  tagline: "Reach Belgium's Enterprises and Citizens through the official channels.",
  url: 'https://e-Box-Enterprise-Belgium.github.io',
  baseUrl: '/documentation-site/',
  favicon: 'img/favicon.ico',
  organizationName: 'e-Box-Enterprise-Belgium', // Usually your GitHub org/user name.
  projectName: 'documentation-site', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      logo: {
        alt: 'Ebox Enterprise Integration Site',
        src: 'img/logo_ebox.svg',
      },
      links: [
        {to: 'docs/introduction', label: 'Documentation', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'right'},
        {href: "https://github.com/e-Box-Enterprise-Belgium", label:"Github", position: 'right'}
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Style Guide',
      //         to: 'docs/doc1',
      //       },
      //       {
      //         label: 'Second Doc',
      //         to: 'docs/doc2',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Social',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //       {
      //         label: 'Twitter',
      //         href: 'https://twitter.com/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      logo: {
        alt: 'RSZ/ONSS Logo',
        src: 'img/logo-be.svg',
        href: 'https://www.belgium.be/',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()}  \tRijksdienst voor Sociale Zekerheid. Office National de Sécurité Sociale. Landesamt für soziale Sicherheit`,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/e-Box-Enterprise-Belgium/documentation-site/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
