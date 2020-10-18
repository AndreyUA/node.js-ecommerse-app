const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();

//импортируем роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cardRoutes = require("./routes/card");

//вызов
const hbs = exphbs.create({
  //название обертки
  defaultLayout: "main",
  //сокращенное название
  extname: "hbs",
});

//объявляем (регистрируем) "движок"
//тут у нас то самое сокр. название + само его значение
app.engine("hbs", hbs.engine);
//а теперь применяем "движок"
app.set("view engine", "hbs");
//настройка шаблонов. 2 аргумент - название папки
app.set("views", "views");

//тут указываем папку для статичных файлов и скриптов
app.use(express.static(path.join(__dirname, 'public')));

//обработка POST-запроса
app.use(express.urlencoded({ extended: true }));

//регистрируем роуты
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`сервер запущен через порт номер ${PORT}`);
});
