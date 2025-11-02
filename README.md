# Advanced Developer Portfolio 2.0

A modern, interactive portfolio website built with cutting-edge web technologies featuring stunning 3D animations, smooth scrolling, and an immersive user experience.

## ✨ Features

### 🎨 Interactive Design

- **3D Floating Blob** with dynamic morphing animations
- **Interactive Skill Tree** with RPG-style level system
- **Particle Systems** with floating particles and animated backgrounds
- **Glassmorphism UI** with backdrop blur effects
- **Smooth Scrolling** navigation with progress indicator
- **Theme Toggle** between dark and light modes

### � Modern Tech Stack

- **Next.js 14** with App Router and TypeScript
- **React Three Fiber** for WebGL 3D rendering
- **Drei** for 3D helpers and utilities
- **Framer Motion** for fluid animations and transitions
- **Tailwind CSS** for utility-first styling
- **Lenis** for buttery smooth scrolling
- **React Hook Form** for form validation

### 📱 Responsive & Accessible

- **Mobile-first design** optimized for all screen sizes
- **Performance optimized** with lazy loading and code splitting
- **SEO friendly** with proper meta tags and structured data
- **Keyboard navigation** and accessibility features

## � Key Components

### Hero Section

- Animated 3D floating blob with real-time morphing
- Typewriter effect with multiple text animations
- Particle background with interactive elements
- Call-to-action buttons with hover effects

### Interactive Skill Tree

- 25 skill bubbles arranged in a 5×5 grid
- Hover tooltips with detailed skill information
- Click interactions to explore expertise levels
- Visual level indicators and project associations
- Floating animation effects

### Project Showcase

- Interactive project cards with 3D transforms
- Modal dialogs with detailed project information
- Technology stack visualization
- GitHub integration and live demo links

### Contact Form

- Real-time form validation
- Animated input fields
- Success/error state handling
- Responsive layout design

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd Portfolio_2.0

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

## 📁 Project Architecture

```
Portfolio_2.0/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── sections/           # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── tech-stack-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── three/              # 3D components
│   │   │   ├── floating-blob.tsx
│   │   │   ├── particle-field.tsx
│   │   │   ├── animated-background.tsx
│   │   │   └── scene.tsx
│   │   ├── ui/                 # UI components
│   │   │   └── loading-spinner.tsx
│   │   ├── navigation.tsx      # Navigation component
│   │   ├── scroll-progress.tsx # Scroll indicator
│   │   ├── smooth-scroll.tsx   # Lenis integration
│   │   └── theme-provider.tsx  # Theme context
│   └── hooks/                  # Custom React hooks
│       ├── use-typing-effect.ts
│       ├── use-scroll-camera.ts
│       ├── use-lenis.ts
│       └── use-in-view.ts
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies
```

## 🎨 Technology Deep Dive

### 3D Rendering Pipeline

- **React Three Fiber**: Declarative 3D scene management
- **WebGL Shaders**: Custom fragment shaders for blob morphing
- **Performance Optimization**: Frame rate optimization and LOD systems
- **Interactive Elements**: Mouse/touch interaction with 3D objects

### Animation System

- **Framer Motion**: Physics-based animations and gestures
- **CSS Animations**: Custom keyframe animations for particles
- **Scroll-triggered Animations**: Intersection Observer API integration
- **Performance**: Hardware acceleration and animation optimization

### State Management

- **React Context**: Theme and global state management
- **Local State**: Component-level state with hooks
- **Form State**: React Hook Form for complex forms
- **URL State**: Next.js router for navigation state

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Other Platforms

- **Netlify**: Connect GitHub repository for auto-deployment
- **Railway**: Configure build command and environment variables
- **Heroku**: Use Node.js buildpack with proper start script

## 🔧 Configuration

### Tailwind CSS Customization

The project uses custom Tailwind configuration with:

- Extended color palette for glassmorphism effects
- Custom animation keyframes
- Responsive breakpoints for optimal mobile experience
- Typography scale and font configurations

### Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Loading**: Local font optimization
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Custom rules for React and Next.js
- **Prettier**: Code formatting automation
- **Husky**: Pre-commit hooks for quality assurance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

**Built with modern web technologies for optimal performance and user experience** 🚀
