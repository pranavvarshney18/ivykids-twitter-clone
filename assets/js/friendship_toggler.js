{
    let ajaxToggleFriendship = function(link){
        $(link).submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'post',
                url: $(link).attr('action'),
                success: function(data){
                    if(data.data.removeFriend){
                        $(' button', link).html('follow');
                    }
                    else{
                        $(' button', link).html('unfollow');
                    }
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let makeAllFriendshipsDynamic = function(){
        let buttons = $('.friendship-toggle-button');
        for(button of buttons){
            ajaxToggleFriendship(button);
        }
    }

    makeAllFriendshipsDynamic();
}