export default {
  async fetch(request) {
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";

    // Cloudflare 提供的访客信息
    const cf = request.cf || {};

    const data = {
      ip,
      country: cf.country || null,        // 国家
      region: cf.region || null,          // 省 / 州
      city: cf.city || null,              // 城市
      latitude: cf.latitude || null,      // 纬度
      longitude: cf.longitude || null,    // 经度
      postalCode: cf.postalCode || null,  // 邮政编码
      timezone: cf.timezone || null,      // 时区
      asn: cf.asn || null,                // 自治系统编号
      isp: cf.asOrganization || null,     // ISP / 运营商名称
      continent: cf.continent || null,    // 洲
      colo: cf.colo || null,              // Cloudflare 入口点机房
    };

   
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://mvp.us.kg",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 预检
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers,
    });
  },
};
