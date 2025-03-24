export const  getUUID = () => {
    return Math.random().toString(36).substr(2, 9);
};


export const parseXml = (content) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(content, "application/xml");
    const channel = xml.querySelector("channel");
    const title = channel.querySelector("title").textContent;
    const description = channel.querySelector("description").textContent;
    const items = xml.querySelectorAll("item");
    const posts = Array.from(items).map(item => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        description: item.querySelector("description")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent
    }));

    return {
        feed: {
            title,
            description,
        },
        posts,
    };
}

