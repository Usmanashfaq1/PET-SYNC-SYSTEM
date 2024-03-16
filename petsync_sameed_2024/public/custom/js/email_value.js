$(document).ready(function () {

const userEmail = localStorage.getItem('email');

// Update the href attribute of the link with the email
const feedingScheduleLink = document.getElementById('feedingScheduleLink');
feedingScheduleLink.href = `/feed?email=${userEmail}`;



        // Update the href attribute of the link with the email
        const feedingScheduleLink1 = document.getElementById('feedingScheduleLink1');
feedingScheduleLink1.href = `/feedn?email=${userEmail}`;
        
});
