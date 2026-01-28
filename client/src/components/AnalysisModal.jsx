import { X, CheckCircle, AlertTriangle, Lightbulb, XCircle, Loader2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

const AnalysisModal = ({ isOpen, onClose, analysis, isLoading }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/20">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold">Resume Analysis</h2>
                            {analysis?.score && (
                                <div className={`px-4 py-1 rounded-full text-sm font-bold ${analysis.score >= 80 ? 'bg-green-500/20 text-green-400' :
                                        analysis.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    ATS Score: {analysis.score}/100
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
                                <p className="text-gray-400 text-lg animate-pulse">Analyzing your resume against ATS standards...</p>
                            </div>
                        ) : analysis ? (
                            <div className="space-y-8">
                                {/* Summary */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                                        <span>Overall Summary</span>
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Strengths */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-400">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Strengths</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {analysis.strengths?.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 bg-green-500/5 p-3 rounded-xl border border-green-500/10">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                                    <span className="text-sm text-gray-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Weaknesses */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
                                            <XCircle className="w-5 h-5" />
                                            <span>Areas for Improvement</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {analysis.weaknesses?.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                                                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                                                    <span className="text-sm text-gray-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Suggestions */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span>Actionable Suggestions</span>
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {analysis.suggestions?.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                                                <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                                                    <Lightbulb className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <span className="text-gray-300 pt-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                No analysis available.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AnalysisModal;