import { Posts } from '@/components/Posts/Posts';

export const App = () => {
    return (
        <div className="p-3 max-w-7xl mx-auto">
            <h1 className="text-4xl font-semibold mb-3">Blog Ipsum</h1>
            <Posts />
        </div>
    );
};
