"use client";

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
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
    const { onClose, isOpen, newUser } = useAuthModal();
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

    return (
        <Modal
            title={newUser ? "Sign up" : "Sign in"}
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                view={newUser ? "sign_up" : "sign_in"}
                providers={["github", "spotify"]}
                magicLink={false}
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
