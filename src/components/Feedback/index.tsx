import React, { useState, useEffect } from "react";
import axios from "axios";
import { Textarea, Loader } from "@mantine/core";

import { api_url } from "@/configs";
import { FeedbackDetails, FeedbackReplies } from "@/types";
import { formatLongDateTimeString } from "@/utils";
import Breadcrumbs from "./components/Breadcrumbs";

const Feedback = ({ created_at, details, id, replies }: FeedbackDetails) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reply, setReply] = useState("");
    const [formatCreatedAt, setFormatCreatedAt] = useState("");
    const [formatReplies, setFormatReplies] = useState<FeedbackReplies[] | null>(null);

    const handleSubmit = async () => {
        if (!reply.trim().length) return;

        try {
            setLoading(true);
            setError("");
            const res = await axios.post(`${api_url}feedback/reply-to-feedback`, {
                userId: 1,
                feedbackId: id,
                reply,
            });

            if (res.data.success) {
                let data: FeedbackReplies = res.data.data;

                let newReplies = formatReplies;
                newReplies?.push({
                    id: data.id,
                    details: data.details,
                    created_at: formatLongDateTimeString(new Date(data.created_at.toString())),
                    user_id: data.user_id,
                    user_name: data.user_name
                });
                setFormatReplies(newReplies);
                setReply("");
            } else {
                throw res.data.error;
            }
        } catch (error) {
            console.log("Error submitting reply - ", error);
            setError("Error submitting reply!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormatCreatedAt(formatLongDateTimeString(new Date(created_at.toString())));
        if (replies) {
            let data: FeedbackReplies[] = replies.map((re) => {
                return {
                    id: re.id,
                    details: re.details,
                    created_at: formatLongDateTimeString(new Date(re.created_at.toString())),
                    user_id: re.user_id,
                    user_name: re.user_name
                };
            });
            setFormatReplies(data);
        }
    }, [created_at, replies]);

    return (
        <div className="flex flex-col mb-8">
            <Breadcrumbs id={id} />

            <div className="feedback-card">
                <p className="text-base font-bold">Feedback</p>
                <p className="text-base">{details}</p>
                <p className="text-gray-500 text-sm mb-6">Anonymous - {formatCreatedAt}</p>

                {formatReplies && formatReplies.length ? (
                    <div className="mb-4">
                        <p className="text-base font-bold">Replies</p>
                        <hr className="mb-2" />
                        {formatReplies.map((reply, inx) => {
                            return (
                                <div key={inx}>
                                    <p className="text-base">{reply.details}</p>
                                    <p className="text-gray-500 text-sm mb-4">{reply.user_name} - {reply.created_at}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader color="blue" />
                    </div>
                ) : (
                    <>
                        <Textarea
                            label="Enter reply"
                            placeholder="Enter reply"
                            size="md"
                            autosize
                            minRows={4}
                            maxRows={8}
                            onChange={(e) => setReply(e.target.value)}
                            value={reply}
                        />

                        <button className="feedback-card-btn text-sm w-fit mt-2" onClick={handleSubmit}>
                            Submit reply
                        </button>
                    </>
                )}

                {error.length ? (
                    <p className="-mt-1 text-sm text-red-500">Error submitting reply! Please try again.</p>
                ) : null}
            </div>
        </div>
    );
};

export default Feedback;
