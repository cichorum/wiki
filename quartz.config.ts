import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Team J: Cichorum",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "cichorum.github.io/wiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Open Sans",
        body: "Source Serif",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFFFF",        // White background
          lightgray: "#f8f9fa",    // Very soft gray for subtle borders
          gray: "#4B9CD3",         // Carolina Blue (used for accents/ui)
          darkgray: "#13294B",     // Navy (primary text)
          dark: "#151515",         // Deep Black
          secondary: "#13294B",    // Navy
          tertiary: "#4B9CD3",     // Carolina Blue
          highlight: "rgba(75, 156, 211, 0.15)", // Translucent Carolina Blue
          textHighlight: "#4B9CD344",             // Soft blue highlight
        },
        darkMode: {
          light: "#151515",        // Deep Black background
          lightgray: "#13294B",    // Navy for surfaces/cards
          gray: "#4B9CD3",         // Carolina Blue
          darkgray: "#FFFFFF",     // White (primary text)
          dark: "#fafafa",         // Near white
          secondary: "#4B9CD3",    // Carolina Blue
          tertiary: "#7BAFD4",     // A slightly lighter tint of Carolina Blue for visibility
          highlight: "rgba(75, 156, 211, 0.2)",  // Blue highlight
          textHighlight: "#13294B88",             // Navy highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
