import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaWaveSquare, FaRegClock, FaRegFileAlt, FaArrowLeft, 
         FaExclamationTriangle, FaSave, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Storage configuration
const TB_STORAGE_KEY = 'vhdlTbCodeCache';
const TB_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

// Default test bench template
const DEFAULT_TB_TEMPLATE = `LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
USE ieee.numeric_std.ALL;

ENTITY tb_nand_gate IS
END tb_nand_gate;

ARCHITECTURE behavior OF tb_nand_gate IS 
    -- Component Declaration for the Unit Under Test (UUT)
    COMPONENT nand_gate
    PORT(
         a : IN  std_logic;
         b : IN  std_logic;
         y : OUT std_logic
        );
    END COMPONENT;
    
   -- Inputs
   signal a : std_logic := '0';
   signal b : std_logic := '0';

   -- Outputs
   signal y : std_logic;

   -- Clock period definitions
   constant clk_period : time := 10 ns;
BEGIN 
    -- Instantiate the Unit Under Test (UUT)
    uut: nand_gate PORT MAP (
          a => a,
          b => b,
          y => y
        );

    -- Stimulus process
    stim_proc: process
    begin        
        -- Test case 1
        a <= '0'; b <= '0';
        wait for clk_period;
        
        -- Test case 2
        a <= '0'; b <= '1';
        wait for clk_period;
        
        -- Test case 3
        a <= '1'; b <= '0';
        wait for clk_period;
        
        -- Test case 4
        a <= '1'; b <= '1';
        wait for clk_period;
        
        -- End simulation
        wait;
    end process;
END;`;

