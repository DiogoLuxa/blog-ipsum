import PropTypes from 'prop-types';

export const StatusMessage = ({ type, mutation }) => {
    const { isPending, isSuccess, isError, error } = mutation;

    if (isPending) {
        return (
            <p className="text-sm text-yellow-500 font-medium">Processing...</p>
        );
    }
    if (isSuccess) {
        return (
            <p className="text-sm text-green-500 font-medium">
                {type === 'delete'
                    ? 'Post deleted successfully'
                    : 'Post updated successfully'}
            </p>
        );
    }
    if (isError) {
        return (
            <p className="text-sm text-red-500 font-medium">
                Error: {error.message}
            </p>
        );
    }
    return null;
};

StatusMessage.propTypes = {
    type: PropTypes.string.isRequired,
    mutation: PropTypes.object.isRequired,
};
