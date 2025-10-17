const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);
  
  // Add passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add collections for blog posts
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/_subsites/blog/posts/**/*.md");
  });
  
  // Add tag collection
  eleventyConfig.addCollection("tagList", function(collection) {
    const tagSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet].sort();
  });
  
  // Add date filter (with fixed syntax)
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    const months = ["January", "February", "March", "April", "month", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });
  
  // Add readable date filter
  eleventyConfig.addFilter("readableDate", function(date) {
    const d = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });
  
  // Add limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Add where filter
  eleventyConfig.addFilter("where", function(array, key, value) {
    return array.filter(item => {
      if (typeof item.data === "undefined") {
        return false;
      }
      const itemValue = item.data[key];
      if (Array.isArray(itemValue)) {
        return itemValue.includes(value);
      }
      return itemValue === value;
    });
  });
  
  // Add getNewestCollectionItemDate filter for RSS
  eleventyConfig.addFilter("getNewestCollectionItemDate", function(collection) {
    if (collection.length === 0) {
      return new Date();
    }
    return new Date(Math.max(...collection.map(item => new Date(item.date))));
  });
  
  // Configure Nunjucks
  eleventyConfig.setNunjucksEnvironmentOptions({
    autoescape: false
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
