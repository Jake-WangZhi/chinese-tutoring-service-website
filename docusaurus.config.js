// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Twin Cities Chinese Tutor",
  tagline: "",
  url: "https://jake0wang.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // favicon: "img/bg.webp",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Jake0Wang", // Usually your GitHub org/user name.
  projectName: "jake0wang.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "Twin Cities Chinese Tutor",
          content: "The BEST Chinese Tutor in Twin Cities, MN",
        },
      ],
      navbar: {
        title: "Home",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg",
        // },
        items: [
          {
            to: "/youtube-channel",
            position: "left",
            label: "Free Youtube Lessons",
          },
          { to: "/services", label: "Services", position: "left" },
          { to: "/testimonials", label: "Testimonials", position: "left" },
          { to: "/philosophy", label: "Philosophy", position: "left" },
          { to: "/about", label: "About", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        // links: [
        //   {
        //     title: "Contact",
        //     items: [
        //       {
        //         label: "Tutorial",
        //         to: "/docs/intro",
        //       },
        //     ],
        //   },
        //   {
        //     title: "More",
        //     items: [
        //       {
        //         label: "Blog",
        //         to: "/blog",
        //       },
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/facebook/docusaurus",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} Atop Learning, Inc<br />Luke Wang<br/>507-403-9816`,
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg",
        // },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [
      [
        "docusaurus2-dotenv",
        {
          systemvars: true,
        },
      ],
    ]
};

module.exports = config;
