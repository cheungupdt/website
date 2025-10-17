// .eleventy.js
module.exports = function(eleventyConfig) {
  // --- Folder Structure ---
  return {
    dir: {
      input: ".",       // Source files are in the root
      includes: "_includes", // Includes, layouts, components
      data: "_data",       // Global data files (like site.json)
      output: "_site"       // Compiled site
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};