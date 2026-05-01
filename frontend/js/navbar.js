document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const authSection = document.getElementById("authSection");
  const userSection = document.getElementById("userSection");
  const welcomeText = document.getElementById("welcomeText");
  const avatar = document.getElementById("userAvatar");
  const dropdown = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    authSection.style.display = "none";
    userSection.classList.remove("hidden");

    welcomeText.textContent = `Hi, ${user.username}`;

    avatar.src = user.image
      ? `http://localhost:4500${user.image}`
      : "./image/profile.jpg";
  }

  avatar.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();

    alert("Logged out");

    window.location.href = "index.html";
  });

  document.addEventListener("click", (e) => {
    if (!userSection.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
