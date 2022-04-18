// theme.config.js
export default {
  projectLink: "https://github.com/dbredvick/slater-docs", // GitHub link in the navbar
  docsRepositoryBase: "https://github.com/dbredvick/slater-docs/blob/main", // base URL for the docs repository
  titleSuffix: " – Slater",
  nextLinks: true,
  prevLinks: true,
  search: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
  darkMode: true,
  footer: true,
  footerText: `${new Date().getFullYear()} © Slater`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <>
      <h2 className=" no-underline selection:bg-red-500 text-4xl font-extrabold dark:text-slate-100 text-gray-900 tracking-tight sm:text-5xl">
        slate<span className="text-red-500">r</span>
      </h2>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Slater: the easiest way to schedule tasks in Next."
      />
      <meta
        name="og:title"
        content="Slater: the easiest way to schedule tasks in Next."
      />
    </>
  ),
};
