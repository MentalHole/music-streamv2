"use client";

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, supabase, ViewType } from "@supabase/auth-ui-shared";
import {
    useSessionContext,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
    const { session } = useSessionContext();
    const router = useRouter();
    const { onClose, isOpen } = useAuthModal();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const views: { id: ViewType; title: string }[] = [
        { id: "sign_in", title: "Sign In" },
        { id: "sign_up", title: "Sign Up" },
        { id: "magic_link", title: "Magic Link" },
        { id: "forgotten_password", title: "Forgotten Password" },
        { id: "update_password", title: "Update Password" },
        { id: "verify_otp", title: "Verify Otp" },
    ];
    const [view, setView] = useState(views[0])
    return (
        <Modal
            title="Welcome back"
            description="Login to your account."
            isOpen={isOpen}
            onChange={onChange}
        >
            <div className="flex flex-col gap-6">
                <div className="text-scale-1200 text-base">Component View</div>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="relative inline-flex self-center">
                            <select
                                defaultValue={view.id}
                                onChange={(e) => {
                                    const vw =
                                        views
                                            .filter(
                                                (v) => v.id === e.target.value
                                            )
                                            .pop() ?? view;
                                    setView(vw);
                                }}
                                className="text-lg rounded border-2 border-blue-700 text-gray-600 pl-5 pr-10 h-12 bg-white hover:border-gray-400 appearance-none"
                            >
                                {views.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Auth
                supabaseClient={supabaseClient}
                providers={["github", "spotify"]}
                magicLink={true}
                queryParams={{
                    access_type: "code",
                }}
                redirectTo="http://localhost:3000"
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            },
                        },
                    },
                }}
                theme="dark"
            />
        </Modal>
    );
};

export default AuthModal;
