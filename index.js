export default {
  async fetch(request) {
    const origin = request.headers.get("Origin");

    const allowed = [
      "http://mvp.us.kg",   // 允许的网站（你可以加更多）
      "https://mvp.us.kg",
    ];

    const allowOrigin = allowed.includes(origin) ? origin : "";

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";

    const cf = request.cf || {};

    return new Response(
      JSON.stringify(
        {
          ip,
          country: cf.country,
          city: cf.city,
          colo: cf.colo,
        },
        null,
        2
      ),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  },
};
