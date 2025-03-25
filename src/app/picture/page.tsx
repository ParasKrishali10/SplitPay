"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Picture() {
    const router=useRouter()
    const avatars = [
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Liam",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Luis",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria"


    ];
    const session=useSession()
    const [startIndex, setStartIndex] = useState(0);
    const [userImage, setUserImage] = useState(avatars[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleRightArrowClick = () => {
        if (startIndex + 3 < avatars.length) {
            setStartIndex(prev => prev + 1);
        }
    };

    const handleLeftArrowClick = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1);
        }
    };

    const handleConfirmAvatar = async () => {
        setIsLoading(true);
        setError(null);
        const payload={
            image:userImage,
            email:session.data?.user?.email
        }
        try {
            const response = await fetch('/api/user_image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Handle successful response here
            console.log('Avatar updated successfully:');
            router.push("/dashboard")
        } catch (err) {
            // setError('Failed to update avatar. Please try again.');
            console.error('Error updating avatar:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-gray-900 p-16 rounded-lg">
                    <h1 className="text-white font-bold text-3xl text-center mb-8">
                        Choose Your Avatar
                    </h1>

                    <div className="flex justify-center mb-8">
                        <div className="border rounded-full h-36 w-36 flex justify-center items-center overflow-hidden">
                            <img src={userImage} alt="Selected avatar" className="w-full h-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={handleLeftArrowClick}
                            disabled={startIndex === 0}
                            className="w-10 h-10 flex items-center justify-center text-white disabled:opacity-50"
                        >
                            <span className="text-xl">←</span>
                        </button>

                        <div className="flex gap-4">
                            {avatars.slice(startIndex, startIndex + 3).map((avatar, index) => (
                                <button
                                    key={startIndex + index}
                                    onClick={() => setUserImage(avatar)}
                                    className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all
                                        ${userImage === avatar ? 'border-sky-600' : 'border-transparent'}
                                        hover:border-sky-700`}
                                >
                                    <img
                                        src={avatar}
                                        alt={`Avatar option ${startIndex + index + 1}`}
                                        className="w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleRightArrowClick}
                            disabled={startIndex + 3 >= avatars.length}
                            className="w-10 h-10 flex items-center justify-center text-white disabled:opacity-50"
                        >
                            <span className="text-xl">→</span>
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-center mt-4">{error}</p>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleConfirmAvatar}
                            disabled={isLoading}
                            className="text-white rounded-xl p-4 w-48 bg-purple-900
                                hover:bg-sky-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Updating...' : 'Confirm Avatar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}