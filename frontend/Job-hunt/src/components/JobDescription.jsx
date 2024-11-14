import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../constant/index';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 px-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
                    <div className="flex items-center gap-3 mt-3">
                        <Badge className="text-bright-turquoise font-bold bg-gray-50" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-electric-lime font-bold bg-gray-50" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-bright-turquoise-200 font-bold bg-gray-50" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-3 font-medium transition-all ${
                        isApplied
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-electric-lime-400 text-white hover:bg-electric-lime-600'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h2 className="border-b-2 border-b-gray-300 text-lg font-semibold py-4">Job Description</h2>
            <div className="my-6 space-y-3">
                <p className="font-semibold text-gray-700">
                    Role: <span className="font-normal text-gray-800 pl-2">{singleJob?.title}</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Location: <span className="font-normal text-gray-800 pl-2">{singleJob?.location}</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Description: <span className="font-normal text-gray-800 pl-2">{singleJob?.description}</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Experience: <span className="font-normal text-gray-800 pl-2">{singleJob?.experience} yrs</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Salary: <span className="font-normal text-gray-800 pl-2">{singleJob?.salary} LPA</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Total Applicants: <span className="font-normal text-gray-800 pl-2">{singleJob?.applications?.length}</span>
                </p>
                <p className="font-semibold text-gray-700">
                    Posted Date: <span className="font-normal text-gray-800 pl-2">{singleJob?.createdAt?.split("T")[0]}</span>
                </p>
            </div>
        </div>
    );
};

export default JobDescription;
