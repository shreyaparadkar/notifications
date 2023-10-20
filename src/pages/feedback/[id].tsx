import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";

import Meta from "@/components/Meta";
import { api_url } from "@/configs";
import PageNotFound from "../404";
import Feedback from "@/components/Feedback";

const FeedbackPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!data || !data.length) return <PageNotFound />;

    return (
        <>
            <Meta title="Feedback" />
            <Feedback {...data[0]} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let data = null;
    try {
        if (params) {
            let res = await axios.get(`${api_url}feedback/get-feedback/${params.id}`);
            if (res.data.success) {
                data = res.data.data;
            } else {
                throw res.data.error;
            }
        }
    } catch (err) {
        console.log("Error -", err);
    }

    return {
        props: {
            data,
        },
    };
};

export default FeedbackPage;
