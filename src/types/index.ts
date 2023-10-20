export type FeedbackReplies = {
    id: number;
    user_id: number;
    details: string;
    created_at: string;
    user_name: string;
};

export type FeedbackOverview = {
    id: number;
    details: string;
    created_at: string | Date;
};

export type FeedbackDetails = {
    id: number;
    details: string;
    replies: FeedbackReplies[];
    created_at: string;
};

export type NotificationDetails = {
    id: number;
    status: 'unread' | 'read';
    feedback_id:number;
    read_at: string | Date;
    created_at: string | Date;
    user_name: string;
    details: string;
}