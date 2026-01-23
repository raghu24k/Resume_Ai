import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileBarChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/30 rounded-full blur-[100px] opacity-50 z-0 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[100px] opacity-30 z-0 pointer-events-none" />

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
                >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-300">AI-Powered Resume Builder</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    Build a Resume that <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
                        Defeats the ATS
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-400 max-w-2xl mb-10"
                >
                    Create professional resumes in minutes with our drag-and-drop builder.
                    Use AI to analyze and optimize your resume for maximum impact.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                    <Link
                        to="/register"
                        className="group flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                        <span>Build My Resume</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/login"
                        className="text-gray-300 hover:text-white font-medium px-8 py-4"
                    >
                        I already have an account
                    </Link>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 bg-black/50 border-t border-white/5 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 text-violet-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                            <p className="text-gray-400">
                                Get instant feedback on your resume. Our AI scores your content against industry standards.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FileBarChart className="w-6 h-6 text-fuchsia-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">ATS Friendly</h3>
                            <p className="text-gray-400">
                                Ensure your resume passes the bots. We use ATS-optimized templates and formatting.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Real-time Builder</h3>
                            <p className="text-gray-400">
                                See changes instantly. Split screen view allows you to edit and preview simultaneously.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;