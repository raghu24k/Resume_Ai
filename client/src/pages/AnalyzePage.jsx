import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Loader2, Target, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AnalysisModal from '../components/AnalysisModal';
import { useNavigate } from 'react-router-dom';

const AnalyzePage = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile?.type !== 'application/pdf') {
            toast.error("Please upload a PDF file only.");
            return;
        }
        setFile(selectedFile);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleAnalyze = async () => {
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.post('/api/analysis/upload', formData, config);

            setAnalysisResult(response.data);
            setIsModalOpen(true);
            setIsLoading(false);
            toast.success("Analysis Complete!");

        } catch (error) {
            setIsLoading(false);
            const message = error.response?.data?.message || error.message || "Analysis Failed";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <AnalysisModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                analysis={analysisResult}
                isLoading={false}
            />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
                        AI Resume Analyzer
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Upload your existing PDF resume and let our advanced AI scorer check it against ATS standards.
                    </p>
                </div>

                {/* Upload Area */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActive ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                            }`}
                    >
                        <input {...getInputProps()} />

                        {file ? (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto text-red-400">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white">{file.name}</p>
                                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="text-sm text-red-400 hover:text-red-300 hover:underline"
                                >
                                    Remove File
                                </button>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto text-violet-400">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-white">
                                        {isDragActive ? "Drop your resume here..." : "Drag & drop your resume PDF"}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-6 h-6" />
                                        <span>Analyze Resume</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-white mb-2">ATS Scoring</h3>
                        <p className="text-sm text-gray-400">Get a precise score out of 100 based on modern hiring standards.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Keyword Check</h3>
                        <p className="text-sm text-gray-400">Ensure your resume contains the right keywords for your industry.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-yellow-400">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Instant Feedback</h3>
                        <p className="text-sm text-gray-400">Receive actionable suggestions to improve your resume instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyzePage;
