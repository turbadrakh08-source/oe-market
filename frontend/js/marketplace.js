document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");

  async function loadPosts() {
    try {
      const res = await fetch(
        "https://localhost:4500/api/v1/listings/getPosts",
      );

      const posts = await res.json();

      tableBody.innerHTML = "";

      posts.forEach((post) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="p-3">
            <img src="https://localhost:4500${post.image}" class="w-20"/>
          </td>
          <td class="p-3">${post.title}</td>
          <td class="p-3">${post.size}</td>
          <td class="p-3">$${post.price}</td>
          <td class="p-3">${post.condition}</td>
          <td class="p-3">
            <button class="saveBtn text-xl" data-id="${post._id}">
              🤍
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  }

  loadPosts();

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("saveBtn")) {
      const postId = e.target.dataset.id;
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login first");
        window.location.href = "logIn.html";
        return;
      }

      try {
        const res = await fetch(
          "https://oe-market-backend.onrender.com/api/v1/saved/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId }),
          },
        );

        const data = await res.json();

        if (res.ok) {
          e.target.textContent = "❤️";
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
});
