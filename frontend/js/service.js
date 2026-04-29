document.addEventListener("DOMContentLoaded", () => {
  const sellBtn = document.querySelector(".sell-btn");
  const buyBtn = document.querySelector(".buy-btn");

  sellBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      window.location.href = "logIn.html";
    } else {
      window.location.href = "upload.html";
    }
  });
  buyBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      window.location.href = "logIn.html";
    } else {
      window.location.href = "marketplace.html";
    }
  });
});
