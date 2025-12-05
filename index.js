export default {
  async fetch(request) {
    const origin = request.headers.get("Origin");

    // 允许跨域访问的站点
    const allowed = [
      "http://mvp.us.kg",
      "https://mvp.us.kg",
    ];

    const allowOrigin = allowed.includes(origin) ? origin : "";

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 处理 OPTIONS 预检
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 获取 IP
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";

    return new Response(
      JSON.stringify({ ip: ip }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  },
};
