import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';
const Loading = () => {
    return (
        <div>
            <Placeholder xs={6} />
            <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
        </div>
    )
}

export default Loading