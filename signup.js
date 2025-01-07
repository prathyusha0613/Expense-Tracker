document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("new-username").value;
        const password = document.getElementById("new-password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(u => u.username === username);

        if (userExists) {
            alert("Username already exists!");
        } else {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Sign-up successful! Please log in.");
            window.location.href = "login.html";
        }
    });
});
