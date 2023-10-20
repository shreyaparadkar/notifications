import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { Notifications, notifications as notif } from "@mantine/notifications";

import { api_url } from "@/configs";
import { NotificationDetails } from "@/types";
import Header from "./components/Header";
import NotificationsContainer from "./components/NotificationsContainer";

type Props = { children: React.ReactNode };

type NotificationDisplayDetails = NotificationDetails & {
    diplay_id?: string;
};

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [notificationsOpenStatus, { toggle: notificationsToggle, close: notificationsClose }] = useDisclosure(false);
    const [notifications, setNotifications] = useState<NotificationDisplayDetails[] | null>(null);

    const getNotifications = async () => {
        try {
            const res = await axios.get(`${api_url}notification/get-notifications`);
            if (res.data.success) {
                return res.data.data;
            } else {
                throw res.data.error;
            }
        } catch (error) {
            console.log("Error getting notifications - ", error);
            throw error;
        }
    };

    const markNotificationAsRead = async (id?: string) => {
        try {
            let ids = id;
            
            // if id is not provided, ids = all unread notifs
            if (!ids)
                ids = notifications!
                    .filter((n) => n.status === "unread")
                    .map((n) => n.id)
                    .join(",");

            const res = await axios.put(`${api_url}notification/mark-as-read?ids=${ids}`);
            if (res.data.success) {
                setNotifications(await getNotifications());
            } else {
                throw res.data.error;
            }
        } catch (error) {
            console.log("Error in markNotificationAsRead - ", error);
        }
    };

    const markNotificationAsUnread = async (id: string) => {
        try {
            const res = await axios.put(`${api_url}notification/mark-as-unread?id=${id}`);
            if (res.data.success) {
                setNotifications(await getNotifications());
            } else {
                throw res.data.error;
            }
        } catch (error) {
            console.log("Error in markNotificationAsUnread -", error);
        }
    };

    const handleNotificationClick = async (id: number, feedback_id: number) => {
        let n = data.filter((n: NotificationDisplayDetails) => n.id == id)[0].diplay_id;
        if (n) notif.hide(n);

        markNotificationAsRead(id.toString());
        router.push(`/feedback/${feedback_id}`);
    };

    const { status, data, error } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        refetchInterval: 30000,
    });

    useEffect(() => {
        if (notifications) {
            // check if notif already displayed. if not, show notification
            let ids = notifications.map((n) => n.id);
            data.forEach((n: NotificationDisplayDetails) => {
                if (!ids.includes(n.id)) {
                    let id = notif.show({
                        message: `${n.user_name} replied ${n.details}`,
                        autoClose: false,
                        onClick: () => handleNotificationClick(n.id, n.feedback_id),
                    });
                    n.diplay_id = id;
                }
            });
        }
        setNotifications(data);
    }, [data]);

    return (
        <div className="flex flex-col justify-start">
            <Header
                newNotificationStatus={
                    notifications && notifications.filter((n) => n.status === "unread").length ? true : false
                }
                notificationsOpenStatus={notificationsOpenStatus}
                notificationsToggle={notificationsToggle}
            />

            {notificationsOpenStatus && (
                <NotificationsContainer
                    notifications={notifications}
                    openStatus={notificationsOpenStatus}
                    handleClose={notificationsClose}
                    markAsRead={markNotificationAsRead}
                    markAsUnread={markNotificationAsUnread}
                />
            )}

            <div className="px-4 md:px-16 mt-28 mb-4">{children}</div>
            <Notifications position="bottom-center" className="notif" />
        </div>
    );
};

export default Layout;
