function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("Use a valid YYYY-MM-DD date.");
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) throw new Error("Use a valid YYYY-MM-DD date.");
  return date;
}

function addDays(value, days) {
  const date = validDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function calculateGscWindows(runDate, excludedNewestDays = 3) {
  const latestEnd = addDays(runDate, -excludedNewestDays);
  const latestStart = addDays(latestEnd, -27);
  const previousEnd = addDays(latestStart, -1);
  return {
    latest: { startDate: latestStart, endDate: latestEnd },
    previous: { startDate: addDays(previousEnd, -27), endDate: previousEnd },
    discovery: { startDate: addDays(latestEnd, -89), endDate: latestEnd },
    excludedNewestDays,
  };
}

function calculateMeasurementFetchDates(changeDate, excludedNewestDays = 3) {
  return [14, 28, 56].map((postChangeDays) => ({ postChangeDays, earliestFetchDate: addDays(changeDate, postChangeDays + excludedNewestDays) }));
}

module.exports = { addDays, calculateGscWindows, calculateMeasurementFetchDates };