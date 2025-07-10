# 🏛️ Computer Architecture Lab

<div align="center">
  
  ![Computer Architecture](https://img.shields.io/badge/Computer%20Architecture-Lab-blue?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)
  ![VHDL](https://img.shields.io/badge/VHDL-Hardware%20Design-orange?style=for-the-badge)
  ![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite)
  
  **A comprehensive repository for digital design and computer architecture experiments** 🚀
  
  [View Demo](https://arch-vhdl.vercel.app/) · [Report Bug](https://github.com/Anish-2005/computer-architecture-lab/issues) · [Request Feature](https://github.com/Anish-2005/computer-architecture-lab/issues)
  
</div>

---

## � Table of Contents

- [🎯 About The Project](#-about-the-project)
- [✨ Features](#-features)
- [�️ Built With](#️-built-with)
- [🚀 Getting Started](#-getting-started)
- [📁 Repository Structure](#-repository-structure)
- [🧪 Hardware Experiments](#-hardware-experiments)
- [💻 Web Application](#-web-application)
- [🎮 Live Demo](#-live-demo)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📞 Contact](#-contact)

---

## 🎯 About The Project

Welcome to the **Computer Architecture Lab** repository! This comprehensive project combines theoretical computer architecture concepts with practical implementations, featuring:

- **Hardware Design**: Complete VHDL implementations of fundamental digital circuits
- **Interactive Web Platform**: A modern React-based learning environment
- **Educational Tools**: RTL generators, waveform visualizers, and interactive labs
- **Practical Experiments**: From basic logic gates to complex processor architectures

This repository serves as both a learning resource and a practical toolkit for computer architecture students and enthusiasts.

## ✨ Features

### 🔧 Hardware Design Suite
- ✅ Complete VHDL implementations of logic gates
- ✅ Schematic diagrams and waveform analysis
- ✅ Testbench files for simulation
- ✅ Ready-to-use Xilinx ISE projects

### 🌐 Interactive Web Platform
- ✅ Modern React-based user interface
- ✅ RTL (Register Transfer Level) code generator
- ✅ Interactive waveform generator
- ✅ Virtual laboratory environment
- ✅ Educational content and tutorials

### � Learning Resources
- ✅ Step-by-step experiment guides
- ✅ Visual circuit representations
- ✅ Interactive learning modules
- ✅ Comprehensive documentation

## 🛠️ Built With

### Hardware Design
- **ISE Xilinx** - FPGA Design Suite
- **VHDL** - Hardware Description Language
- **ModelSim** - Simulation Environment

### Web Application
- **React 19** - Frontend Framework
- **Vite** - Build Tool & Development Server
- **Framer Motion** - Animation Library
- **React Router** - Navigation
- **React Flow** - Interactive Node-based UI
- **React Icons** - Icon Library

---

## 🚀 Getting Started

### Prerequisites

#### For Hardware Design:
- **ISE Xilinx** (Version 14.x or later)
- **Windows/Linux** operating system
- **ModelSim** (Optional, for advanced simulation)

#### For Web Application:
- **Node.js** (Version 16.x or later)
- **npm** or **yarn** package manager

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Anish-2005/computer-architecture-lab.git
cd computer-architecture-lab
```

#### 2️⃣ Hardware Projects Setup
```bash
# Navigate to hardware assignments
cd Assignment-1

# Open any gate folder (AND Gate, OR Gate, NAND Gate)
cd "AND Gate"

# Open the .vhd files in ISE Xilinx
# Run simulations using the provided testbench files
```

#### 3️⃣ Web Application Setup
```bash
# Navigate to web application
cd computer-architecture

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Repository Structure

```
Computer-Architecture-Lab/
├── 📁 Assignment-1/                 # Hardware Design Experiments
│   ├── 📁 AND Gate/
│   │   ├── 📄 andgate.vhd          # VHDL implementation
│   │   ├── 📄 andtest.vhd          # Testbench file
│   │   ├── 🖼️ schematic.png        # Circuit schematic
│   │   └── 🖼️ waveform.png         # Simulation waveform
│   ├── 📁 NAND Gate/
│   │   ├── 📄 nand-gate.vhd        # VHDL implementation
│   │   ├── 📄 nand_test.vhd        # Testbench file
│   │   ├── 🖼️ schematic.png        # Circuit schematic
│   │   └── 🖼️ waveform.png         # Simulation waveform
│   └── 📁 OR Gate/
│       ├── 📄 or_gate.vhd          # VHDL implementation
│       ├── 📄 or_test.vhd          # Testbench file
│       ├── 🖼️ schematic.png        # Circuit schematic
│       └── �️ waveform.png         # Simulation waveform
├── 📁 computer-architecture/        # Web Application
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Landing.jsx      # Landing page
│   │   │   ├── 📄 Labs.jsx         # Virtual lab interface
│   │   │   ├── 📄 LearnPage.jsx    # Learning modules
│   │   │   ├── 📄 RTLGenerator.jsx # RTL code generator
│   │   │   └── 📄 WaveformGenerator.jsx # Waveform visualizer
│   │   ├── 📁 assets/              # Static assets
│   │   ├── 📄 App.jsx              # Main application
│   │   └── 📄 main.jsx             # Application entry point
│   ├── 📁 public/                  # Public assets
│   ├── 📄 package.json             # Dependencies
│   └── 📄 vite.config.js           # Vite configuration
└── 📄 README.md                    # This file
```

---

## 🧪 Hardware Experiments

### 🔌 Assignment 1: Fundamental Logic Gates

#### 1️⃣ AND Gate Implementation
- **File**: `Assignment-1/AND Gate/andgate.vhd`
- **Features**: 
  - Complete VHDL implementation
  - Comprehensive testbench
  - Schematic diagram included
  - Waveform analysis

#### 2️⃣ OR Gate Implementation  
- **File**: `Assignment-1/OR Gate/or_gate.vhd`
- **Features**: 
  - Behavioral modeling
  - Simulation testbench
  - Visual documentation

#### 3️⃣ NAND Gate Implementation
- **File**: `Assignment-1/NAND Gate/nand-gate.vhd`
- **Features**: 
  - Efficient VHDL code
  - Extensive testing
  - Performance analysis

### 🎯 How to Run Hardware Experiments

1. **Open ISE Xilinx**
2. **Create New Project** or open existing `.xise` file
3. **Add Source Files** (`.vhd` files from respective folders)
4. **Run Behavioral Simulation** using provided testbench
5. **Analyze Results** with included waveform images

---

## 💻 Web Application

### � Key Features

#### 🏠 Landing Page
- Modern, responsive design
- Quick navigation to all features
- Project overview and highlights

#### 🧪 Virtual Labs
- Interactive circuit simulation
- Real-time waveform generation
- Step-by-step experiment guidance

#### 📚 Learn Page
- Comprehensive tutorials
- Interactive learning modules
- Progressive difficulty levels

#### ⚡ RTL Generator
- Automated RTL code generation
- Multiple hardware description languages
- Export functionality

#### � Waveform Generator
- Interactive waveform creation
- Multiple signal types
- Export and analysis tools

### 🎮 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎮 Live Demo

🌐 **Web Application**: [Coming Soon - Deploy to Vercel]
📱 **Mobile Responsive**: Fully optimized for all devices
🚀 **Performance**: Optimized with Vite for fast loading

---

## 📸 Screenshots

<div align="center">
  
  ### 🏠 Landing Page
  *Modern and intuitive interface*
  
  ### 🧪 Virtual Laboratory
  *Interactive circuit simulation environment*
  
  ### 📊 Waveform Generator
  *Real-time waveform visualization*
  
  ### ⚡ RTL Generator  
  *Automated code generation tool*
  
</div>

---

## 🤝 Contributing

We welcome contributions from the community! � Here's how you can help:

### 🛠️ How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 🎯 Areas for Contribution

- 🔧 Additional hardware implementations
- 🌐 Web application enhancements
- 📚 Documentation improvements
- 🐛 Bug fixes and optimizations
- 🎨 UI/UX improvements

### 📋 Guidelines

- Follow existing code style
- Add comprehensive comments
- Include tests for new features
- Update documentation as needed

---

## 📜 License

📝 This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## � Contact

### 👨‍💻 Author
**Anish Seth**

- 🌐 **GitHub**: [@Anish-2005](https://github.com/Anish-2005)
- 📧 **Email**: anishseth0510@gmail.com
- 💼 **LinkedIn**: [Connect with me](https://linkedin.com/in/anish-seth)

### 🔗 Project Links
- 📁 **Repository**: [Computer-Architecture-Lab](https://github.com/Anish-2005/computer-architecture-lab)
- 🐛 **Issues**: [Report Issues](https://github.com/Anish-2005/computer-architecture-lab/issues)
- 💡 **Discussions**: [Join Discussions](https://github.com/Anish-2005/computer-architecture-lab/discussions)

---

<div align="center">
  
  **⭐ Star this repository if you find it helpful!**
  
  **Made with ❤️ by Anish Seth**
  
  ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Anish-2005.computer-architecture-lab)
  
</div>

---

*Happy coding! 💻🚀*
