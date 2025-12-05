export default {
  async fetch(request) {
    // 获取真实 IP
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";

 
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://mvp.us.kg",  
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    return new Response(JSON.stringify({ ip }), {
      status: 200,
      headers,
    });
  },
};
