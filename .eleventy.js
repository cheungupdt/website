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
  
  // Add collection for projects
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/projects/**/*.md");
  });
  
  // Add collection for achievements
  eleventyConfig.addCollection("achievements", function(collection) {
    return collection.getFilteredByGlob("src/achievements/**/*.md");
  });
  
  // Add collection for speaking engagements
  eleventyConfig.addCollection("speaking", function(collection) {
    return collection.getFilteredByGlob("src/speaking/**/*.md");
  });
  
  // Add collections for expertise sections
  eleventyConfig.addCollection("robotics", function(collection) {
    return collection.getFilteredByGlob("src/robotics/**/*.md");
  });
  
  eleventyConfig.addCollection("n8nchief", function(collection) {
    return collection.getFilteredByGlob("src/n8nchief/**/*.md");
  });
  
  eleventyConfig.addCollection("leadership", function(collection) {
    return collection.getFilteredByGlob("src/leadership/**/*.md");
  });
  
  eleventyConfig.addCollection("innovation", function(collection) {
    return collection.getFilteredByGlob("src/innovation/**/*.md");
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
  
  // Add tagPages collection
  eleventyConfig.addCollection("tagPages", function(collection) {
    const tagPages = [];
    const tagList = [];
    
    // Get all unique tags
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags.forEach(tag => tagList.push(tag));
      }
    });
    
    // Create unique tag list
    const uniqueTags = [...new Set(tagList)].sort();
    
    // Create tag pages with posts
    uniqueTags.forEach(tag => {
      const posts = collection.getFilteredByTag(tag);
      tagPages.push({
        tag: tag,
        posts: posts
      });
    });
    
    return tagPages;
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
  
  // Add diagram data filter
  eleventyConfig.addFilter("diagramData", function(data, type) {
    if (type === "mermaid") {
      return data;
    } else if (type === "chart") {
      return JSON.stringify(data);
    }
    return data;
  });
  
  // Add shortcodes for charts and robotics diagrams
  eleventyConfig.addPairedShortcode("chartContainer", function(content, id, title, description) {
    return `
<div class="diagram-container chart-container">
  <h3 class="diagram-title">${title}</h3>
  <p class="diagram-description">${description}</p>
  <div class="chart-wrapper">
    <canvas id="chart-${id}" width="400" height="200"></canvas>
  </div>
  <script>
 ${content}
  </script>
</div>`;
  });
  
  eleventyConfig.addPairedShortcode("roboticsDiagram", function(content, id, title, description) {
    return `
<div class="diagram-container robotics-diagram">
  <h3 class="diagram-title">${title}</h3>
  <p class="diagram-description">${description}</p>
  <div class="robotics-diagram-content" id="robotics-${id}">
 ${content}
  </div>
</div>`;
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