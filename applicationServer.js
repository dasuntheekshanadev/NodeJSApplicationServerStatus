const express = require("express");
const cors = require("cors");
const os = require("os")
const app = express();

app.use(cors()); // Enable CORS for all routes

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to log system information
function getSystemInfo() {
  // Uptime
  const uptime = os.uptime();

  // CPU Usage
  const cpuUsage = os.loadavg()[0]; // 1 minute load average

  // Memory Usage
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  // Disk Usage
  const diskUsage = os.freemem();
  const totalDisk = os.totalmem();
  const usedDisk = totalDisk - diskUsage;

  return {
      uptime,
      cpuUsage: cpuUsage.toFixed(2) + '%',
      memoryUsage: formatBytes(usedMemory) + ' / ' + formatBytes(totalMemory),
      diskUsage: formatBytes(usedDisk) + ' / ' + formatBytes(totalDisk)
  };
}

app.get("/", (req, res) => {
  res.send("Hello from Application Server 1!");
});

app.get("/health", (req, res) => {
  const systemInfo = getSystemInfo();
  res.json(systemInfo);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application Server 1 listening on port ${PORT}`);
});
