document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", async () => {
    const title = document.getElementById("titleInput").value;
    const price = document.getElementById("priceInput").value;
    const size = document.getElementById("sizeInput").value;
    const file = document.getElementById("imageInput").files[0];

    const token = localStorage.getItem("token");

    if (!title || !price || !size || !file) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", "clothes");
    formData.append("condition", "used");
    formData.append("description", "");
    formData.append("image", file);

    try {
      const res = await fetch(
        "http://oe-market-backend.onrender.com/api/v1/listings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok) {
        // adding new row for tables
        const newRow = document.createElement("tr");

        newRow.className = "border-t";

        newRow.innerHTML = `
          <td class="p-3">
            <img src="http://oe-market-backend.onrender.com${data.post.image}" class="w-20 rounded-lg"/>
          </td>
          <td class="p-3">${data.post.title}</td>
          <td class="p-3">${size}</td>
          <td class="p-3 text-[#9c9384] font-bold">$${data.post.price}</td>
          <td class="p-3">✔</td>
        `;

        // insert below input row
        tableBody.appendChild(newRow);

        // clear inputs
        document.getElementById("titleInput").value = "";
        document.getElementById("priceInput").value = "";
        document.getElementById("sizeInput").value = "";
        document.getElementById("imageInput").value = "";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading");
    }
  });
});
