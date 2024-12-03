// Async function to fetch data from the API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

// Function to display users
async function displayUsers() {
    const users = await fetchData("users");
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = ""; // Clear previous content

    if (users) {
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-header">${user.name}</div>
                <div class="card-content">
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                </div>
            `;
            userContainer.appendChild(card);
        });
    } else {
        userContainer.textContent = "Failed to load users.";
    }
}

// Function to display posts
async function displayPosts() {
    const posts = await fetchData("posts");
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = ""; // Clear previous content

    if (posts) {
        posts.forEach(post => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-header">${post.title}</div>
                <div class="card-content">
                    <p>${post.body}</p>
                    <a href="https://jsonplaceholder.typicode.com/posts/${post.id}" class="read-more" target="_blank">Read More</a>
                </div>
            `;
            postContainer.appendChild(card);
        });
    } else {
        postContainer.textContent = "Failed to load posts.";
    }
}

// Attach event listeners to buttons
document.getElementById("load-users").addEventListener("click", displayUsers);
document.getElementById("load-posts").addEventListener("click", displayPosts);
