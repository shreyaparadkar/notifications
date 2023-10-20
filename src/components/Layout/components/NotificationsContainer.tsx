import React, { useEffect, useState } from "react";
import { Dialog } from "@mantine/core";

import useWindowWidth from "@/hooks/useWindowWidth";
import { NotificationDetails } from "@/types";
import NotificationCard from "./NotificationsCard";

type NotificationsProps = {
    openStatus: boolean;
    notifications: NotificationDetails[] | null;
    handleClose: () => void;
    markAsRead: (id?: string) => void;
    markAsUnread: (id: string) => void;
};

type PositionProps = {
    right: number;
    top: number;
};

const NotificationsContainer = ({
    openStatus,
    notifications,
    handleClose,
    markAsRead,
    markAsUnread,
}: NotificationsProps) => {
    const [pos, setPos] = useState<PositionProps>({ right: 60, top: 95 });
    const windowWidth = useWindowWidth();

    const unreadCount = notifications ? notifications.filter((n) => n.status === "unread").length : 0;

    useEffect(() => {
        if (windowWidth < 760) setPos({ right: 20, top: 95 });
        else setPos({ right: 60, top: 95 });
    }, [windowWidth]);

    return (
        <Dialog opened={openStatus} size="lg" radius="md" shadow="xl" withBorder position={pos}>
            <div className="flex flex-col">
                <div className="flex justify-between items-end mb-4">
                    <p className="text-lg font-bold">Notifications</p>
                    {unreadCount > 0 ? (
                        <span className="text-xs bg-green-50 text-green-500 font-bold py-1 px-3 rounded-full">
                            {unreadCount} Unread
                        </span>
                    ) : null}
                </div>
                {notifications ? (
                    <>
                        <div className="min-h-fit max-h-60 overflow-auto hide-scrollbar -mx-4 shadow-inner notif-container">
                            <hr />
                            {notifications.map((notif, inx) => (
                                <NotificationCard
                                    key={inx}
                                    {...notif}
                                    markAsRead={markAsRead}
                                    markAsUnread={markAsUnread}
                                    handleClose={handleClose}
                                />
                            ))}
                        </div>
                        <hr className="mb-2" />
                        <button
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
                            onClick={() => markAsRead()}
                        >
                            Mark all as Read
                        </button>
                    </>
                ) : (
                    <p className="text-gray-600 text-center pt-4">No notifications found!</p>
                )}
            </div>
        </Dialog>
    );
};

export default NotificationsContainer;
