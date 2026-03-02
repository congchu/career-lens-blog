import fs from 'fs';
import path from 'path';

const CONTENTS_DIR = '/Users/jeongkoo/GitHub/career-lens-contents';
const OUTPUT_DIR = '/Users/jeongkoo/GitHub/career-lens-blog/content';

// posts.json 읽기
const posts = JSON.parse(fs.readFileSync(path.join(CONTENTS_DIR, 'posts.json'), 'utf-8'));

// 시리즈 이름에서 이모지 제거 (slug용)
const seriesSlugMap = {
  '🔢 숫자로 보는 채용시장': '숫자로보는채용시장',
  '📋 채용공고 번역기': '채용공고번역기',
  '🎯 신입 공략 가이드': '신입공략가이드',
  '📈 2026 프론트엔드 지도': '2026프론트엔드지도',
  '🤖 AI 시대 생존법': 'AI시대생존법',
  '🔎 취업 현실 탐구': '취업현실탐구',
};

let migrated = 0;
let skipped = 0;

for (const post of posts) {
  const blogPath = path.join(CONTENTS_DIR, post.path, 'blog.md');
  
  if (!fs.existsSync(blogPath)) {
    skipped++;
    continue;
  }

  const content = fs.readFileSync(blogPath, 'utf-8');
  
  // 첫 번째 # 제목을 title로 쓰되, frontmatter의 title도 posts.json에서 가져옴
  const series = seriesSlugMap[post.series] || post.series.replace(/[^\w가-힣]/g, '');
  
  // slug 생성: 폴더명에서 날짜 뒤 부분
  const folderParts = post.folder.split('_');
  const slug = folderParts.slice(1).join('-').toLowerCase()
    .replace(/[^a-z0-9가-힣\-]/g, '')
    .replace(/-+/g, '-');

  const description = post.caption 
    ? post.caption.split('\n')[0].replace(/#\S+/g, '').trim().slice(0, 120)
    : post.title;

  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
series: "${series}"
tags: ${JSON.stringify(post.tags || [])}
description: "${description.replace(/"/g, '\\"')}"
slug: "${slug}"
---`;

  // blog.md 내용에서 첫 번째 # 제목 줄 제거 (frontmatter title로 대체)
  const lines = content.split('\n');
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) {
      startIdx = i + 1;
      break;
    }
  }
  
  const body = lines.slice(startIdx).join('\n').trimStart();
  const mdxContent = frontmatter + '\n\n' + body;
  
  const outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent);
  migrated++;
  console.log(`✅ ${post.folder} → ${slug}.mdx`);
}

console.log(`\n완료: ${migrated}편 변환, ${skipped}편 스킵 (blog.md 없음)`);