// Custom Waveform Component
const WaveformViewer = ({ signals, currentTime, duration, timeUnit, zoom }) => {
    return (
      <div className="waveform-container" style={{ overflowX: 'auto', padding: '10px 0' }}>
        {signals.map((signal, index) => (
          <div 
            key={index} 
            className="signal" 
            style={{ 
              marginBottom: '30px',
              minWidth: `${duration * zoom}px`,
              position: 'relative'
            }}
          >
            <div 
              className="signal-name" 
              style={{ 
                width: '100px', 
                display: 'inline-block',
                color: '#5eead4', // cyan-300
                position: 'sticky',
                left: '0',
                zIndex: 2,
                backgroundColor: '#0f172a', // slate-900
                padding: '5px 10px'
              }}
            >
              {signal.name}
            </div>
            <div 
              className="signal-wave" 
              style={{ 
                display: 'inline-block',
                position: 'relative',
                height: '30px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)', // cyan-500/10
                minWidth: `${duration * zoom}px`
              }}
            >
              {/* Signal waveform */}
              {signal.data.map((point, i) => {
                const nextPoint = signal.data[i + 1] || { time: duration };
                const width = (nextPoint.time - point.time) * zoom;
                const left = point.time * zoom;
                
                return (
                  <div 
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${left}px`,
                      width: `${width}px`,
                      height: '100%',
                      backgroundColor: point.value === 1 ? '#2dd4bf' : '#334155', // cyan-400 / slate-700
                      borderTop: '1px solid #06b6d4', // cyan-500
                      borderBottom: '1px solid #06b6d4' // cyan-500
                    }}
                  >
                    {i === 0 && (
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '100%',
                        color: '#5eead4', // cyan-300
                        fontSize: '10px',
                        whiteSpace: 'nowrap'
                      }}>
                        {point.time}{timeUnit}
                      </div>
                    )}
                  </div>
                );
              })}
  
              {/* Time markers */}
              {Array.from({ length: Math.floor(duration) + 1 }).map((_, i) => (
                <div
                  key={`marker-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${i * zoom}px`,
                    top: '0',
                    width: '1px',
                    height: '100%',
                    backgroundColor: 'rgba(6, 182, 212, 0.3)', // cyan-500/30
                    zIndex: 1
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '2px',
                    top: '100%',
                    color: 'rgba(94, 234, 212, 0.7)', // cyan-300/70
                    fontSize: '9px'
                  }}>
                    {i % 2 === 0 ? i : ''}
                  </div>
                </div>
              ))}
  
              {/* Current time cursor */}
              <div 
                className="cursor"
                style={{
                  position: 'absolute',
                  left: `${currentTime * zoom}px`,
                  top: '0',
                  width: '2px',
                  height: '100%',
                  backgroundColor: '#10b981', // emerald-500
                  zIndex: 3
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

// VHDL Test Bench Parser
const parseTestBench = (code) => {
  const signals = [];
  const testCases = [];
  let timeScale = '10 ns';
  
  // Extract signals
  const signalRegex = /signal\s+(\w+)\s*:\s*(\w+)\s*(?::=\s*'?([\w]+)'?)?/gi;
  let signalMatch;
  
  while ((signalMatch = signalRegex.exec(code)) !== null) {
    signals.push({
      name: signalMatch[1],
      type: signalMatch[2],
      initialValue: signalMatch[3] || '0'
    });
  }
  
  // Extract clock period
  const clockRegex = /constant\s+clk_period\s*:\s*time\s*:=\s*([\d]+\s*\w+)/i;
  const clockMatch = clockRegex.exec(code);
  if (clockMatch) {
    timeScale = clockMatch[1];
  }
  
  // Extract test cases
  const testCaseRegex = /([\w\s<='-]+);\s*wait for clk_period/gi;
  let testCaseMatch;
  
  while ((testCaseMatch = testCaseRegex.exec(code)) !== null) {
    const assignments = testCaseMatch[1].split(';').filter(a => a.trim());
    const testCase = {};
    
    assignments.forEach(assignment => {
      const parts = assignment.split('<=').map(p => p.trim());
      if (parts.length === 2) {
        testCase[parts[0]] = parts[1].replace(/'/g, '');
      }
    });
    
    if (Object.keys(testCase).length > 0) {
      testCases.push(testCase);
    }
  }
  
  return { signals, testCases, timeScale };
};

// Generate waveform data from parsed test bench
const generateWaveformData = (parsedTb) => {
  const { signals, testCases, timeScale } = parsedTb;
  const timeUnit = timeScale.split(' ')[1] || 'ns';
  const timeValue = parseInt(timeScale.split(' ')[0]) || 10;
  
  const waveformData = {
    timescale: { value: timeValue, unit: timeUnit },
    signals: [],
    duration: testCases.length * timeValue
  };
  
  signals.forEach(signal => {
    const signalData = {
      name: signal.name,
      type: signal.type.toLowerCase().includes('vector') ? 'bus' : 'bit',
      data: []
    };
    
    let currentValue = signal.initialValue === '1' ? 1 : 0;
    signalData.data.push({ time: 0, value: currentValue });
    
    testCases.forEach((testCase, index) => {
      if (testCase[signal.name] !== undefined) {
        currentValue = testCase[signal.name] === '1' ? 1 : 0;
      }
      signalData.data.push({
        time: (index + 1) * timeValue,
        value: currentValue
      });
    });
    
    waveformData.signals.push(signalData);
  });
  
  return waveformData;
};

const VhdlTestBenchVisualizer = () => {
  // State initialization with localStorage
  const [vhdlTbCode, setVhdlTbCode] = useState(() => {
    const saved = localStorage.getItem(TB_STORAGE_KEY);
    if (saved) {
      try {
        const { code, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < TB_EXPIRATION_TIME) {
          return code;
        }
        localStorage.removeItem(TB_STORAGE_KEY);
      } catch (e) {
        console.error("Failed to parse saved VHDL test bench code", e);
      }
    }
    return DEFAULT_TB_TEMPLATE;
  });

  const [waveformData, setWaveformData] = useState(null);
  const [error, setError] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        code: vhdlTbCode,
        timestamp: Date.now()
      };
      localStorage.setItem(TB_STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [vhdlTbCode]);

  // Simulation timer effect
  useEffect(() => {
    let interval;
    if (isPlaying && waveformData) {
      interval = setInterval(() => {
        setSimulationTime(prev => {
          const newTime = prev + waveformData.timescale.value / 10;
          if (newTime >= waveformData.duration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, waveformData]);

  const runSimulation = () => {
    setIsSimulating(true);
    setError('');
    setSimulationTime(0);
    setIsPlaying(false);
    setZoom(1);
    
    try {
      const parsedTb = parseTestBench(vhdlTbCode);
      const generatedWaveform = generateWaveformData(parsedTb);
      setWaveformData(generatedWaveform);
    } catch (err) {
      setError(`Error parsing test bench: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(TB_STORAGE_KEY);
    setLastSaved(null);
    setWaveformData(null);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimulationTime(0);
  };

  const handleTimeChange = (e) => {
    setSimulationTime(parseFloat(e.target.value));
  };

  // Prepare data for waveform viewer
  const waveformSignals = waveformData?.signals || [];

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
              <FaRegFileAlt className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                VHDL Test Bench Visualizer
              </h1>
              <p className="text-xs text-cyan-500 mt-1">
                {isSimulating ? 'Simulating...' : waveformData ? 'Ready' : 'Enter test bench code'}
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
            {waveformData && (
              <div className="hidden md:flex items-center gap-2 text-sm text-cyan-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Signals: {waveformData.signals.length}</span>
                <span>Duration: {waveformData.duration}{waveformData.timescale.unit}</span>
              </div>
            )}
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
                  <span className="text-sm text-cyan-300">Test Bench Editor</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={clearStorage}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Clear Cache
                  </button>
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Templates ▼
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={vhdlTbCode}
                  onChange={(e) => setVhdlTbCode(e.target.value)}
                  className="w-full h-96 bg-gray-950/50 p-6 font-mono text-sm text-cyan-300 focus:outline-none resize-none"
                  placeholder="-- Enter your VHDL test bench code here..."
                  style={{ lineHeight: '1.5', tabSize: 2 }}
                  spellCheck="false"
                />
                <div className="absolute bottom-4 right-4 text-xs text-cyan-500 bg-gray-900/50 px-2 py-1 rounded">
                  {vhdlTbCode.split('\n').length} lines
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
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaWaveSquare className={`transition-transform ${isSimulating ? 'animate-pulse' : ''}`} />
                  <span>{isSimulating ? 'Processing...' : 'Run Simulation'}</span>
                </button>
              </div>
            </div>
  
            {/* Waveform Visualization Panel */}
            <div className="bg-gray-900/80 border border-emerald-500/20 rounded-2xl shadow-2xl shadow-emerald-500/10 h-[600px] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between bg-gradient-to-r from-emerald-900/30 to-cyan-900/20">
                <div className="flex items-center gap-3">
                  <FaWaveSquare className="text-emerald-400" />
                  <span className="text-sm text-emerald-300">Simulation Waveform</span>
                </div>
                <div className="flex items-center gap-3">
                  {waveformData && (
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <FaRegClock />
                      <span>
                        {simulationTime.toFixed(1)}{waveformData.timescale.unit} / {waveformData.duration}{waveformData.timescale.unit}
                      </span>
                    </div>
                  )}
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                    Export PNG
                  </button>
                </div>
              </div>
              <div className="relative flex-1 flex flex-col">
                {error && (
                  <div className="absolute top-4 left-4 right-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3 z-10">
                    <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                )}
                
                {!waveformData ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <FaWaveSquare className="text-4xl mb-4 opacity-30" />
                    <p>Simulation waveform will appear here</p>
                    <p className="text-xs mt-2">Click "Run Simulation" to visualize your test bench</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto">
                      <WaveformViewer 
                        signals={waveformSignals}
                        currentTime={simulationTime}
                        duration={waveformData.duration}
                        timeUnit={waveformData.timescale.unit}
                        zoom={zoom}
                      />
                    </div>
                    <div className="p-4 border-t border-emerald-500/20 flex items-center justify-center gap-4">
                      <button
                        onClick={togglePlayback}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isPlaying ? 'bg-rose-600/90 hover:bg-rose-600' : 'bg-emerald-600/90 hover:bg-emerald-600'} transition-colors`}
                      >
                        {isPlaying ? (
                          <>
                            <FaPause />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <FaPlay />
                            <span>Play</span>
                          </>
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max={waveformData.duration}
                        value={simulationTime}
                        onChange={handleTimeChange}
                        className="flex-1 max-w-md"
                        step="0.1"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                          className="px-2 py-1 bg-emerald-900/50 hover:bg-emerald-900/70 rounded transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs text-emerald-300">Zoom: {zoom.toFixed(1)}x</span>
                        <button
                          onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                          className="px-2 py-1 bg-emerald-900/50 hover:bg-emerald-900/70 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={resetSimulation}
                        className="px-4 py-2 bg-emerald-900/50 hover:bg-emerald-900/70 rounded-lg transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </>
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
            © {new Date().getFullYear()} ArchLab - VHDL Test Bench Visualizer (v1.0)
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

export default VhdlTestBenchVisualizer;