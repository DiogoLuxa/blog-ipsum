import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchPosts, fetchComments, updatePost } from '@/api/dataFetch';

export const usePosts = (currentPage) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', currentPage],
        queryFn: () => fetchPosts(currentPage),
    });

    return { data, isLoading, isError, error };
};

export const useComments = (postId) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    return { data, isLoading, isError, error };
};

export const useUpdatePost = () => {
    const updateMutation = useMutation({
        mutationFn: (postId) => updatePost(postId),
    });

    return updateMutation;
};
