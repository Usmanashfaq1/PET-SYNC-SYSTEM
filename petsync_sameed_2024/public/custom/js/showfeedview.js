
    $(document).ready(function(){
        $('#likeImage').click(function(){
                //alert('Hii');
                let flag=1;  
                if($('#likeImage').val()=='dislike')
                flag=0;
                if($('#likeImage').val()=='like'){
                    //$('#likeImage').html('dislike');
                    $('#likeImage').attr('value',"dislike");
                }
                else{
                    //$('#likeImage').html('like');
                    $('#likeImage').attr('value',"like");
                }
                $.ajax({
                    url: "/profile/postFeed/"+"<%=postId%>"+"/likeImage/"+flag, 
                    type:"POST",
                    timeout:500,
                    //dataType:'json',
                    success: function(){
                        //
                        alert('Liked!');
                    },
                    error:function(error){
                        throw error;
                    }
                });
            });
            $('#commentImage').click(function(){
                $('#commentSection').toggle();
                $('#loadComments').toggle();
                /*if('<%= comments.length%>' > 3){
                    //alert('<%= comments.length%>');
                    $('#loadNextComments').toggle();
                }*/
                $('#postCommentForm').submit(function() {
                //$("#status").empty().text("File is uploading...");
                $(this).ajaxSubmit({
                    error: function(xhr) {
                      //alert("Error while posting comment 1");
                    status('Error: ' + xhr.status);
                    },
                    success: function(response) {
                    $("#status").empty().text(response);
                    //alert("Error while posting comment 2");
                        console.log(response);
                    }
                });
                //Very important line, it disables the page refresh.
                return false;
                });
            });
        });
        function showAccount(username){
            window.location='/account/'+username;
            return false;
        }
      
    
    
        document.addEventListener('DOMContentLoaded', function() {
    // Get the close button element
    var closeButton = document.querySelector('.close-link');

    // Add click event listener
    closeButton.addEventListener('click', function(event) {
        // Prevent the default behavior of anchor tag
        event.preventDefault();

        // Get the current URL
        var currentUrl = window.location.href;

        // Determine the previous page based on the current URL
        var previousPage = getPreviousPage(currentUrl);

        // Redirect the user back to the previous page
        if (previousPage) {
            window.location.href = previousPage;
        } else {
            // Fallback redirection if previous page cannot be determined
            window.history.back();
        }
    });

    // Function to determine the previous page based on the current URL
    function getPreviousPage(currentUrl) {
        if (currentUrl.includes('/main')) {
            return '/main';
        } else if (currentUrl.includes('/userprofileview')) {
            return '/userProfileView';
        } else if (currentUrl.includes('/otheruserprofileview')) {
            return '/otherUserProfileView';
        } else {
            return null; // Cannot determine previous page
        }
    }
});

        document.getElementById("search-user-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission
    
            // Get the value of the input field
            var username = document.getElementById("search-text").value;
    
            // Redirect to the URL with the username as a parameter
            window.location.href = "/account/" + username;
        });
    