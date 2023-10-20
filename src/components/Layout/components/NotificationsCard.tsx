import React from "react";
import { useRouter } from "next/router";
import { Avatar } from "@mantine/core";

import { NotificationDetails } from "@/types";
import { formatDateTimeString } from "@/utils";

type NotificationCardProps = NotificationDetails & {
    markAsRead: (id?: string) => void;
    markAsUnread: (id: string) => void;
    handleClose: () => void;
};

const NotificationCard = ({
    created_at,
    details,
    feedback_id,
    id,
    read_at,
    status,
    user_name,
    markAsRead,
    markAsUnread,
    handleClose,
}: NotificationCardProps) => {
    const router = useRouter();

    const handleContainerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleNotificationClick = (e: React.MouseEvent) => {
        if (status === "unread") markAsRead(id.toString());
        router.push(`/feedback/${feedback_id}`);
        handleClose();
    };

    const handleMarkAsUnread = (e: React.MouseEvent) => {
        handleContainerClick(e);
        markAsUnread(id.toString());
    };

    return (
        <>
            <div
                className={`flex flex-row py-4 gap-4 justify-start px-4 cursor-pointer ${
                    status === "read" ? "bg-gray-200" : "bg-white"
                } `}
                onClick={handleNotificationClick}
            >
                <Avatar color="blue" />
                <div className="w-full">
                    <p className="text-sm">
                        <strong>{user_name} replied</strong> {details.length>150? details.substring(0, 150).trimEnd()+'\u2026': details}
                    </p>
                    <div className="flex gap-3 mt-2 justify-between items-center">
                        <p className="text-xs text-gray-600">{formatDateTimeString(new Date(created_at))}</p>
                        {status === "read" ? (
                            <button
                                className="text-xs text-gray-800 bg-gray-300 border-[1px] hover:bg-gray-100 px-2 py-0.5 rounded-md"
                                onClick={handleMarkAsUnread}
                            >
                                Mark as unread
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </>
    );
};

export default NotificationCard;
