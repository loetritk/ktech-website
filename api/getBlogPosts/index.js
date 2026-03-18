const BLOGGER_API_KEY = process.env.BLOGGER_API_KEY; // เก็บใน App Settings
const BLOGGER_ID      = process.env.BLOGGER_ID;

module.exports = async function (context, req) {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_ID}/posts`
              + `?key=${BLOGGER_API_KEY}&maxResults=9`;
    
    try {
        const res  = await fetch(url);
        const data = await res.json();
        
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: data
        };
    } catch (e) {
        context.res = { status: 500, body: { error: "Fetch failed" } };
    }
};
