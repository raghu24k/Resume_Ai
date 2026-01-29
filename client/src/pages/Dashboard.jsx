import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Loader2, FileText, Trash2, Edit } from 'lucide-react';
import { createResume, getResumes, resetStatus } from '../features/resumes/resumeSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { resumes, isLoading, isError, message } = useSelector(
        (state) => state.resumes
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getResumes());

        return () => {
            dispatch(resetStatus());
        };
    }, [user, navigate, isError, message, dispatch]);

    const handleCreateNew = async () => {
        await dispatch(createResume({ title: 'New Resume' }));
        // Refetch to get the latest list (or we can rely on state update)
        // Ideally, createResume returns the new resume, and we push to state.
        // If we want to redirect to builder immediately:
        // navigate(/builder/${newResumeId}) - need to handle this via state or Promise
    };

    // Helper to handle create and redirect
    // For now, simpler flow: user sees "New Resume" in list and clicks Edit

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
                    <p className="text-gray-400">Manage and edit your resumes</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.length > 0 ? (
                    resumes.map((resume) => (
                        <div key={resume._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Add Delete/Edit Quick Actions here if needed */}
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-violet-500/20 rounded-xl">
                                    <FileText className="w-6 h-6 text-violet-400" />
                                </div>
                                <span className="text-xs font-medium text-gray-500 bg-black/20 px-2 py-1 rounded-md">
                                    {new Date(resume.updatedAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 truncate">{resume.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                {resume.personalInfo?.summary || "No summary added yet."}
                            </p>

                            <div className="flex items-center space-x-3">
                                <Link
                                    to={`/builder/${resume._id}`}
                                    className="flex-1 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </Link>
                                {/* Placeholder for Delete */}
                                <button className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-white/10 border-dashed">
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No resumes found</h3>
                        <p className="text-gray-500 mb-6">Create your first resume to get started</p>
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center space-x-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create New Resume</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
