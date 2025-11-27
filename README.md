# Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio automatically syncs your skills, projects, and profile information from your GitHub repositories and README file.

## ✨ Features

- **GitHub Integration**: Automatically fetches and displays your GitHub profile, repositories, and README
- **Dynamic Skills**: Skills are automatically extracted from your repository languages and topics
- **Featured Projects**: Showcases your top repositories with thumbnails and filters
- **Project Thumbnails**: Automatically fetches Open Graph images for each project
- **Dark/Light Mode**: Full theme support with system preference detection
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Modern UI**: Clean, modern design with smooth animations and transitions
- **SEO Optimized**: Built-in metadata and Open Graph support
- **Contact Form**: Easy-to-use contact form with mailto fallback
- **Fast Performance**: Server-side rendering with automatic caching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kayode96-max/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure your GitHub username by setting the environment variable:
```bash
export NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: GitHub REST API

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/
│   ├── Header.tsx        # Navigation header (centered links)
│   ├── Hero.tsx          # Hero section with profile picture
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills section
│   ├── Projects.tsx      # Projects showcase with thumbnails
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Footer
├── lib/
│   ├── github.ts         # GitHub API utilities
│   └── theme.tsx         # Theme context provider
└── types/
    └── github.ts         # TypeScript interfaces
```

## 🎨 Customization

### Changing the GitHub Username

Set the `NEXT_PUBLIC_GITHUB_USERNAME` environment variable to your GitHub username. The portfolio will automatically fetch your profile, repositories, and README.

### Styling

The portfolio uses Tailwind CSS for styling. You can customize colors, fonts, and other design tokens in the `tailwind.config.ts` file.

### Components

All components are modular and can be easily customized. Each component is located in the `src/components` directory.

## 📦 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the `NEXT_PUBLIC_GITHUB_USERNAME` environment variable
4. Deploy!

### Other Platforms

Build the project with:
```bash
npm run build
```

Then deploy the `.next` folder to your preferred platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [GitHub API](https://docs.github.com/en/rest) for the data integration