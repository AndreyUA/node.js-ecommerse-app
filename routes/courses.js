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

//динамический роутер
router.get("/:id", async (req, res) => {
  const course = await Course.getById(req.params.id);
  res.render("course", {
    title: `Курс ${course.title}`,
    layout: "empty",
    course,
  });
});

//редактирвоание курса
router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const course = await Course.getById(req.params.id);

  res.render("course-edit", {
    title: `Редактировать ${course.title}`,
    course,
  });

  router.post("/edit", async (req, res) => {
    await Course.update(req.body);
    res.redirect("/courses");
  });
});

//экспрортируем
module.exports = router;
