import axios from 'axios';

export async function fetchPosts(pageNum) {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
            params: {
                _limit: 10,
                _page: pageNum,
            },
        },
    );

    return response.data;
}

export async function fetchComments(postId) {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/comments',
        {
            params: {
                postId,
            },
        },
    );

    return response.data;
}

export async function deletePost(postId) {
    const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );

    return response.data;
}

export async function updatePost(postId) {
    const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { title: 'REACT QUERY FOREVER!!!!' },
    );

    return response.data;
}
