// Returns string which is required for correct conversion to CSV file later on
function formCsvData(json) {
  const csvData = [];
  const csvFields = Object.keys(json[0]);
  csvData.push(csvFields.join(","));
  for (const obj of json) {
    const csvRow = Object.values(obj);
    csvData.push(csvRow.join(","));
  }
  return csvData.join("\n");
}

function downloadCsvFile(csvData, name) {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", name);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
