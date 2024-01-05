import React from 'react';
import Link from 'next/link';

const TestPage: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <Link href="/test/ssr">Ssr</Link>
            <Link href="/test/custom">Custom hook</Link>
        </div>
    );
};

export default TestPage;
