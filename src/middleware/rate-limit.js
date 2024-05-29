const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // เวลา 15 นาที
  limit: 150, // ภายใน 15 นาที สามารถส่ง request ได้ 100 ครั้ง
  message: { message: "Too many request in a given period" },
});

module.exports = limiter;
