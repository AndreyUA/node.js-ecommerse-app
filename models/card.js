const fs = require("fs");
const path = require("path");

/*
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);
*/

class Card {
  static async add(course) {
    const card = await Card.fetch();

    const index = card.courses.findIndex((c) => c.id === course.id);
    const candidate = card.courses[index];

    //проверяем, есть ли уже в корзине курс
    if (candidate) {
      candidate.count++;
      card.courses[index] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const index = card.courses.findIndex((c) => c.id === id);
    const course = card.courses[index];

    if (course.count === 1) {
      //удаляем курс
      card.courses = card.courses.filter((c) => c.id !== id);
    } else {
      //уменьшаем количество
      card.courses[index].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(card);
          }
        }
      );
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "card.json"),
        "utf-8",
        (error, content) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Card;
