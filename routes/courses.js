//импорт
const { Router } = require("express");
const Course = require("../models/course");

//создаем объект
const router = Router();

//описываем роут
router.get("/", async (req, res) => {
  const courses = await Course.getAll();
  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

//экспрортируем
module.exports = router;
