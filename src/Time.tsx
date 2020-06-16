import React, { useState } from 'react';

export default (props: any) => {

    const [time, setTime] = useState('');

    const getTime = async () => {
        const options = getOptions();

        const response = await fetch('/pytrack-stage/api/time', options);

        const data = await response.json();

        setTime(JSON.stringify(data));
    }

    const getOptions = (): RequestInit => {
        const key = Object.keys(window.localStorage).find(key => key.startsWith('CognitoIdentityServiceProvider.') && key.endsWith('.idToken')) || '';

        const token = window.localStorage[key];

        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            credentials: 'include',
        }
    }

    return <div>
        <div>
            <button onClick={getTime}>Get server time</button>
        </div>
        <div>
            <pre>
                {time}
            </pre>
        </div>
    </div>
}