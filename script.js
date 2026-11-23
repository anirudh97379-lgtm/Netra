// Updates the dashboard clock
function updateClock() {
    const clock = document.getElementById("clock");
    if (clock)
        clock.textContent = new Date().toLocaleTimeString();
}
// Run once now, then repeat every 1000 ms
updateClock();
setInterval(updateClock, 1000);

const rovers = [
    {
        id: "R-01",
        zone: "Library",
        status: "Online",
        battery: 92,
        temperature: 32,
        sonar: 120,
        speed: 1.2,
        distance: 2.4
    },
    {
        id: "R-02",
        zone: "Admin Block",
        status: "Online",
        battery: 78,
        temperature: 35,
        sonar: 95,
        speed: 0.9,
        distance: 1.8
    },
    {
        id: "R-03",
        zone: "R&D Block",
        status: "Online",
        battery: 65,
        temperature: 38,
        sonar: 140,
        speed: 1.5,
        distance: 3.1
    },
    {
        id: "R-04",
        zone: "Hostel Gate",
        status: "Online",
        battery: 84,
        temperature: 33,
        sonar: 110,
        speed: 1.1,
        distance: 2.0
    },
    {
        id: "R-05",
        zone: "Food Court",
        status: "Online",
        battery: 48,
        temperature: 41,
        sonar: 75,
        speed: 0.7,
        distance: 1.5
    },
    {
        id: "R-06",
        zone: "Sports Arena",
        status: "Online",
        battery: 89,
        temperature: 31,
        sonar: 160,
        speed: 1.3,
        distance: 2.8
    },
    {
        id: "R-07",
        zone: "himalya hostel",
        status: "Online",
        battery: 69,
        temperature: 31,
        sonar: 82,
        speed: 1.9,
        distance: 3.2
    },
];

let selectedRover = rovers[0];
let historyData = [];

function renderFleet() {

    const body = document.getElementById("fleet-body");
    const search = document.getElementById("rover-search").value.toLowerCase();

    if (!body) return;

    body.innerHTML = "";

    rovers.filter(rover =>
        rover.id.toLowerCase().includes(search) ||
        rover.zone.toLowerCase().includes(search)

    ).forEach(rover => {

        const row = document.createElement("tr");

        if (rover.id === selectedRover.id) {
            row.classList.add("selected-row");
        }

        row.innerHTML = `
            <td>${rover.id}</td>
            <td>${rover.zone}</td>
            <td>${rover.status}</td>
            <td>${rover.battery.toFixed(0)}%</td>
            <td>${rover.temperature.toFixed(1)}°C</td>
            <td>${rover.sonar.toFixed(0)} cm</td>
            <td>${rover.speed.toFixed(1)} m/s</td>
        `;

        row.addEventListener("click", () => {

            selectedRover = rover;

            renderFleet();

        });

        body.appendChild(row);

    });

}
function updateDashboard() {

    const online = rovers.filter(
        rover => rover.status === "Online"
    ).length;

    const averageBattery =
        rovers.reduce((sum, rover) =>
            sum + rover.battery, 0
        ) / rovers.length;

    const distance =
        rovers.reduce((sum, rover) =>
            sum + rover.distance, 0
        );

    document.getElementById("online-count").textContent =
        `${online} / ${rovers.length}`;


    document.getElementById("average-battery").textContent =
        averageBattery.toFixed(0) + "%";

    document.getElementById("distance").textContent =
        distance.toFixed(1) + " km";
    renderFleet();
}
document.getElementById("rover-search")
    .addEventListener("input", renderFleet);
window.addEventListener("load", updateDashboard);