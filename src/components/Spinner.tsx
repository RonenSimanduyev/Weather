import React from 'react';

export const Spinner = () => {
    return (
        <>
            <img className='w-[200px] m-auto block' src="/spinner.gif" alt='loading..' />
            <div className="text-9xl"> spinner</div>
        </>
    );
};
