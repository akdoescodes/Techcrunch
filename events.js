document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalContent = document.getElementById("modal-content");
    const eventsContainer = document.getElementById("events-container") || document.getElementById("eventsList");

    if (!eventsContainer || !modal || !modalContent) return;

    // ✅ Fetch events from JSON file
    fetch("events.json")
        .then(response => response.json())
        .then(events => {
            if (events.length === 0) {
                eventsContainer.innerHTML = "<p>No events available.</p>";
                return;
            }

            eventsContainer.innerHTML = "";

            events.forEach((event, index) => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");
                eventCard.setAttribute("data-index", index); // ✅ Store index for event reference

                eventCard.innerHTML = `
                    <div class="event-details">
                        <span class="event-emoji">${getCategoryEmoji(event.category)}</span>
                        <h3>${event.name}</h3>
                        <p>📅 ${event.date}</p>
                        <p>${event.type === "Team" ? `👥 Team Event (${event.teamSize})` : "👤 Solo Event"}</p>
                    </div>
                    <div class="read-more-circle">
                        <span class="arrow-symbol">&rarr;</span> 
                    </div>
                `;

                eventsContainer.appendChild(eventCard);
            });

            // ✅ Use event delegation for dynamically added elements
            eventsContainer.addEventListener("click", function (e) {
                const eventCard = e.target.closest(".event-card");
                if (eventCard) {
                    const index = eventCard.getAttribute("data-index");
                    openModal(events[index]);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            eventsContainer.innerHTML = "<p>Failed to load events.</p>";
        });

    // ✅ Open Modal Function
    function openModal(event) {
        if (!event) {
            console.error("No event data found!");
            return;
        }

        modalContent.innerHTML = `
            <button id="close-modal">×</button>
            <h2>${event.name}</h2>
            <p><strong>📅 Date:</strong> ${event.date}</p>
            <p><strong>📍 Location:</strong> ${event.location}</p>
            <p><strong>📝 Description:</strong> ${event.desc || "No description available."}</p>
            <a id="register-button" class="register-btn" href="${event.link ? event.link : "#"}" target="_blank" rel="noopener noreferrer">
                Register Now
            </a>
        `;

        modal.classList.add("show");
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // ✅ Prevent background scrolling

        // ✅ Close modal event listener
        document.getElementById("close-modal").addEventListener("click", closeModal);
    }

    // ✅ Close Modal when clicking outside content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ✅ Close Modal Function
    function closeModal() {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.style.overflow = ""; // ✅ Restore scrolling
    }
});

// ✅ Function to return category emoji
function getCategoryEmoji(category) {
    const categoryEmojis = {
        "Art": "🎨", "Theatre": "🎭", "Photography": "📸", "Music": "🎵",
        "Hackathon": "💻", "Gaming": "🎮", "Football": "⚽", "Workshop": "🛠"
    };
    return categoryEmojis[category] || "🎟";
}
