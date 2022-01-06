import {useState} from 'react';

const Error = (errorMsg) => {
    const [showMsg, setShowMsg] = useState(false);

    const closeMsg = () => {
        setShowMsg(false);
    }

    return (
        <>
            {showMsg &&
                <div className="error">
                    <p onClick={closeMsg}>❌</p>
                    <p>{errorMsg}</p>
                </div>
            }
        </>
    )
}

export default Error
