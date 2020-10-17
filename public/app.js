document.querySelectorAll(".price").forEach((item) => {
  item.textContent = new Intl.NumberFormat("ru-RU", {
    currency: "uah",
    style: "currency",
  }).format(item.textContent);
});
