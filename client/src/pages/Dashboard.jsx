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



export default Dashboard;
