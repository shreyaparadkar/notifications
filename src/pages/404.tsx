import React from "react";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-8">
            <p className="text-xl font-bold text-gray-600">Something went wrong...</p>
            <p>Could not find the page you are looking for</p>
            <Link href="/">
                <button className="mt-4 feedback-card-btn">Go back home</button>
            </Link>
        </div>
    );
};

export default PageNotFound;
