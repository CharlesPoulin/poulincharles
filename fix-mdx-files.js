const fs = require('fs');
const path = require('path');

// Directory to scan for MDX files
const contentDir = path.join(process.cwd(), 'content');

// Function to fix MDX frontmatter
function fixFrontmatter(content) {
  // This regex captures the frontmatter section between --- markers
  const frontmatterRegex = /^---\n([\s\S]*?)---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return content; // No frontmatter found
  
  const frontmatter = match[1];
  
  // Fix the published field by removing carriage returns
  const fixedFrontmatter = frontmatter.replace(
    /published:\s*(["']?)true\r(["']?)/g, 
    'published: true'
  );
  
  // Replace the original frontmatter with the fixed version
  return content.replace(frontmatterRegex, `---\n${fixedFrontmatter}---`);
}

// Function to recursively process directories
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      processDirectory(itemPath);
    } else if (item.endsWith('.mdx')) {
      // Process MDX file
      const content = fs.readFileSync(itemPath, 'utf8');
      const fixedContent = fixFrontmatter(content);
      
      if (content !== fixedContent) {
        console.log(`Fixing: ${itemPath}`);
        fs.writeFileSync(itemPath, fixedContent);
      }
    }
  }
}

// Special handling for the root level introduction-to-transformer.mdx
function moveRootMDX() {
  const rootMdxPath = path.join(contentDir, 'introduction-to-transformer.mdx');
  if (fs.existsSync(rootMdxPath)) {
    // Create posts directory if it doesn't exist
    const postsDir = path.join(contentDir, 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }
    
    // Read, fix, and move the file
    let content = fs.readFileSync(rootMdxPath, 'utf8');
    content = fixFrontmatter(content);
    
    const newPath = path.join(postsDir, 'introduction-to-transformer.mdx');
    fs.writeFileSync(newPath, content);
    
    // Delete the original file
    fs.unlinkSync(rootMdxPath);
    console.log(`Moved and fixed: ${rootMdxPath} -> ${newPath}`);
  }
}

// Run the script
try {
  console.log("Starting to fix MDX files...");
  moveRootMDX(); // Handle the root level MDX first
  processDirectory(contentDir);
  console.log("Done! All MDX files have been fixed.");
} catch (error) {
  console.error("Error processing files:", error);
}