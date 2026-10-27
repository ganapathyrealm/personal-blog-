
function analyzeSolar() {
    const sunlight = Number(document.getElementById("sun").value);
    const dust = Number(document.getElementById("dust").value);
    const result = document.getElementById("result");
    const tips = document.getElementById("tips");

    if (
        document.getElementById("sun").value === "" ||
        document.getElementById("dust").value === "" ||
        !Number.isFinite(sunlight) ||
        !Number.isFinite(dust) ||
        sunlight < 0 || sunlight > 1200 ||
        dust < 0 || dust > 100
    ) {
        result.textContent =
            "Enter sunlight from 0 to 1200 W/m² and dust from 0 to 100%.";
        return;
    }

    const efficiency = Math.round(
        Math.max(0, Math.min(100, (sunlight / 1000) * (1 - dust / 100) * 100))
    );

    document.getElementById("energy").textContent =
        (efficiency * 0.3).toFixed(1) + " kWh";

    document.getElementById("efficiency").textContent =
        efficiency + "%";

    document.getElementById("sunlight").textContent =
        sunlight + " W/m²";

    document.getElementById("status").textContent =
        efficiency >= 70 ? "Good" :
        efficiency >= 40 ? "Moderate" : "Needs Attention";

    result.textContent =
        "Estimated performance score: " + efficiency + "%.";

    tips.innerHTML = "";

    const recommendations = [];

    if (dust >= 20) {
        recommendations.push("Inspect and clean dusty solar panels safely.");
    }

    if (sunlight < 400) {
        recommendations.push("Low sunlight detected. Check weather and shading.");
    }

    if (efficiency < 70) {
        recommendations.push("Inspect panel condition, shading and connections.");
    }

    if (recommendations.length === 0) {
        recommendations.push("Performance looks good under these sample conditions.");
    }

    recommendations.push("Compare these estimates with actual inverter readings.");

    recommendations.forEach(function(tip) {
        const item = document.createElement("li");
        item.textContent = tip;
        tips.appendChild(item);
    });
}
