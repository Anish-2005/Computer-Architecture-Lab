import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrochip, FaWaveSquare, FaProjectDiagram, FaCode, FaRegClock, FaFlask, FaDownload } from 'react-icons/fa';

const ArchitectureLanding = () => {
  const features = [
    {
      icon: <FaMicrochip className="text-cyan-400" />,
      title: "RTL Design Studio",
      description: "Xilinx ISE integrated workflow for VHDL development with real-time synthesis checks"
    },
    {
      icon: <FaWaveSquare className="text-purple-400" />,
      title: "Waveform Analysis",
      description: "ISim integration for test bench validation with customizable timing diagrams"
    },
    {
      icon: <FaFlask className="text-emerald-400" />,
      title: "Test Bench Automation",
      description: "Auto-generate test cases and verify timing constraints with smart assertions"
    },
    {
      icon: <FaRegClock className="text-amber-400" />,
      title: "Timing Simulation",
      description: "Post-synthesis timing analysis with setup/hold time violation detection"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 animate-grid-pulse bg-[length:40px_40px] bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]" />
      </div>
  
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed w-full top-4 px-4 sm:px-6 z-50"
      >
        <div className="backdrop-blur-xl bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 shadow-2xl shadow-cyan-500/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-lg transform group-hover:rotate-12 transition-all">
              <FaMicrochip className="text-xl" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              ARCHLAB
            </h1>
          </Link>
          <div className="flex gap-2 sm:gap-4">
            <Link
              to="/vhdl-labs"
              className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-all"
            >
              <FaCode className="text-sm" />
              Labs
            </Link>
          </div>
        </div>
      </motion.nav>
  
      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="mt-16 inline-block mb-6 sm:mb-8 px-4 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-300 text-sm">
            Xilinx ISE Integrated • VHDL 2019 • FPGA Synthesis
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Digital Architecture Lab
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
            Master VHDL development with full Xilinx ISE integration, from RTL design<br />
            to test bench validation and FPGA bitstream generation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              to="/vhdl-rtl"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl font-medium flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/20"
            >
              <FaDownload />
              VHDL RTL Generator
            </Link>
            <Link
              to="/vhdl-test"
              className="px-6 py-3 sm:px-8 sm:py-4 border border-cyan-500/30 bg-gray-900/50 rounded-xl font-medium flex items-center gap-3 hover:bg-cyan-500/10 transition-colors"
            >
              <FaFlask />
              Test Bench
            </Link>
          </div>
        </motion.div>
      </div>
  
      {/* Workflow */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 bg-gray-900/50 rounded-2xl border border-cyan-500/20">
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-6 sm:mb-8 text-center">VHDL Development Workflow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {[
                ["1. RTL Design", "VHDL Entity/Architecture"],
                ["2. Test Bench", "Test Cases & Assertions"],
                ["3. Simulation", "ISim Waveform Analysis"],
                ["4. Synthesis", "XST FPGA Optimization"],
                ["5. Implementation", "Bitstream Generation"],
              ].map(([title, desc], i) => (
                <div key={i} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-cyan-400 text-lg sm:text-xl mb-2">{title}</div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Features */}
      <div className="relative z-10 py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-colors group"
              >
                <div className="mb-4 text-2xl sm:text-3xl">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-cyan-300">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
  
      {/* Code Examples */}
      <div className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Entity */}
          <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
            <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm text-cyan-400">rtl/alu.vhd</span>
            </div>
            <pre className="p-4 sm:p-8 font-mono text-sm overflow-x-auto bg-gradient-to-br from-gray-950 to-gray-900">
              <code className="text-cyan-300">{`ENTITY ALU IS
  PORT(
    clk      : IN  STD_LOGIC;
    opcode   : IN  STD_LOGIC_VECTOR(2 DOWNTO 0);
    operandA : IN  STD_LOGIC_VECTOR(7 DOWNTO 0);
    operandB : IN  STD_LOGIC_VECTOR(7 DOWNTO 0);
    result   : OUT STD_LOGIC_VECTOR(7 DOWNTO 0);
    flags    : OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
  );
END ALU;`}</code>
            </pre>
          </div>
  
          {/* Test Bench */}
          <div className="bg-gray-900/80 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
            <div className="px-6 py-4 border-b border-purple-500/20 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm text-purple-400">tb/alu_tb.vhd</span>
            </div>
            <pre className="p-4 sm:p-8 font-mono text-sm overflow-x-auto bg-gradient-to-br from-gray-950 to-gray-900">
              <code className="text-purple-300">{`PROCESS
BEGIN
  -- Test ADD operation
  opcode <= "100";
  operandA <= x"0A";
  operandB <= x"03";
  WAIT FOR 10 ns;
  ASSERT result = x"0D"
    REPORT "Addition failed" SEVERITY ERROR;

  -- Test XOR operation  
  opcode <= "010";
  operandA <= x"FF";
  operandB <= x"AA";
  WAIT FOR 10 ns;
  ASSERT result = x"55"
    REPORT "XOR failed" SEVERITY ERROR;
END PROCESS;`}</code>
            </pre>
          </div>
        </div>
      </div>
  
      {/* Toolchain */}
      <div className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-10">Integrated Toolchain</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              ["Xilinx ISE", "Synthesis & Implementation", "https://upload.wikimedia.org/wikipedia/en/0/0a/XilinxISE_DS_Logo.jpg", "cyan"],
              ["ISim", "Behavioral Simulation", "https://www.thalesgroup.com/sites/default/files/database/assets/images/2023-02/mcs-iSIM-logo.jpg", "purple"],
              ["ModelSim", "Advanced Verification", "https://maker-hub.georgefox.edu/w/images/thumb/d/da/Modelsim_logo.jpg/261px-Modelsim_logo.jpg", "emerald"],
              ["Vivado", "Modern Synthesis Flow", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmIKfWq3D6d0efXloU4itrHFht2uqzQfUFoQ&s", "amber"],
            ].map(([name, desc, img, color], i) => (
              <div key={i} className={`p-6 bg-gray-900/50 rounded-xl border border-${color}-500/20`}>
                <img src={img} alt={name} className="h-12 mx-auto mb-4" />
                <div className={`text-lg text-${color}-300`}>{name}</div>
                <div className="text-sm text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-4">© {new Date().getFullYear()} ArchLab - Xilinx ISE Compatible - MIT License</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/ise-setup" className="hover:text-cyan-300 transition-colors">
              ISE Setup Guide
            </Link>
            <Link to="/vhdl-cheatsheet" className="hover:text-cyan-300 transition-colors">
              VHDL Cheatsheet
            </Link>
            <Link to="/fpga-projects" className="hover:text-cyan-300 transition-colors">
              FPGA Projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
  
};

export default ArchitectureLanding;