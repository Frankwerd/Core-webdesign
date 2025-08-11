// A simple event list (you would eventually fetch this from a server)
const events = {
    '15': 'Financial Planning Workshop',
    '20': 'Investment Strategies Seminar',
    '25': 'Support Program Application Deadline',
};

document.addEventListener("DOMContentLoaded", function() {
    const monthNameEl = document.getElementById('month-name');
    const calendarGridEl = document.getElementById('calendar-grid');

    if (!monthNameEl || !calendarGridEl) return; // Only run on calendar page

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    // Set month name
    monthNameEl.textContent = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Clear grid
    calendarGridEl.innerHTML = '';

    // Add day names
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    dayNames.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day day-name';
        dayEl.textContent = day;
        calendarGridEl.appendChild(dayEl);
    });

    // Get first day of the month and number of days
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add blank days for start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const blankDay = document.createElement('div');
        blankDay.className = 'calendar-day';
        calendarGridEl.appendChild(blankDay);
    }

    // Add numbered days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = i;

        // Highlight today
        if (i === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
            dayEl.classList.add('today');
        }

        // Highlight days with events
        if (events[i]) {
            dayEl.classList.add('event-day');
        }

        calendarGridEl.appendChild(dayEl);
    }
});
