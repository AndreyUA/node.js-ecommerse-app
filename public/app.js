const toCurrency = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "uah",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((item) => {
  item.textContent = toCurrency(item.textContent);
});

const cardBlock = document.querySelector("#card");

if (cardBlock) {
  cardBlock.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            const html = card.courses
              .map((item) => {
                return `
              <tr>
                <td>${item.title}</td>
                <td>${item.count}</td>
                <td>
                  <button data-id="${item.id}" class="btn btn-small js-remove">Удалить</button>
                </td>
              </tr>
              `;
              })
              .join("");
            cardBlock.querySelector("tbody").innerHTML = html;
            cardBlock.querySelector(".price").textContent = toCurrency(
              card.price
            );
          } else {
            cardBlock.innerHTML = "<p>Корзина пуста.</p>";
          }
        });
    }
  });
}
