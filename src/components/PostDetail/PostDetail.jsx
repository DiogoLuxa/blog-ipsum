import PropTypes from 'prop-types';

import { useQuery } from '@tanstack/react-query';

import { fetchComments } from '../../api/dataFetch.js';

import { Button } from '@/components/ui/button';

import './PostDetail.css';

export function PostDetail({ post, deleteMutation, updateMutation }) {
    const query = useQuery({
        queryKey: ['comments', post.id],
        queryFn: () => fetchComments(post.id),
    });

    const handleDelete = () => {
        updateMutation.reset();
        deleteMutation.mutate(post.id);
    };

    const handleUpdate = () => {
        updateMutation.mutate(post.id);
    };
    console.log(updateMutation);

    if (query.isLoading) {
        return <p>Loading comments...</p>;
    }

    if (query.isError) {
        return <p>Error: {query.error.message}</p>;
    }

    return (
        <div className="post-detail">
            <h3 className="post-detail__title">{post.title}</h3>
            <div className="post-detail__actions">
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteMutation.isSuccess ? true : false}
                >
                    Delete
                </Button>
                <Button
                    onClick={handleUpdate}
                    disabled={deleteMutation.isSuccess ? true : false}
                >
                    Update title
                </Button>
            </div>
            {deleteMutation.isPending && (
                <p className="post-detail__pending">Deleting post...</p>
            )}
            {deleteMutation.isError && (
                <p className="post-detail__error">
                    Error deleting post: {deleteMutation.error.message}
                </p>
            )}
            {deleteMutation.isSuccess && (
                <p className="post-detail__success">Post deleted!</p>
            )}
            {updateMutation.isPending && (
                <p className="post-detail__pending">Updating post...</p>
            )}
            {updateMutation.isError && (
                <p className="post-detail__error">
                    Error updating post: {updateMutation.error.message}
                </p>
            )}
            {updateMutation.isSuccess && (
                <p className="post-detail__success">Post updated!</p>
            )}
            <p className="post-detail__body">{post.body}</p>
            <h4 className="post-detail__comments-title">Comments:</h4>
            <div className="post-detail__comments">
                {query.data.map((comment) => (
                    <p key={comment.id} className="post-detail__comment">
                        <span className="post-detail__comment-email">
                            {comment.email}
                        </span>
                        : {comment.body}
                    </p>
                ))}
            </div>
        </div>
    );
}

PostDetail.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
    deleteMutation: PropTypes.object.isRequired,
    updateMutation: PropTypes.object.isRequired,
};
