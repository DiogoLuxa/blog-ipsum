import PropTypes from 'prop-types';

import { useComments } from '@/api/queries.js';

import { Button } from '@/components/ui/button';
import { StatusMessage } from '@/components/StatusMessage/StatusMessage';

export const PostDetail = ({ post, deleteMutation, updateMutation }) => {
    const { data, isLoading, isError, error } = useComments(post.id);

    const handleDelete = () => {
        updateMutation.reset();
        deleteMutation.mutate(post.id);
    };

    const handleUpdate = () => {
        updateMutation.mutate(post.id);
    };

    if (isLoading) {
        return <p>Loading comments...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h3 className="text-2xl capitalize mt-3">{post.title}</h3>
            <div className="flex items-center gap-3 my-3">
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={
                        deleteMutation.isSuccess || updateMutation.isPending
                            ? true
                            : false
                    }
                >
                    Delete
                </Button>
                <Button
                    size="sm"
                    onClick={handleUpdate}
                    disabled={
                        deleteMutation.isSuccess ||
                        deleteMutation.isPending ||
                        updateMutation.isPending
                            ? true
                            : false
                    }
                >
                    Update title
                </Button>
            </div>
            <StatusMessage type={'delete'} mutation={deleteMutation} />
            <StatusMessage type={'update'} mutation={updateMutation} />
            <p className="capitalize text-lg italic my-3">{post.body}</p>
            <h4 className="text-lg font-medium mb-2">Comments:</h4>
            <div>
                {data.map((comment) => (
                    <p key={comment.id} className="mb-3 ml-4">
                        <span className="capitalize font-medium">
                            {comment.email}
                        </span>
                        : {comment.body}
                    </p>
                ))}
            </div>
        </div>
    );
};

PostDetail.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
    deleteMutation: PropTypes.object.isRequired,
    updateMutation: PropTypes.object.isRequired,
};
