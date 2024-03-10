$(document).ready(function(){
    $('input.typeahead').typeahead({
        name: 'countries',
        remote: 'http://localhost:3001/profile/search?key=%QUERY',
        limit: 10
    });

    $('#likeImage').click(function(){
       
        let flag=1;  
        if($('#likeImage').val()=='dislike')
        flag=0;


        if($('#likeImage').val()=='like'){
           
            $('#likeImage').attr('value',"dislike");
        }
        else{
            
            $('#likeImage').attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+1+"/likeImage/"+flag, 
            type:"POST",
            timeout:500,
           
            success: function(){
                //
                alert('Liked!');
            },
            error:function(error){
                throw error;
            }
        });
    });
    
    
    $('#search-user-form').submit(function(){
        let username = $('#search-text').val();
       
        $(this).attr('action', "/account/" + username);
    });
});
function showFeed(id){
    window.location='/showfeed/'+id;
    return false;
}

function showAccount(username){
    window.location='/account/'+username;
    return false;
}

function likeImage(feedname,data){
       
        let flag=1;  
        if($(data).val()=='dislike')
        flag=0;


        if($(data).val()=='like'){
           
            $(data).attr('value',"dislike");
        }
        else{
           
            $(data).attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+feedname+"/likeImage/"+flag, 
            type:"POST",
            timeout:500,
           
            success: function(){
                //
                alert(url);
                
            },
            error:function(error){
                throw error;
            }
        });
}


