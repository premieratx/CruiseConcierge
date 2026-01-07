import fs from 'fs';
import path from 'path';

const formatDate = (date: Date): { longFormat: string; shortFormat: string } => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  
  return {
    longFormat: `${month} ${day}, ${year}`,
    shortFormat: `${mm}/${dd}/${year}`
  };
};

export function updateAIFreshnessDates(): { success: boolean; message: string } {
  const { longFormat, shortFormat } = formatDate(new Date());
  
  const files = [
    { path: 'public/ai.txt', patterns: [
      { regex: /# Last Updated: .+/g, replacement: `# Last Updated: ${longFormat}` },
      { regex: /# Content Freshness Date: .+/g, replacement: `# Content Freshness Date: ${shortFormat}` }
    ]},
    { path: 'public/llms.txt', patterns: [
      { regex: /# Last Updated: .+/g, replacement: `# Last Updated: ${longFormat}` },
      { regex: /# Content Freshness Date: .+/g, replacement: `# Content Freshness Date: ${shortFormat}` }
    ]}
  ];
  
  let updatedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(process.cwd(), file.path);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file.path}`);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    for (const pattern of file.patterns) {
      content = content.replace(pattern.regex, pattern.replacement);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`Updated: ${file.path}`);
  }
  
  return {
    success: true,
    message: `Updated ${updatedCount} files with date: ${longFormat} (${shortFormat})`
  };
}

if (require.main === module) {
  const result = updateAIFreshnessDates();
  console.log(result.message);
}
