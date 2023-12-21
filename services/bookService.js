// const time = {
//   workingHoursStart: 2 * 60,
//   workingHoursEnd: 14 * 60,
//   timeSlotDuration: 60
// }

// const reservation = {
//   day: '2023-12-06',
//   startTime: "02:00",
//   endTime: "03:00"
// }

// Function to generate time slots for the day
export function getTimeSlots(time)
{
  // console.log("xxtimecc", time)
  let timeSlots = [];
  let currentTime = time.workingHoursStart;

  while (currentTime < time.workingHoursEnd) {
    const startTime = formatTime(currentTime);
    const endTime = formatTime(currentTime + time.timeSlotDuration);
    const slot = {
      startTime,
      endTime,
      isReserved: false,
    };

    timeSlots.push(slot);
    currentTime += time.timeSlotDuration;
  }

  return timeSlots;
}

// console.log(getTimeSlots(time))


export function getReservedSlots(reservationObject, day) {
  // Check if there are reservations for the given date
  // console.log("reservationObject", JSON.stringify(reservationObject))
  const reservationsForDate = reservationObject.find(entry => entry.hasOwnProperty(day));
  // console.log("reservationsForDate", reservationsForDate)

  // Return reservations for the date or an empty array if none found
  return reservationsForDate ? reservationsForDate[day] : [];
}



// Function to format time in HH:MM format
function formatTime(minutes)
{
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${padZero(hours)}:${padZero(mins)}`;
}

// Helper function to pad zero to single-digit numbers
function padZero(num)
{
  return num < 10 ? `0${num}` : `${num}`;
}

// Function to mark a time slot as reserved
// Function to mark a time slot as reserved
function reserveTimeSlot(timeSlots, time)
{
  if (timeSlots.length == 0) {
    return;
  }
  // idx is the day in time object subtracted by the current day
  let idx = (new Date(time.day).getDay() - new Date().getDay());
  // loop over the time slots inside the day that is passed in time
  for (const slot of timeSlots[idx][time.day]) {
    if (!slot.isReserved) {  // Check only unreserved slots
      const slotStartMinutes = convertToMinutes(slot.startTime);
      const slotEndMinutes = convertToMinutes(slot.endTime);
      const bookingStartMinutes = convertToMinutes(time.startTime);
      const bookingEndMinutes = convertToMinutes(time.endTime);

      const overlapping = isOverlapping(timeSlots, { startTime: slot.startTime, endTime: slot.endTime });
      if (overlapping) {
        throw new Error("Overlapping");
      }

      // Check if the booking time falls within the slot
      if (bookingStartMinutes >= slotStartMinutes && bookingEndMinutes <= slotEndMinutes) {
        slot.isReserved = true;
      }
    }
  }
}

// Helper function to convert time to minutes for comparison
function convertToMinutes(time)
{
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
}

export function isOverlapping(existingReservations, newReservation) {
  const newStartTime = convertToMinutes(newReservation.startTime);
  const newEndTime = convertToMinutes(newReservation.endTime);
  const newDay = newReservation.day;

  // console.log("newRes11", newReservation)
  // if existingReservations is empty, then there is no overlap
  if (existingReservations.length == 0) {
    return false;
  }

  const workingHoursObject = existingReservations.find(item => item.hasOwnProperty('workingHoursStart'));
  const workingHoursStart = workingHoursObject ? workingHoursObject.workingHoursStart : '00:00';
  const workingHoursEnd = workingHoursObject ? workingHoursObject.workingHoursEnd : '24:59';

  // Check if the new reservation is outside of working hours
  if (
    newStartTime < convertToMinutes(workingHoursStart) ||
    newEndTime > convertToMinutes(workingHoursEnd)
  ) {
    console.log("Outside of working hours");
    return true; // Overlapping with non-working hours
  }

  for (const dayReservations of existingReservations) {
    const existingDay = Object.keys(dayReservations)[0];
    const reservations = dayReservations[existingDay];
    // console.log("existingDay", existingDay)
    // console.log("reservations", reservations)

    // Check if the reservation is for the same day
    if (newDay === existingDay) {
      // console.log("same day")
      for (const reservation of reservations) {
        const existingStartTime = convertToMinutes(reservation.startTime);
        const existingEndTime = convertToMinutes(reservation.endTime);

        // console.log("reservation", reservation)
        // console.log("to be reserved",newStartTime,"original reserve", existingStartTime);
        // console.log("to be ended", newEndTime, "original end", existingEndTime);

        // Check for any overlap
        if (
          (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
          (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
          (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
        ) {
          console.log("Overlapping");
          return true; // Overlapping
        }
      }
    }
  }
  return false; // Not overlapping
}

function getDayDate(day)
{
  const today = new Date();
  const dayDate = new Date(today.setDate(today.getDate() + day));
  return dayDate.toISOString().split('T')[0];
}

function generateWeekTimeSlots(time)
{
  const allTimeSlots = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = getDayDate(i);
    // get the booked slots for that day
    const timeSlots = getTimeSlots(time);
    // console.log("timeSlots", timeSlots)
    // dispaly the date as the key and the time slots as the value and make them expanded when logged because they are objects
    // return all the time slots for the 7 days with the booked slots overritten on time slots
    // allTimeSlots.push({ [dayDate]: timeSlots });
    // map the booked slots to the time slots
    allTimeSlots.push({ [dayDate]: timeSlots });
  }
  return allTimeSlots;
}
export function getWeekCalender(reservations, time)
{
  const allTimeSlots = generateWeekTimeSlots(time);
  // console.log(allTimeSlots)
  for (const day of allTimeSlots) {
    const dayDate = Object.keys(day)[0];
    // console.log("dayDate", dayDate)
    const reservedSlots = getReservedSlots(reservations, dayDate);
    // console.log("reserved", reservedSlots)
    // don't reserve it as it is already reserved, just mark it as reserved in the allTimeSlots array
    for (const slot of reservedSlots) {
      reserveTimeSlot(allTimeSlots, {...slot, day: dayDate});
    }
  }

  return allTimeSlots;
}