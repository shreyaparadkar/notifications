import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "@mantine/core";

import { api_url } from "@/configs";
import { FeedbackOverview } from "@/types";
import useWindowWidth from "@/hooks/useWindowWidth";
import FeedbackCard from "./components/FeedbackCard";

type columnDetails = {
    height: number;
    cards: FeedbackOverview[];
};

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [feedbacks, setFeedbacks] = useState<FeedbackOverview[] | null>(null);

    const [columns, setColumns] = useState<columnDetails[]>([]);
    const gridRef = useRef(null);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        getFeedbacks();
    }, []);

    useEffect(() => {
        if (feedbacks) groupFeedbacksToColumns(feedbacks, getColumnNo());
    }, [windowWidth]);

    const getFeedbacks = async () => {
        try {
            const res = await axios.get(`${api_url}feedback/get-all-feedbacks`);
            if (res.data.success) {
                setFeedbacks(res.data.data);
                groupFeedbacksToColumns(res.data.data, getColumnNo());
            } else {
                throw res.data.error;
            }
        } catch (error) {
            console.log("Error in getFeedbacks - ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getColumnNo = () => {
        if (windowWidth < 720) return 1;
        if (windowWidth < 900) return 2;
        return 3;
    };

    const groupFeedbacksToColumns = (feedbacks: FeedbackOverview[], columnNo = 1) => {
        let cols: columnDetails[] = Array.from({ length: columnNo }, () => ({ height: 0, cards: [] }));

        feedbacks.forEach((feedback) => {
            let shortestColInx = 0;
            for (let index = 0; index < columnNo; index++) {
                if (cols[index].height < cols[shortestColInx].height) {
                    shortestColInx = index;
                }
            }

            cols[shortestColInx].cards.push(feedback);

            const cardHeight = feedback.details.length / 1000;
            cols[shortestColInx].height += cardHeight;

            setColumns(cols);
        });
    };

    if (loading)
        return (
            <div className="flex justify-center items-center">
                <Loader color="blue" />
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">Oops, something went wrong!</p>
            </div>
        );

    return (
        <div ref={gridRef} className="flex gap-5 items-start mb-6">
            {columns.map((column, index) => {
                return (
                    <div key={index} className="flex flex-col w-full md:w-1/2 xl:w-1/3 gap-5">
                        {column.cards.map((card, i) => (
                            <FeedbackCard key={i} {...card} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
