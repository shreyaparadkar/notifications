import React from "react";
import Link from "next/link";

import { FeedbackOverview } from "@/types";
import { formatLongDateTimeString } from "@/utils";

const FeedbackCard = ({ created_at, details, id }: FeedbackOverview) => {
    return (
        <div className="feedback-card">
            <p className="text-base"> {details} </p>
            <p className="text-gray-500 text-sm mb-2">
                Anonymous - {formatLongDateTimeString(new Date(created_at.toString()))}
            </p>
            <Link href={`/feedback/${id}`}>
                <button className="feedback-card-btn w-fit self-end">Reply</button>
            </Link>
        </div>
    );
};

export default FeedbackCard;
