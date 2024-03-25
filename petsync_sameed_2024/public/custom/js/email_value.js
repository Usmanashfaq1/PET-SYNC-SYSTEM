$(document).ready(function () {

const userEmail = localStorage.getItem('email');

// Update the href attribute of the link with the email
const feedingScheduleLink = document.getElementById('feedingScheduleLink');
feedingScheduleLink.href = `/feed?email=${userEmail}`;

//record behavior and training logs
const feedingScheduleLink2 = document.getElementById('feedingScheduleLink2');
feedingScheduleLink2.href = `/feedrbt?email=${userEmail}`;


const feedingScheduleLink3 = document.getElementById('feedingScheduleLink3');
feedingScheduleLink3.href = `/feedrbt_view?email=${userEmail}`;


        // Update the href attribute of the link with the email
        const feedingScheduleLink1 = document.getElementById('feedingScheduleLink1');
feedingScheduleLink1.href = `/feedn?email=${userEmail}`;
        
});
