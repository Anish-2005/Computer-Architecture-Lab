import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaCode, FaProjectDiagram, FaRegFileCode, FaSitemap, FaArrowLeft, FaExclamationTriangle, FaMicrochip, FaPlug, FaSave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Storage configuration
const STORAGE_KEY = 'vhdlCodeCache';
const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

// Node types definition
const nodeTypes = {
  entity: ({ data }) => (
    <div className="p-4 bg-gray-800 border-2 border-cyan-500 rounded-lg shadow-lg">
      <div className="text-cyan-400 font-mono text-lg mb-3 flex items-center gap-2">
        <FaMicrochip className="text-cyan-300" />
        {data.entity.name}
      </div>
      <div className="space-y-2">
        {data.entity.ports.filter(p => p.mode === 'IN').map((port, pIndex) => (
          <div key={`in-${pIndex}`} className="flex items-center text-sm text-green-400">
            <FaPlug className="mr-2 text-xs" />
            {port.name} : {port.type}
          </div>
        ))}
      </div>
      <div className="my-3 h-px bg-cyan-500/20" />
      <div className="space-y-2">
        {data.entity.ports.filter(p => p.mode === 'OUT').map((port, pIndex) => (
          <div key={`out-${pIndex}`} className="flex items-center text-sm text-purple-400 justify-end">
            {port.name} : {port.type}
            <FaPlug className="ml-2 text-xs" />
          </div>
        ))}
      </div>
    </div>
  ),
  port: ({ data }) => (
    <div className={`px-3 py-2 rounded-md border ${
      data.port.mode === 'IN' ? 'bg-green-900/20 border-green-500' : 'bg-purple-900/20 border-purple-500'
    }`}>
      <span className={`font-mono text-sm ${
        data.port.mode === 'IN' ? 'text-green-400' : 'text-purple-400'
      }`}>
        {data.port.name}
      </span>
    </div>
  )
};

// VHDL Parser
const parseVHDL = (code) => {
  const entities = [];
  const entityRegex = /ENTITY\s+(\w+)\s+IS\s+PORT\s*\(([\s\S]*?)\);\s+END/gi;
  let entityMatch;
  
  while ((entityMatch = entityRegex.exec(code)) !== null) {
    const ports = [];
    const portRegex = /(\w+)\s*:\s*(IN|OUT|INOUT)\s+(\w+(?:\s*\w+)*)/gi;
    let portMatch;
    
    while ((portMatch = portRegex.exec(entityMatch[2])) !== null) {
      ports.push({
        name: portMatch[1],
        mode: portMatch[2],
        type: portMatch[3]
      });
    }
    
    entities.push({
      name: entityMatch[1],
      ports,
      metadata: {
        luts: Math.floor(Math.random() * 100),
        delay: (Math.random() * 5).toFixed(2)
      }
    });
  }
  
  return { entities };
};

