
# Sanchila Amavi — Portfolio

Built with **Next.js 14** · **Tailwind CSS** · **TypeScript**  
Inspired by [sahas-eashanme.vercel.app](https://sahas-eashanme.vercel.app)

---

## 📁 Project Structure

```
sanchila-portfolio/
├── app/
│   ├── globals.css          ← All global styles + animations
│   ├── layout.tsx           ← Root layout + SEO metadata
│   └── page.tsx             ← Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx           ← Fixed top nav with mobile hamburger
│   ├── Footer.tsx           ← Footer with links
│   └── sections/
│       ├── Hero.tsx         ← Landing section with rotating roles + profile image
│       ├── About.tsx        ← Tabbed: Overview / Education / Coursework / Leadership
│       ├── Projects.tsx     ← Filterable project grid (All / AI&ML / IoT / Robotics)
│       ├── Skills.tsx       ← Interactive skill panel + full skill matrix
│       ├── Achievements.tsx ← Awards + certifications with image spaces
│       └── Contact.tsx      ← Contact form + social links
├── lib/
│   └── data.ts              ← ⭐ ALL YOUR CONTENT IS HERE — edit this file
├── public/
│   ├── images/              ← Put ALL your photos here
│   │   ├── profile.jpg      ← Hero profile photo (recommended: square, 500×500+)
│   │   ├── about.jpg        ← About section photo (recommended: portrait)
│   │   ├── mine-pulse.jpg   ← Mine Pulse project image
│   │   ├── fatigue.jpg      ← Driver Fatigue project image
│   │   ├── lankamesh.jpg    ← LankaMesh project image
│   │   ├── proctoring.jpg   ← AI Proctoring project image
│   │   ├── mars-robot.jpg   ← Mars Robot project image
│   │   ├── rosco.jpg        ← ROSCO robot project image
│   │   ├── cert-aiml.jpg    ← AI/ML cert image
│   │   ├── cert-dl.jpg      ← Deep Learning cert image
│   │   ├── cert-matlab.jpg  ← MATLAB cert image
│   │   └── achievement-shooting.jpg ← Shooting achievement photo
│   └── resume.pdf           ← Your CV/Resume
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

---

## 🚀 Quick Setup in VS Code

### Step 1 — Install Node.js
Download LTS from https://nodejs.org

### Step 2 — Open in VS Code
```bash
cd sanchila-portfolio
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Run locally
```bash
npm run dev
```
Open http://localhost:3000 — you'll see your portfolio live!

---

## ✏️ How to Edit Your Content

**All data is in one file: `lib/data.ts`**

Open it and edit:
- `personalInfo` → name, bio, links, GitHub URL, LinkedIn URL
- `projects[]` → add/edit/remove projects + their images
- `skills[]` → skill categories and tools
- `achievements[]` → competition wins
- `certifications[]` → your certifications
- `education[]` → education history
- `leadership[]` → leadership roles and organisations

---

## 🖼️ Adding Your Photos

### Profile photo
Place at: `public/images/profile.jpg`
- Recommended: square, minimum 500×500px
- Formats: .jpg, .png, .webp

### Project images
For each project in `lib/data.ts`, the `image` field shows where to put it:
```ts
image: "/images/mine-pulse.jpg",  // → public/images/mine-pulse.jpg
```
Just drop the file in `public/images/` and it will show up automatically.

### Certificate/Achievement images
Same pattern — add image path in `data.ts`, place file in `public/images/`.

### Resume
Place at: `public/resume.pdf`

---

## 🌐 Deploy to Vercel (Free, Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 2. Go to https://vercel.com → New Project → import repo → Deploy
# You'll get a live URL like: sanchila-portfolio.vercel.app
```

---

## 🎨 Customising Colors

Edit `tailwind.config.js`:
```js
accent: {
  DEFAULT: "#6c63ff",    // Main purple — change this
  light: "#a78bfa",     // Lighter purple
  green: "#34d399",     // Status badges green
},
bg: "#08080f",          // Page background
surface: "#0e0e1a",     // Cards/panels
```

---

## 🔗 Update Social Links

In `lib/data.ts`, update:
```ts
github: "https://github.com/YOUR_USERNAME",
linkedin: "https://linkedin.com/in/YOUR_PROFILE",
```

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Framework (App Router, static export) |
| TypeScript | Type safety |
| Tailwind CSS | Styling with custom design tokens |
| Lucide React | Icons |
| next/image | Optimised image handling |

---

## 🆘 Common Issues

**"Module not found"** → Run `npm install` again

**Photo not showing** → Make sure exact filename matches what's in `data.ts`

**Build error** → Run `npm run build` to see detailed errors

**Port 3000 in use** → Run `npm run dev -- -p 3001`
=======
# portfolio
Personal portfolio website showcasing projects, skills, and experience in Electronics &amp; Telecommunication Engineering, with a focus on AI, embedded systems and full-stack development.

