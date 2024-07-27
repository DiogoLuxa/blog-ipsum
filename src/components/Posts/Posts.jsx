import { useState, useEffect } from 'react';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { fetchPosts, deletePost, updatePost } from '../../api/dataFetch.js';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PostDetail from '../PostDetail/';

import './Posts.css';

const maxPostPage = 10;

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

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

    const query = useQuery({
        queryKey: ['posts', currentPage],
        queryFn: () => fetchPosts(currentPage),
    });

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

    if (query.isLoading) {
        return <p>Loading...</p>;
    }

    if (query.isError) {
        return <p>Error: {query.error.message}</p>;
    }

    return (
        <>
            <div className="posts">
                {query.data.map((post) => (
                    <p
                        key={post.id}
                        className="post-title"
                        onClick={() => handlePostClick(post)}
                    >
                        {post.title}
                    </p>
                ))}
            </div>
            <div className="pagination">
                <Button
                    disabled={currentPage <= 1 ? true : false}
                    onClick={handlePreviousPage}
                >
                    Previous page
                </Button>
                <p className="pagination__paragraph">Page {currentPage}</p>
                <Button
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
}
