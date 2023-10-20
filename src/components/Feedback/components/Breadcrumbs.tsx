import Link from "next/link";
import React from "react";

type BreadcrumbProps = {
    id: number;
};

const Breadcrumbs = ({ id }: BreadcrumbProps) => {
    return (
        <div className="flex gap-2 mb-4">
            <p className="text-sky-500">
                <Link href="/">Feedback</Link>
            </p>
            <p>/</p>
            <p className="text-sky-500">
                <Link href={`/feedback/${id}`}>{id}</Link>
            </p>
        </div>
    );
};

export default Breadcrumbs;
