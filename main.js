const ctx = document.getElementById("myChart").getContext("2d");
const labels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const data = {
  labels: labels,
  datasets: [
    // Background strip
    {
      label: "Background",
      data: Array(labels.length).fill(100), // Full-height bars for background
      backgroundColor: "rgba(242, 247, 255, 0.5)", // Light background color
      borderWidth: 0,
      borderSkipped: false,
      borderRadius: 10, // No rounding for the background
      barThickness: 10, // Set bar width to 10px
    },
    // Main data bars
    {
      label: "Main Data",
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 50], // Actual data
      backgroundColor: "#1B59F8", // Main bar color
      borderColor: "#1B59F8",
      borderWidth: 1,
      borderRadius: 10, // Rounded corners for the main bars
      borderSkipped: false,
      barThickness: 10, // Set bar width to 10px
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        stacked: true, // Stack datasets horizontally
        grid: {
          display: false,
          drawBorder: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        stacked: false, // Do not stack vertically; show independent layers
        beginAtZero: true,
        max: 100, // Set maximum to match the background height
        grid: {
          display: false,
          drawBorder: false, // Remove grid lines on the y-axis
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);

var skillPers = document.querySelectorAll(".skill-per");

skillPers.forEach(function (skillPer) {
  var per = parseFloat(skillPer.getAttribute("per"));
  skillPer.style.width = per + "%";

  var animatedValue = 0;
  var startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    var stepPercentage = progress / 1000; // Dividing by duration in milliseconds (1000ms = 1s)

    if (stepPercentage < 1) {
      animatedValue = per * stepPercentage;
      skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
      requestAnimationFrame(animate);
    } else {
      animatedValue = per;
      skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
    }
  }

  requestAnimationFrame(animate);
});

const menuBtn = document.getElementById("menuBtn");
const sideBar = document.getElementById("sideBar");
const maincontentHolder = document.getElementById("maincontentHolder");

// Add a click event listener to the menu button
menuBtn.addEventListener("click", (event) => {
  // Prevent click event from propagating to the document
  event.stopPropagation();

  // Add the class to show the menu
  sideBar.classList.add("show-menu");
  maincontentHolder.classList.add("show-menu");
});

// Add a click event listener to the document
document.addEventListener("click", (event) => {
  // Check if the sidebar is open
  if (sideBar.classList.contains("show-menu")) {
    // Remove the class to hide the menu
    sideBar.classList.remove("show-menu");
    maincontentHolder.classList.remove("show-menu");
  }
});

// Prevent closing when clicking inside the sidebar
sideBar.addEventListener("click", (event) => {
  event.stopPropagation();
});

async function captureAndDownload() {
  // Reference to the content you want to capture
  const content = document.getElementById("maincontentHolder");

  // Capture the snapshot as an image
  const canvas = await html2canvas(content);
  const imageData = canvas.toDataURL("image/png");

  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Add the captured image to the PDF
  const imgWidth = 190; // A4 width minus margins
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  pdf.addImage(imageData, "PNG", 10, 10, imgWidth, imgHeight);

  // Trigger download
  pdf.save("snapshot.pdf");
}
