import { Posts } from '@/components/Posts/Posts';

export const App = () => {
    return (
        <div className="p-3">
            <h1 className="text-4xl font-semibold mb-3">Blog Ipsum</h1>
            <Posts />
        </div>
    );
};
