const timeSlotDuration = 60; // in minutes
const workingHoursStart = 2 * 60; // 9:00 AM in minutes
const workingHoursEnd = 12 * 60; // 5:00 PM in minutes

// Function to generate time slots for the day
function getTimeSlots(workingHoursStart, workingHoursEnd) {
  let timeSlots = [];
  let currentTime = workingHoursStart;

  while (currentTime < workingHoursEnd) {
    const startTime = formatTime(currentTime);
    const endTime = formatTime(currentTime + timeSlotDuration);
    const slot = {
      startTime,
      endTime,
      isReserved: false,
    };

    timeSlots.push(slot);
    currentTime += timeSlotDuration;
  }

  return timeSlots;
}

// console.log(getTimeSlots(workingHoursStart, workingHoursEnd))


// Function to format time in HH:MM format
function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${padZero(hours)}:${padZero(mins)}`;
}

// Helper function to pad zero to single-digit numbers
function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

// Function to mark a time slot as reserved
function reserveTimeSlot(timeSlots, startTime, endTime) {
  for (const slot of timeSlots) {
    if (!slot.isReserved) {  // Check only unreserved slots
      const slotStartMinutes = convertToMinutes(slot.startTime);
      const slotEndMinutes = convertToMinutes(slot.endTime);

      const overlapping = isOverlapping(timeSlots, { startTime: slot.startTime, endTime: slot.endTime });
      if (overlapping) {
        throw new Error("Overlapping");
      }

      if (slotStartMinutes >= startTime && slotEndMinutes <= endTime) {
        slot.isReserved = true;
      }
    }
  }
}

let timeSlots = getTimeSlots(workingHoursStart, workingHoursEnd);
console.log("xxx", timeSlots)
reserveTimeSlot(timeSlots, convertToMinutes("05:00"), convertToMinutes("06:00"))
reserveTimeSlot(timeSlots, convertToMinutes("07:00"), convertToMinutes("08:00"))
reserveTimeSlot(timeSlots, convertToMinutes("05:00"), convertToMinutes("05:10"))
console.log(timeSlots)


// Helper function to convert time to minutes for comparison
function convertToMinutes(time) {
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
}

// Example usage
// const allTimeSlots = generateTimeSlots();

function isOverlapping(existingReservations, newReservation) {
  const newStartTime = convertToMinutes(newReservation.startTime);
  const newEndTime = convertToMinutes(newReservation.endTime);

  for (const reservation of existingReservations) {
    const existingStartTime = convertToMinutes(reservation.startTime);
    const existingEndTime = convertToMinutes(reservation.endTime);

    console.log(newStartTime, existingStartTime)
    console.log(newEndTime, existingEndTime)
    
    // Check for any overlap
    if (
      (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
      (newEndTime == existingStartTime && newEndTime == existingEndTime) ||
      (newStartTime < existingStartTime && newEndTime > existingEndTime)
    ) {
      console.log("Overlapping")
      return true; // Overlapping
    }
  }

  return false; // Not overlapping
}