//импорт
const { Router } = require("express");

//создаем объект
const router = Router();

//описываем роут
router.get("/", (req, res) => {
  res.render("add", {
    title: "Добавить курс",
    isAdd: true,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);

  res.redirect("/courses");
});

//экспрортируем
module.exports = router;
