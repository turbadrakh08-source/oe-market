document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("learnMoreBtn");
  const image = document.getElementById("heroImage");
  const info = document.getElementById("infoPanel");

  let toggled = false;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!toggled) {
      // hide image
      image.classList.add("opacity-0", "scale-90");

      // show info
      info.classList.remove("opacity-0", "scale-90");
      info.classList.add("opacity-100", "scale-100");

      btn.textContent = "Show Image";
    } else {
      // show image
      image.classList.remove("opacity-0", "scale-90");

      // hide info
      info.classList.add("opacity-0", "scale-90");

      btn.textContent = "Learn More";
    }

    toggled = !toggled;
  });
});
