//импорт
const { Router } = require("express");

//создаем объект
const router = Router();

//описываем роут
router.get("/", (req, res) => {
  res.render("courses", {
    title: "Курсы",
    isCourses: true,
  });
});

//экспрортируем
module.exports = router;

