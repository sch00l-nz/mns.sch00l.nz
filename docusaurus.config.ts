import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Miramar North School",
  tagline: "community page",
  favicon: "img/sch00l-favicon.ico",

  // Set the production url of your site here
  url: "https://mns.sch00l.nz",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "sch00l-nz", // Usually your GitHub org/user name.
  projectName: "mns.school.nz", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "info",
          routeBasePath: "info",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/sch00l-nz/mns.sch00l.nz/tree/main/",
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl: "https://github.com/sch00l-nz/mns.sch00l.nz/tree/main/",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "songs",
        path: "songs",
        routeBasePath: "songs",
        // sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/sch00l-nz/mns.sch00l.nz/tree/main/",
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom')
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "MNS",
      logo: {
        alt: "sch00l.nz",
        src: "img/sch00l.svg",
      },
      items: [
        {
          label: "About",
          to: "/about",
        },
        {
          label: "Songs",
          to: "/songs",
        },
        {
          label: "Newsletter",
          to: "/newsletter",
        },
        {
          label: "Contribute",
          to: "/contribute",
        },
        {
          label: "Apps",
          to: "/info/category/apps",
        },

        // {
        //   label: 'Tutorial',
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        // },

        // {
        //   label: 'Blog',
        //   to: '/blog',
        //   position: 'left'
        // },

        // right
        {
          label: "Edit",
          href: "https://github.com/facebook/docusaurus",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Sch00l.nz",
          items: [
            {
              label: "About",
              href: "/about",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Songs",
              to: "/songs",
            },
            {
              label: "Contribute",
              to: "/contribute",
            },
            {
              label: "Apps",
              to: "/info/category/apps",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Edit",
              href: "https://github.com/sch00l-nz/mns.sch00l.nz",
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    zoom: {
      selector: '#app img',
      background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
