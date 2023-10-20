import React from "react";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
    notificationsToggle: () => void;
    notificationsOpenStatus: boolean;
    newNotificationStatus: boolean;
};

const Header = ({ notificationsOpenStatus, newNotificationStatus, notificationsToggle }: HeaderProps) => {
    return (
        <div className="fixed w-full px-4 md:px-16 my-4">
            <nav className="p-4 md:px-8 mb-6 md:mb-8 bg-gray-100 rounded-2xl shadow-sm flex flex-row items-center justify-between w-full">
                <Link href="/">
                    <div className="w-28 h-10 relative">
                        <Image
                            src="https://assets-global.website-files.com/62da00c367f1ce888a0c9fdd/651b255406318f3be544a14c_new_header.svg"
                            fill
                            alt="notifications"
                        />
                    </div>
                </Link>

                <div className="relative" onClick={notificationsToggle}>
                    <div className="w-5 h-5 relative">
                        {notificationsOpenStatus ? (
                            <Image src="/assets/icons/filled_bell.svg" fill alt="notifications" />
                        ) : (
                            <Image src="/assets/icons/bell.svg" fill alt="notifications" />
                        )}
                    </div>
                    {newNotificationStatus && (
                        <span className="w-3 h-3 absolute -top-1 -right-1 bg-green-500 rounded-full" />
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
