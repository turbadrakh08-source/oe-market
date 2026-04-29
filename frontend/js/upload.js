document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const tableBody = document.getElementById("tableBody");

  // 🔥 LOAD POSTS
  async function loadPosts() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://oe-market-backend.onrender.com/api/v1/listings/my-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const posts = await res.json();

      // keep input row
      const inputRow = tableBody.firstElementChild;
      tableBody.innerHTML = "";
      tableBody.appendChild(inputRow);

      posts.forEach((post) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="p-3">
          <img src="https://oe-market-backend.onrender.com${post.image}" class="w-20"/>
          </td>
          <td class="p-3">${post.title}</td>
          <td class="p-3">${post.size || "-"}</td>
          <td class="p-3">$${post.price}</td>
          <td class="p-3">${post.condition}</td>
          <td class="p-3 space-x-2">
          <button class="editBtn bg-blue-500 text-white px-2 py-1 rounded" data-id="${post._id}">
          Edit
          </button>
          <button class="deleteBtn bg-red-500 text-white px-2 py-1 rounded" data-id="${post._id}">
          Delete
          </button>
          </td>
          `;

        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  }

  // 🔥 CALL ON LOAD
  loadPosts();

  if (!addBtn) return;

  // 🔥 ADD ITEM
  addBtn.addEventListener("click", async () => {
    const title = document.getElementById("titleInput").value.trim();
    const price = document.getElementById("priceInput").value.trim();
    const size = document.getElementById("sizeInput").value.trim();
    const condition = document.getElementById("conditionInput").value.trim();
    const file = document.getElementById("imageInput").files[0];

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!title || !price || !size || !condition || !file) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("size", size);
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://oe-market-backend.onrender.com/api/v1/listings/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("ERROR:", data);
        alert("Session expired. Please login again.");
        return;
      }
      if (res.ok) {
        // clear inputs
        document.getElementById("titleInput").value = "";
        document.getElementById("priceInput").value = "";
        document.getElementById("sizeInput").value = "";
        document.getElementById("conditionInput").value = "";
        document.getElementById("imageInput").value = "";

        loadPosts(); // 🔥 refresh table
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("ERROR:", err);
      alert("Server error");
    }
  });

  // 🔥 DELETE
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const id = e.target.dataset.id;
      const token = localStorage.getItem("token");

      if (!confirm("Delete this item?")) return;

      try {
        const res = await fetch(
          `https://oe-market-backend.onrender.com/api/v1/listings/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (res.ok) {
          loadPosts();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  });

  // 🔥 EDIT (simple prompt version)
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("editBtn")) {
      const id = e.target.dataset.id;
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const newTitle = prompt("New title:");
      const newPrice = prompt("New price:");
      const newSize = prompt("New size:");
      const newCondition = prompt("New condition:");

      if (!newTitle || !newPrice || !newSize || !newCondition) {
        alert("Fill all fields");
        return;
      }

      try {
        const res = await fetch(
          `https://localhost:4500/api/v1/listings/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: newTitle,
              price: Number(newPrice),
              size: newSize,
              condition: newCondition,
            }),
          },
        );

        const data = await res.json();

        if (res.ok) {
          loadPosts();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
});
