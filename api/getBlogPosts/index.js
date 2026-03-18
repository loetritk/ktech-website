const fetch = require('node-fetch'); // ต้องการสำหรับ Node 16 ลงมา

module.exports = async function (context, req) {
    const BLOGGER_API_KEY = process.env.BLOGGER_API_KEY;
    const BLOGGER_ID      = process.env.BLOGGER_ID;

    // เช็คว่า Environment Variables ถูกตั้งค่าไว้
    if (!BLOGGER_API_KEY || !BLOGGER_ID) {
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Missing environment variables" })
        };
        return;
    }

    try {
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_ID}/posts`
                  + `?key=${BLOGGER_API_KEY}&maxResults=9`;

        const response = await fetch(url);
        const data     = await response.json();

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };
    } catch (e) {
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: e.message })
        };
    }
};
