document.addEventListener("DOMContentLoaded", async function () {
    const clipsContainer = document.getElementById("clips-container");

    const twitchUser = "YOUR_TWITCH_USERNAME";  // Replace with your Twitch username
    const clientId = "YOUR_TWITCH_CLIENT_ID";  // Get from https://dev.twitch.tv/
    const accessToken = "YOUR_TWITCH_ACCESS_TOKEN"; // Generate via Twitch API

    async function fetchClips() {
        try {
            const response = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${twitchUser}&first=5`, {
                headers: {
                    "Client-ID": clientId,
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            const data = await response.json();
            clipsContainer.innerHTML = ""; // Clear placeholder text

            data.data.forEach(clip => {
                const clipElement = document.createElement("div");
                clipElement.classList.add("clip");
                clipElement.innerHTML = `
                    <iframe src="${clip.embed_url}" allowfullscreen></iframe>
                    <p>${clip.title}</p>
                `;
                clipsContainer.appendChild(clipElement);
            });

        } catch (error) {
            clipsContainer.innerHTML = "<p>Failed to load clips. Try again later.</p>";
            console.error("Error fetching clips:", error);
        }
    }

    fetchClips();
});
