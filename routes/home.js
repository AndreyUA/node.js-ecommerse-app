//импорт
const { Router } = require("express");

//создаем объект
const router = Router();

//описываем роут
router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная страница",
    isHome: true,
  });
});

//экспрортируем
module.exports = router;

