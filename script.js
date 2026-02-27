
function getDonors() {
    return JSON.parse(localStorage.getItem("donors")) || [];
}

function saveDonors(donors) {
    localStorage.setItem("donors", JSON.stringify(donors));
}


const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const donor = {
            name: document.getElementById("name").value,
            blood: document.getElementById("bloodGroup").value,
            phone: document.getElementById("phone").value,
            location: document.getElementById("location").value,
            availability: document.getElementById("availability").value
        };

        const donors = getDonors();
        donors.push(donor);
        saveDonors(donors);

        alert("✅ Registered successfully!");

        registerForm.reset();
    });
}

const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const blood = document.getElementById("bloodGroup").value;
        const location = document.getElementById("location").value.toLowerCase();

        const donors = getDonors();

        const filtered = donors.filter(d =>
            d.blood === blood &&
            d.location.toLowerCase().includes(location) &&
            d.availability === "Available"
        );

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (filtered.length === 0) {
            resultsDiv.innerHTML = "<p>No donors found.</p>";
            return;
        }

        const ul = document.createElement("ul");

        filtered.forEach(d => {
            const li = document.createElement("li");
            li.textContent = `${d.name} – ${d.blood} – ${d.location} – 📞 ${d.phone}`;
            ul.appendChild(li);
        });

        resultsDiv.appendChild(ul);
    });
}


const emergencyForm = document.getElementById("emergencyForm");

if (emergencyForm) {
    emergencyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("🚨 Emergency request sent to nearby donors!");

        emergencyForm.reset();
    });
}
