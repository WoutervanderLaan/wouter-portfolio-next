# Wouter van der Laan – Portfolio & Drawing App

This repository contains the personal website of artist Wouter van der Laan, built with [Next.js](https://nextjs.org). The site serves two main purposes:

- **Portfolio Website:**  
  Showcases Wouter's artistic work, including exhibitions, installations, paintings, and other projects. Each portfolio entry features images, descriptions, and contextual information, providing a comprehensive overview of the artist's practice.

- **Drawing App:**  
  An interactive, browser-based drawing application that allows users to create digital artworks. The app supports multiple tools, layers, and collaborative features, making it suitable for both solo and group drawing sessions.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- The **Portfolio** is accessible from the main navigation and displays a curated selection of works.
- The **Drawing App** can be found under the `/canvas` route, offering a creative playground for visitors.

---

## Features

### Portfolio

- Detailed project pages with images and descriptions
- Resume and exhibition history
- Responsive, accessible design

### Drawing App

- Real-time drawing with various brushes and tools
- Layer management and undo/redo
- Collaborative drawing sessions (multi-user support)
- Save and export your creations

---

## Learn More

- [Wouter van der Laan – Instagram](https://www.instagram.com/wvanderlaan/)

---

## Folder Structure & Atomic Design

This project follows the Atomic Design methodology for organizing UI components:

- **Atoms:** Basic building blocks such as buttons, icons, and text elements. Found in `src/components/atoms/`.
- **Molecules:** Combinations of atoms that form more complex UI elements, like color pickers or close buttons. Found in `src/components/molecules/`.
- **Organisms:** Groups of molecules and/or atoms that form distinct sections of the interface. Found in `src/components/organisms/`.
- **Templates:** Page-level layouts that arrange organisms, molecules, and atoms. Found in `src/components/templates/`.

Other notable folders:

- **app/**: Contains the main application routes and layout files.
- **context/**: React context providers for state management (e.g., drawing, theme, authentication).
- **hooks/**: Custom React hooks for drawing, layers, theme, and more.
- **lib/** and **utils/**: Utility functions and network logic.
- **public/**: Static assets such as images and icons.

This structure promotes reusability, scalability, and maintainability throughout the codebase.
