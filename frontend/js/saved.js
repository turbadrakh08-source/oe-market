document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("savedContainer");
  const totalPriceEl = document.getElementById("totalPrice");
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login first");
    window.location.href = "logIn.html";
    return;
  }

  async function loadSaved() {
    const res = await fetch(
      "https://oe-market-backend.onrender.com/api/v1/saved/saved",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    container.innerHTML = "";
    let total = 0;

    if (data.length === 0) {
      container.innerHTML = `<p class="text-gray-500">Your bag is empty 😢</p>`;
      totalPriceEl.textContent = "$0";
      return;
    }

    data.forEach((item) => {
      const post = item.post;
      total += post.price;

      const card = document.createElement("div");

      card.className =
        "bg-white rounded-xl shadow hover:shadow-lg transition p-4";

      card.innerHTML = `
        <img src="https://oe-market-backend.onrender.com${post.image}" class="w-full h-48 object-cover rounded"/>

        <h3 class="font-bold mt-3">${post.title}</h3>
        <p class="text-gray-600">$${post.price}</p>
        <p class="text-sm text-gray-400">${post.size} • ${post.condition}</p>

        <button 
          class="removeBtn mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          data-id="${post._id}"
        >
          Remove
        </button>
      `;

      container.appendChild(card);
    });

    totalPriceEl.textContent = `$${total}`;
  }

  loadSaved();

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("removeBtn")) {
      const id = e.target.dataset.id;

      await fetch(
        `https://oe-market-backend.onrender.com/api/v1/saved/saved/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadSaved();
    }
  });
});
