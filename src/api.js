export function fetchRSS(url) {
    return fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(getError(TYPES.responceError));
            }
            return response.text();
        })
}