const VhdlRtlVisualizer = () => {
  // State initialization with localStorage
  const [vhdlCode, setVhdlCode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { code, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < EXPIRATION_TIME) {
          return code;
        }
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Failed to parse saved VHDL code", e);
      }
    }
    return `ENTITY nand_gate IS
  PORT(
    a : IN  STD_LOGIC;
    b : IN  STD_LOGIC;
    y : OUT STD_LOGIC
  );
END nand_gate;`;
  });

  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        code: vhdlCode,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [vhdlCode]);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    setError('');
    try {
      const parsed = parseVHDL(vhdlCode);
      const nodes = [];
      const edges = [];
      let xPos = 50;
      let yPos = 50;

      parsed.entities.forEach((entity, index) => {
        nodes.push({
          id: `entity-${index}`,
          type: 'entity',
          position: { x: xPos, y: yPos },
          data: { entity },
          sourcePosition: 'right',
          targetPosition: 'left'
        });

        entity.ports.forEach((port, pIndex) => {
          const portNode = {
            id: `port-${index}-${pIndex}`,
            type: 'port',
            position: {
              x: port.mode === 'IN' ? xPos - 150 : xPos + 250,
              y: yPos + 50 + pIndex * 40
            },
            data: { port }
          };
          nodes.push(portNode);

          edges.push({
            id: `edge-${index}-${pIndex}`,
            source: port.mode === 'IN' ? `port-${index}-${pIndex}` : `entity-${index}`,
            target: port.mode === 'IN' ? `entity-${index}` : `port-${index}-${pIndex}`,
            animated: port.mode === 'OUT',
            style: {
              stroke: port.mode === 'IN' ? '#34d399' : '#8b5cf6',
              strokeWidth: 2,
            },
            markerEnd: {
              type: 'arrowclosed',
              color: port.mode === 'IN' ? '#34d399' : '#8b5cf6'
            }
          });
        });

        xPos += 400;
        if (xPos > 1000) {
          xPos = 50;
          yPos += 300;
        }
      });

      setElements({ nodes, edges });
    } catch (err) {
      setError(`Error parsing VHDL: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLastSaved(null);
  };

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Circuit Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2YjZkNCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]"></div>
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed w-full top-4 px-6 z-50"
      >
        <div className="backdrop-blur-xl bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 flex justify-between items-center shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-lg transform hover:rotate-12 transition-all">
              <FaRegFileCode className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                VHDL → RTL Visualizer
              </h1>
              <p className="text-xs text-cyan-500 mt-1">
                {isAnalyzing ? 'Analyzing...' : 'Ready'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="hidden md:flex items-center gap-2 text-xs text-cyan-400">
                <FaSave className="text-xs" />
                <span>{new Date(lastSaved).toLocaleTimeString()}</span>
              </div>
            )}
            <div className="hidden md:flex items-center gap-2 text-sm text-cyan-300">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Blocks: {elements.nodes.filter(n => n.type === 'entity').length}</span>
              <span>Signals: {elements.edges.length}</span>
            </div>
            <Link 
              to="/" 
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform text-sm border border-cyan-500/30 hover:border-cyan-400/50"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Code Editor Section */}
            <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-gradient-to-r from-cyan-900/30 to-emerald-900/20">
                <div className="flex items-center gap-3">
                  <FaCode className="text-cyan-400" />
                  <span className="text-sm text-cyan-300">VHDL Editor</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={clearStorage}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Clear Cache
                  </button>
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Examples ▼
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={vhdlCode}
                  onChange={(e) => setVhdlCode(e.target.value)}
                  className="w-full h-96 bg-gray-950/50 p-6 font-mono text-sm text-cyan-300 focus:outline-none resize-none"
                  placeholder="-- Enter your VHDL code here..."
                  style={{ lineHeight: '1.5', tabSize: 2 }}
                  spellCheck="false"
                />
                <div className="absolute bottom-4 right-4 text-xs text-cyan-500 bg-gray-900/50 px-2 py-1 rounded">
                  {vhdlCode.split('\n').length} lines
                </div>
              </div>
              <div className="p-4 border-t border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 to-transparent flex justify-between">
                <button
                  onClick={clearStorage}
                  className="px-4 py-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={analyzeCode}
                  disabled={isAnalyzing}
                  className={`px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaProjectDiagram className={`transition-transform ${isAnalyzing ? 'animate-spin' : 'group-hover:rotate-45'}`} />
                  <span>{isAnalyzing ? 'Processing...' : 'Generate Schematic'}</span>
                </button>
              </div>
            </div>

            {/* Visualization Panel */}
            <div className="bg-gray-900/80 border border-emerald-500/20 rounded-2xl shadow-2xl shadow-emerald-500/10 h-[600px] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between bg-gradient-to-r from-emerald-900/30 to-cyan-900/20">
                <div className="flex items-center gap-3">
                  <FaSitemap className="text-emerald-400" />
                  <span className="text-sm text-emerald-300">RTL Schematic</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                    Export SVG
                  </button>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                    Zoom Fit
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                {error && (
                  <div className="absolute top-4 left-4 right-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3 z-10">
                    <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                )}
                
                {elements.nodes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <FaSitemap className="text-4xl mb-4 opacity-30" />
                    <p>Generated schematic will appear here</p>
                    <p className="text-xs mt-2">Click "Generate Schematic" to visualize your VHDL</p>
                  </div>
                ) : (
                  <ReactFlow
                    nodes={elements.nodes}
                    edges={elements.edges}
                    nodeTypes={memoizedNodeTypes}
                    fitView
                    className="bg-gray-900"
                    defaultEdgeOptions={{
                      type: 'smoothstep',
                      animated: true,
                      style: { strokeWidth: 2 },
                      markerEnd: { type: 'arrowclosed' }
                    }}
                  >
                    <Background 
                      color="#0f172a" 
                      gap={48}
                      variant="dots"
                      size={1}
                    />
                    <Controls 
                      className="!bg-gray-900/80 !border !border-cyan-500/20"
                      style={{ backdropFilter: 'blur(4px)' }}
                    />
                  </ReactFlow>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ArchLab - VHDL RTL Visualizer (v1.0)
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              Documentation
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
              Feedback
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VhdlRtlVisualizer;