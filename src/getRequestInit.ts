export default (): RequestInit => {
    const key = Object.keys(window.localStorage).find(key =>
        key.startsWith('CognitoIdentityServiceProvider.') &&
        key.endsWith('.idToken')) || '';

    const token = window.localStorage[key];

    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        credentials: 'include',
    };
}
