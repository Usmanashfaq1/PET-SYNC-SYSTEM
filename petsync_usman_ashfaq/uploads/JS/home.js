$(document).ready(function(){
   
// here checkibf the value and sending result to route and then controller to update db tables
    $('#likeImage').click(function(){
       //setting flag here
        let flag=1;  
        if($('#likeImage').val()=='dislike')
        flag=0;


        if($('#likeImage').val()=='like'){
            //dislike
            $('#likeImage').attr('value',"dislike");
        }
        else{
            //like
            $('#likeImage').attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+1+"/likeImage/"+flag, //here hitting route 
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
        //alert(feedname);
        let flag=1;  
        if($(data).val()=='dislike')
        flag=0;


        if($(data).val()=='like'){
            //('dislike');
            $(data).attr('value',"dislike");
        }
        else{
            //('like');
            $(data).attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+feedname+"/likeImage/"+flag, 
            type:"POST",
            timeout:500,
           
            success: function(){
              
                alert(url);
                
            },
            error:function(error){
                throw error;
            }
        });
}


