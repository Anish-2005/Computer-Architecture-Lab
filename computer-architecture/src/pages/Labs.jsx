import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMicrochip, FaWaveSquare, FaProjectDiagram, FaCode, 
  FaRegClock, FaFlask, FaHome, FaTrash,
  FaPlus, FaLock, FaTimes, FaClipboard
} from 'react-icons/fa';

const VhdlLabsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const HARDCODED_PIN = '1234';

  // Form state for new assignments
  const [formData, setFormData] = useState({
    title: '',
    icon: 'FaMicrochip',
    programs: [{
      question: '',
      moduleCode: '',
      testBenchCode: ''
    }]
  });

  // Icon components mapping
  const iconComponents = {
    FaMicrochip,
    FaWaveSquare,
    FaProjectDiagram,
    FaCode,
    FaRegClock,
    FaFlask
  };

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/architecture-assignments');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch assignments');
        }
        
        setAssignments(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignments();
  }, []);

  // Handle PIN verification
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === HARDCODED_PIN) {
      setPinVerified(true);
      setPin('');
    } else {
      setError('Invalid PIN');
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
    setPinVerified(false);
    setPin('');
    setError(null);
  };

  // Add new program field
  const addProgramField = () => {
    setFormData(prev => ({
      ...prev,
      programs: [...prev.programs, { 
        question: '', 
        moduleCode: '', 
        testBenchCode: ''
      }]
    }));
  };

  // Handle program field changes
  const handleProgramChange = (index, field, value) => {
    const newPrograms = formData.programs.map((p, i) => 
      i === index ? { ...p, [field]: value } : p
    );
    setFormData(prev => ({ ...prev, programs: newPrograms }));
  };

  // Submit new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!formData.title.trim() || 
          !formData.programs?.length || 
          formData.programs.some(p => !p.question.trim() || !p.moduleCode.trim() || !p.testBenchCode.trim())) {
        navigate('/vhdl-labs');
        window.location.reload();
        return;
      }
  
      const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/architecture-assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Always navigate and refresh regardless of response
      navigate('/vhdl-labs');
      window.location.reload();
      
    } catch (err) {
      console.error(err);
      navigate('/vhdl-labs');
      window.location.reload();
    }
  };
  // Delete assignment
  const handleDelete = async (id) => {
    try {
      // Optimistically remove the assignment from UI
      setAssignments(prev => prev.filter(a => a._id !== id));
      
      // Attempt deletion
      await fetch(`https://object-oriented-programming-cpp-lab.onrender.com/api/architecture-assignments/${id}`, {
        method: 'DELETE'
      });
  
    } catch (err) {
      console.error('Deletion error:', err); // Silent error logging
    } finally {
      navigate('/vhdl-labs'); // Always redirect
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl text-cyan-400"
        >
          <FaMicrochip />
        </motion.div>
      </div>
    );
  }

  if (error && !showAdminPanel) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 animate-grid-pulse bg-[length:40px_40px] bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]" />
      </div>

      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed w-full top-4 px-6 z-50"
      >
        <div className="backdrop-blur-xl bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 flex justify-between items-center shadow-2xl shadow-cyan-500/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-lg transform group-hover:rotate-12 transition-all">
              <FaMicrochip className="text-xl" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              ARCHLAB
            </h1>
          </Link>
          <div className="flex gap-4">
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

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              <FaCode className="inline-block mr-4" />
              VHDL Lab Assignments
            </h1>
            <p className="text-cyan-200 text-lg">Click on any lab to view module designs and test benches</p>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => {
              const IconComponent = iconComponents[assignment.icon] || FaMicrochip;
              return (
                <motion.div
                  key={assignment._id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setIsPopupOpen(true);
                  }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20 h-full">
                    <div className="text-4xl mb-4 text-cyan-400">
                      <IconComponent />
                    </div>
                    <h3 className="text-2xl font-semibold text-cyan-100">
                      {assignment.title}
                    </h3>
                    <div className="mt-4">
                      <span className="text-cyan-300 text-sm">
                        {assignment.programs.length} {assignment.programs.length > 1 ? 'Programs' : 'Program'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Admin Panel Button */}
          <motion.button
            onClick={() => setShowAdminPanel(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 p-4 bg-cyan-600 hover:bg-cyan-700 rounded-full shadow-xl z-[1000]"
          >
            <FaLock className="text-2xl text-white" />
          </motion.button>

          {/* Assignment Details Modal */}
          <AnimatePresence>
            {isPopupOpen && selectedAssignment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center p-4"
                onClick={() => setIsPopupOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-gray-900/90 backdrop-blur-xl rounded-xl border border-cyan-500/30 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-8 relative">
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                    >
                      <FaTimes className="text-xl text-cyan-400" />
                    </button>

                    <div className="flex items-center mb-8">
                      <div className="text-4xl text-cyan-400 mr-4">
                        {iconComponents[selectedAssignment.icon] ? 
                          React.createElement(iconComponents[selectedAssignment.icon]) : 
                          <FaMicrochip />
                        }
                      </div>
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-emerald-200">
                        {selectedAssignment.title}
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {selectedAssignment.programs.map((program, pIndex) => (
                        <div key={pIndex} className="bg-gray-800/30 p-6 rounded-xl border border-cyan-500/20">
                          <h4 className="text-xl font-medium text-cyan-200 mb-6">
                            {program.question}
                          </h4>

                          {/* Module Code */}
                          <div className="mb-6">
                            <div className="flex items-center bg-gray-900 px-4 py-3 border-b border-cyan-500/20">
                              <div className="flex space-x-2 mr-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              </div>
                              <div className="text-sm text-cyan-400">module.vhd</div>
                              <button
                                onClick={() => navigator.clipboard.writeText(program.moduleCode)}
                                className="ml-auto p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-cyan-300 text-lg"
                                title="Copy to clipboard"
                              >
                                <FaClipboard />
                              </button>
                            </div>
                            <pre className="p-6 text-sm text-cyan-300 font-mono overflow-x-auto bg-gray-950">
                              {program.moduleCode}
                            </pre>
                          </div>

                          {/* Test Bench Code */}
                          <div className="mb-6">
                            <div className="flex items-center bg-gray-900 px-4 py-3 border-b border-purple-500/20">
                              <div className="flex space-x-2 mr-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              </div>
                              <div className="text-sm text-purple-400">testbench.vhd</div>
                              <button
                                onClick={() => navigator.clipboard.writeText(program.testBenchCode)}
                                className="ml-auto p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-purple-300 text-lg"
                                title="Copy to clipboard"
                              >
                                <FaClipboard />
                              </button>
                            </div>
                            <pre className="p-6 text-sm text-purple-300 font-mono overflow-x-auto bg-gray-950">
                              {program.testBenchCode}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin Panel Modal */}
          <AnimatePresence>
  {showAdminPanel && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto border border-cyan-500/30"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-300">
            <FaLock /> Admin Panel
          </h2>
          <button
            onClick={handleCloseAdminPanel}
            className="p-2 hover:bg-gray-800 rounded-full text-cyan-400"
          >
            <FaTimes />
          </button>
        </div>

        {!pinVerified ? (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-300">
                Enter 4-digit Admin PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  const filteredValue = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 4);
                  setPin(filteredValue);
                }}
                className="w-full p-2 bg-gray-800 rounded text-center text-2xl font-mono tracking-[0.5em]"
                placeholder="••••"
                inputMode="numeric"
                pattern="\d{4}"
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium"
            >
              Verify PIN
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-300">Title</label>
                <input
                  placeholder="Assignment Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded border border-cyan-500/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-300">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded border border-cyan-500/30"
                  required
                >
                  {Object.keys(iconComponents).map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              {/* Programs section */}
              <div className="space-y-4">
  {formData.programs.map((program, index) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-800/30 p-4 rounded-lg border border-cyan-500/20"
    >
      <div className="flex justify-between mb-2">
        <span className="text-cyan-300">Program {index + 1}</span>
        {index > 0 && (
          <button
            type="button"
            onClick={() => setFormData(prev => ({
              ...prev,
              programs: prev.programs.filter((_, i) => i !== index)
            }))}
            className="text-red-400 hover:text-red-300"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Question Textarea */}
        <textarea
          placeholder="Question"
          value={program.question}
          onChange={(e) => handleProgramChange(index, 'question', e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-cyan-500/30"
          rows="2"
          required
        />

        {/* Module Code Textarea */}
        <textarea
          placeholder="Module Code"
          value={program.moduleCode}
          onChange={(e) => handleProgramChange(index, 'moduleCode', e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-cyan-500/30 font-mono"
          rows="4"
          required
        />

        {/* Test Bench Textarea */}
        <textarea
          placeholder="Test Bench Code"
          value={program.testBenchCode}
          onChange={(e) => handleProgramChange(index, 'testBenchCode', e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-purple-500/30 font-mono"
          rows="4"
          required
        />
      </div>
    </motion.div>
  ))}
  
  <motion.button
    type="button"
    onClick={addProgramField}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded text-cyan-300 border border-cyan-500/30"
  >
    <FaPlus className="inline mr-2" />
    Add Program
  </motion.button>
</div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
                >
                  Create Assignment
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCloseAdminPanel}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Close Panel
                </motion.button>
              </div>
            </form>

            {/* Existing assignments section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-cyan-300 mb-4">
                Manage Existing Assignments
              </h3>
              <div className="space-y-2">
                {assignments.map(assignment => (
                  <motion.div 
                    key={assignment._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center bg-gray-800/30 p-3 rounded-lg border border-cyan-500/20"
                  >
                    <span className="text-cyan-200">{assignment.title}</span>
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-0 border-t border-cyan-500/20 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            © {new Date().getFullYear()} ArchLab - VHDL Labs - MIT License
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/vhdl-rtl" className="hover:text-cyan-300 transition-colors">
              RTL Generator
            </Link>
            <Link to="/vhdl-test" className="hover:text-cyan-300 transition-colors">
              Test Bench
            </Link>
            <Link to="/" className="hover:text-cyan-300 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VhdlLabsPage;