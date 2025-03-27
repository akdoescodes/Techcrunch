document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");
    if (!eventsContainer) return; // ✅ Prevents errors if container is missing

    const storedEvents = localStorage.getItem("events");
    let events = [];

    try {
        events = storedEvents ? JSON.parse(storedEvents) : []; // ✅ Prevents JSON parsing errors
    } catch (error) {
        console.error("Error parsing events from localStorage:", error);
        events = []; // ✅ Fallback to empty array
    }

    eventsContainer.innerHTML = ""; // Clear previous events

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No events available.</p>"; // ✅ Handle empty events gracefully
        return;
    }

    // ✅ Create a wrapper for layout
    const eventGrid = document.createElement("div");
    eventGrid.classList.add("event-grid");

    const emojiMap = {
        "hackathon": "💻",
        "sports": "⚽",
        "music": "🎶",
        "dance": "💃",
        "gaming": "🎮",
        "other": "🔹"
    };

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        const category = (event.category || "other").toLowerCase(); // ✅ Ensures lowercase lookup
        const categoryEmoji = emojiMap[category] || "🔹"; // ✅ Default emoji

        eventCard.innerHTML = `
            <h3>${categoryEmoji} ${event.name}</h3>
            <p>${event.desc}</p>
            <span>📅 ${event.date}</span>
        `;

        eventGrid.appendChild(eventCard);
    });

    eventsContainer.appendChild(eventGrid); // ✅ Append grid only if events exist
});
