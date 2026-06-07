// ──────────────────────────────────────────────
// Portfolio Config — Edit this file to customize all texts
// ──────────────────────────────────────────────

export const config = {
  // ── Personal Info ──
  name: 'BleakRed',
  tagline: 'Developer · Junior · Creator',
  bio: 'Junior developer crafting tools and experiences that feel alive. Currently based in Ulaanbaatar.',
  
  avatar: 'https://github.com/bleakred.png',
  github: 'bleakred',
  linkedin: 'bleakred',
  email: 'sw22d045@mandakh.edu.mn',
  location: 'Ulaanbaatar, Mongolia',
  education: 'CS Graduate',
  hobbies: 'Gaming, Automation, Side Projects',
  githubUsers: ['BleakRed', '0Orchlon'],

  // ── Background Music (put your .mp3 in public/assets/audio/) ──
  musicUrl: '/Portfolio/assets/audio/AKBabelOST.mp3',

  // ── Coding Profiles (leave empty to hide) ──
  leetcode: 'BleakRed',
  hackerrank: '@BleakRed',
  youtubeVideos: [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/Qz1uIcq53Go?si'
  ],

  // ── About Section (Markdown) ──
  about: `# About Me

CS graduate with a passion for full-stack development. I've built collaborative web apps with real-time features, real-time drawing tools, and kanban systems — the kind of projects that become real tools people actually use.

I enjoy the full cycle: from designing the data model to shipping the UI. My stack of choice is TypeScript with React/Next.js on the frontend and Node.js/Prisma on the backend. Comfortable with databases, REST APIs, and socket-based real-time features.

When I'm not coding, I game. Simple as that.

## What I'm Doing Now

- Fresh CS graduate, actively looking for work
- Working on the portfolio you're looking at
- Playing around with game development in my spare time
- Always have a few side projects going`,

  // ── Skills Section (Markdown) ──
  skills: `## Frontend

TypeScript · JavaScript · React · Next.js · Tailwind CSS · Astro · Vite

## Backend

Node.js · Express · Prisma · Socket.io · REST APIs

## Tools & Ops

Git · Docker · PostgreSQL · Supabase · GitHub Actions · Figma

## Other

Vitest · Playwright · Python · Bash · Linux · CSS Animations`,

  // ── Projects ──
  projects: [
    {
      title: 'Notion Clone',
      tags: ['Next.js', 'TypeScript', 'Socket.io', 'Prisma', 'PostgreSQL'],
      description: 'Real-time collaborative canvas, pages, kanban boards, and chat. Built with Next.js, Node.js, Socket.io, and PostgreSQL. Includes auth, file management, and live co-op drawing features.',
      live: 'https://bleakdiploma.vercel.app',
      source: 'https://github.com/BleakRed/Digital-note-taking-and-collaboration-system',
    },
    {
      title: 'Portfolio (this site)',
      tags: ['Astro', 'Tailwind CSS', 'React', 'GitHub Pages'],
      description: 'Static site deployed on GitHub Pages. Minimal JS footprint, fast loading, responsive design. Built to showcase projects and skills. Features a parallax hub layout inspired by Arknights: Endfield.',
      live: 'https://0Orchlon.github.io/portfolio',
      source: 'https://github.com/0Orchlon/portfolio',
    },
    {
      title: 'TicTacToe',
      tags: ['Flutter', 'Dart', 'Android', 'Game'],
      description: 'Tic-Tac-Toe game built with Flutter. Singleplayer mode with a smart bot that blocks wins, takes wins, or plays randomly. 3x3 grid with max 3 per shape (oldest is dequeued). 2-player 7x7 mode with max 5 per shape.',
      live: '#',
      source: 'https://github.com/0Orchlon/Tic_Tac_Toe_Mandakh',
      android: 'https://github.com/0Orchlon/Tic_Tac_Toe_Mandakh/releases/latest',
    },
  ],
};

export type Config = typeof config;
