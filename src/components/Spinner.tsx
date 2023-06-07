import React from 'react';
import { RingLoader
} from 'react-spinners';

export const Spinner = () => {
    return (
        <div className="flex justify-center  items-center ">
            <RingLoader
                color="white" size={55} />
        </div>
    );
};
