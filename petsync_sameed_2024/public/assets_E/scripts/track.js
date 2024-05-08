
document.addEventListener('DOMContentLoaded', function () {
    displayTrack();
});


function displayTrack() {
    var email_e = localStorage.getItem('email_e');
    var id = localStorage.getItem('id_of_order_selected');


    $.ajax({
        url: 'http://localhost:3001/get_track?email_e=' + email_e + '&id=' + id,
        method: 'GET',
        success: function (data) {

            var currentStatus = data.status;

            updateTimeline(currentStatus);
        },

        error: function (error) {
            console.error('Error fetching track:', error);
            alert('Error fetching track. Please try again.');
        }
    });
}


function updateTimeline(status) {
    // Reset all items to default appearance
    $('.step-wizard-item').removeClass('current-item');

    // Determine which step corresponds to the current status
    var stepIndex;
    switch (status) {
        case 'pending':
            stepIndex = 1;
            break;
        case 'confirmed':
            stepIndex = 2;
            break;
        case 'shipped':
            stepIndex = 3;
            break;
        case 'delivered':
            stepIndex = 4;
            break;
        default:
            stepIndex = 1; // Default to Order Pending if status is unknown
            break;
    }

    // Add 'current-item' class to the corresponding step
    $('.step-wizard-item:nth-child(' + stepIndex + ')').addClass('current-item');

    // If stepIndex is 4 (Order Delivered), mark it as done
    if (stepIndex === 4) {
        $('.step-wizard-item:nth-child(' + stepIndex + ')').addClass('done');
    }
}
