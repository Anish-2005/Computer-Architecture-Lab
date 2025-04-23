import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaMicrochip, 
  FaWaveSquare, 
  FaProjectDiagram, 
  FaCode, 
  FaRegClock, 
  FaFlask, 
  FaGraduationCap, 
  FaHome, 
  FaBook,
  FaUniversity,
  FaTools,
  FaRobot,
  FaChartLine
} from 'react-icons/fa';

const LearnPage = () => {
  const concepts = [
    {
      icon: <FaMicrochip className="text-cyan-400" />,
      title: "Computer Architecture Fundamentals",
      description: "Dive deep into von Neumann architecture, pipelining, and cache hierarchy. Explore modern CPU design principles including superscalar execution and branch prediction.",
      subsections: [
        "Harvard vs von Neumann architectures",
        "Memory hierarchy: Registers, Cache, RAM",
        "Instruction Set Architecture (ISA) design"
      ]
    },
    {
      icon: <FaWaveSquare className="text-purple-400" />,
      title: "VHDL Mastery",
      description: "From basic syntax to advanced constructs. Learn concurrent vs sequential statements, generate blocks, and protected types.",
      subsections: [
        "Entity-Architecture structure",
        "Process statements and sensitivity lists",
        "Packages and configurations"
      ]
    },
    {
      icon: <FaFlask className="text-emerald-400" />,
      title: "Advanced Verification",
      description: "Master testbench automation with OSVVM. Learn constrained random verification and functional coverage analysis.",
      subsections: [
        "Transaction-based verification",
        "Scoreboard architecture",
        "Coverage-driven verification"
      ]
    },
    {
      icon: <FaProjectDiagram className="text-amber-400" />,
      title: "FPGA Design Ecosystem",
      description: "Complete guide to FPGA toolchains. From synthesis constraints to timing closure strategies.",
      subsections: [
        "Xilinx Vivado workflow",
        "Intel Quartus Prime setup",
        "Static timing analysis"
      ]
    },
    {
      icon: <FaCode className="text-pink-400" />,
      title: "RTL Design Patterns",
      description: "Learn reusable design patterns for finite state machines, FIFOs, and bus interfaces.",
      subsections: [
        "Synchronous vs asynchronous FIFOs",
        "Wishbone vs AXI interfaces",
        "Low-power design techniques"
      ]
    },
    {
      icon: <FaGraduationCap className="text-yellow-400" />,
      title: "Digital Design Mathematics",
      description: "Essential math for hardware designers: Boolean algebra, finite state machines, and timing analysis.",
      subsections: [
        "Karnaugh maps optimization",
        "State minimization techniques",
        "Clock domain crossing strategies"
      ]
    }
  ];

  const learningPath = [
    { title: "Beginner", icon: <FaBook />, topics: ["Basic Gates", "Combinational Logic", "Simple FSMs"] },
    { title: "Intermediate", icon: <FaTools />, topics: ["Pipelining", "Memory Controllers", "Bus Interfaces"] },
    { title: "Advanced", icon: <FaRobot />, topics: ["SoC Design", "High-Speed SerDes", "DFT Techniques"] },
    { title: "Expert", icon: <FaChartLine />, topics: ["ASIC Flow", "Formal Verification", "Power Analysis"] }
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
              to="/"
              className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-all"
            >
              <FaHome className="text-sm" />
              Home
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <div className="mt-16 inline-block mb-6 sm:mb-8 px-4 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-300 text-sm">
            Master Digital Design from Transistors to Systems
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 leading-tight">
            VHDL & Computer Architecture Academy
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-10 max-w-3xl mx-auto">
            Journey through 40+ years of computing evolution. From basic logic gates to modern RISC-V architectures. 
            Interactive labs, real hardware examples, and industry-standard tool flows.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900/50 rounded-xl border border-cyan-500/20"
            >
              <FaUniversity className="text-3xl text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">University Curriculum</h3>
              <p className="text-sm text-gray-400">MIT 6.004 & Berkeley CS152 aligned</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900/50 rounded-xl border border-purple-500/20"
            >
              <FaTools className="text-3xl text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Industry Tools</h3>
              <p className="text-sm text-gray-400">Vivado, Quartus, ModelSim</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Learning Path Visualization */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 mb-8">
            Structured Learning Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {learningPath.map((stage, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl"
              >
                <div className="text-3xl mb-4 text-cyan-400">{stage.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{stage.title}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {stage.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Concept Explorer */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 mb-8">
            Interactive Concept Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl"
              >
                <div className="text-3xl mb-4">{concept.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">{concept.title}</h3>
                <p className="text-gray-400 mb-4">{concept.description}</p>
                <div className="border-t border-cyan-500/20 pt-4">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Topics:</h4>
                  <ul className="space-y-2">
                    {concept.subsections.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Code Playground */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 mb-8">
            Live VHDL Playground
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Entity Example */}
            <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
              <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-sm text-cyan-400">rtl/neuron.vhd</span>
              </div>
              <pre className="p-4 sm:p-8 font-mono text-sm overflow-x-auto bg-gradient-to-br from-gray-950 to-gray-900">
                <code className="text-cyan-300">{`ENTITY neuron IS
  GENERIC(
    INPUTS : integer := 4;
    WIDTH  : integer := 8
  );
  PORT(
    clk      : IN  std_logic;
    weights  : IN  std_logic_vector(INPUTS*WIDTH-1 DOWNTO 0);
    inputs   : IN  std_logic_vector(INPUTS*WIDTH-1 DOWNTO 0);
    output   : OUT std_logic_vector(WIDTH*2-1 DOWNTO 0)
  );
END neuron;

ARCHITECTURE pipelined OF neuron IS
  TYPE mult_array IS ARRAY (0 TO INPUTS-1) OF signed(WIDTH*2-1 DOWNTO 0);
  SIGNAL products : mult_array;
BEGIN
  PROCESS(clk)
  BEGIN
    IF rising_edge(clk) THEN
      FOR i IN 0 TO INPUTS-1 LOOP
        products(i) <= signed(weights((i+1)*WIDTH-1 DOWNTO i*WIDTH)) * 
                      signed(inputs((i+1)*WIDTH-1 DOWNTO i*WIDTH));
      END LOOP;
      output <= std_logic_vector(sum(products));
    END IF;
  END PROCESS;
END pipelined;`}</code>
              </pre>
            </div>

            {/* Test Bench Example */}
            <div className="bg-gray-900/80 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
              <div className="px-6 py-4 border-b border-purple-500/20 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-sm text-purple-400">tb/neuron_tb.vhd</span>
              </div>
              <pre className="p-4 sm:p-8 font-mono text-sm overflow-x-auto bg-gradient-to-br from-gray-950 to-gray-900">
                <code className="text-purple-300">{`PROCESS
  VARIABLE total_errors : integer := 0;
BEGIN
  -- Test case 1: Basic MAC operation
  weights <= x"01020304";
  inputs  <= x"00000000";
  WAIT FOR 20 ns;
  ASSERT output = x"0000" REPORT "Reset failed" SEVERITY error;

  -- Test case 2: Vector multiplication
  weights <= x"02020202";
  inputs  <= x"01010101";
  WAIT FOR 20 ns;
  ASSERT output = x"0008" REPORT "Summation error" SEVERITY error;

  -- Add more test cases...
  REPORT "Test complete with " & integer'image(total_errors) & " errors";
  WAIT;
END PROCESS;`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lab Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 mb-8">
            Hands-On Labs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
              <div className="text-cyan-400 text-2xl mb-3">Lab 1</div>
              <h4 className="text-lg font-semibold mb-2">RISC-V Core Implementation</h4>
              <p className="text-sm text-gray-400 mb-4">Implement RV32IM core with 5-stage pipeline</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs">Verilog</span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs">Testbenches</span>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-full text-xs">Synthesis</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
              <div className="text-purple-400 text-2xl mb-3">Lab 2</div>
              <h4 className="text-lg font-semibold mb-2">DDR3 Memory Controller</h4>
              <p className="text-sm text-gray-400 mb-4">Implement PHY interface and refresh logic</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs">VHDL</span>
                <span className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs">Timing Closure</span>
                <span className="px-2 py-1 bg-pink-500/10 text-pink-300 rounded-full text-xs">Simulation</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
              <div className="text-amber-400 text-2xl mb-3">Lab 3</div>
              <h4 className="text-lg font-semibold mb-2">FPGA Design Optimization</h4>
              <p className="text-sm text-gray-400 mb-4">Explore timing analysis, resource usage, and optimization techniques for FPGA designs</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs">FPGA</span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs">Place & Route</span>
                <span className="px-2 py-1 bg-pink-500/10 text-pink-300 rounded-full text-xs">Optimization</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 text-center py-8 mt-16">
        <div className="text-gray-400">
          <p>© 2025 ArchLab Academy. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://twitter.com" className="text-cyan-300 hover:text-cyan-200 transition-all">Twitter</a>
            <a href="https://github.com" className="text-cyan-300 hover:text-cyan-200 transition-all">GitHub</a>
            <a href="https://linkedin.com" className="text-cyan-300 hover:text-cyan-200 transition-all">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnPage;