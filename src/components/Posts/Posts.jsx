import { useState, useEffect } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetchPosts, deletePost, updatePost } from '@/api/dataFetch.js';

import { usePosts } from '@/api/queries.js';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PostDetail } from '@/components/PostDetail/PostDetail';

const maxPostPage = 10;

export const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    const { data, isLoading, isError, error } = usePosts(currentPage);

    const queryClient = useQueryClient();

    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nexPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ['posts', nexPage],
                queryFn: () => fetchPosts(nexPage),
            });
        }
    }, [currentPage, queryClient]);

    const updateMutation = useMutation({
        mutationFn: (postId) => updatePost(postId),
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId),
    });

    const handlePostClick = (post) => {
        deleteMutation.reset();
        updateMutation.reset();
        setSelectedPost(post);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < maxPostPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <div className="flex flex-col gap-y-3">
                {data.map((post) => (
                    <p
                        key={post.id}
                        className="capitalize cursor-pointer text-lg hover:text-slate-500"
                        onClick={() => handlePostClick(post)}
                    >
                        {post.title}
                    </p>
                ))}
            </div>
            <div className="flex justify-between items-center my-3">
                <Button
                    size="sm"
                    disabled={currentPage <= 1 ? true : false}
                    onClick={handlePreviousPage}
                >
                    Previous page
                </Button>
                <p className="text-sm">Page {currentPage}</p>
                <Button
                    size="sm"
                    disabled={currentPage >= maxPostPage ? true : false}
                    onClick={handleNextPage}
                >
                    Next page
                </Button>
            </div>
            <Separator />
            {selectedPost && (
                <PostDetail
                    post={selectedPost}
                    deleteMutation={deleteMutation}
                    updateMutation={updateMutation}
                />
            )}
        </>
    );
};
