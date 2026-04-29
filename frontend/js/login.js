document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  console.log("Form:", form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://oe-market-backend.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful");

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        window.location.href = "index.html";
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  });
});
