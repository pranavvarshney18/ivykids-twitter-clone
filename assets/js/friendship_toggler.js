
    let ajaxToggleFriendship = function(link){
        $(link).submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'post',
                url: $(link).attr('action'),
                success: function(data){
                    if(data.data.removeFriend){
                        $(' button', link).html('follow');
                        $(' button', link).removeClass('follow-class');
                    }
                    else{
                        $(' button', link).html('following');
                        $(' button', link).addClass('follow-class');
                    }
                    
                    //posts should reload with ajax on toggling friendship
                    let arr = [];
                    $('#posts-list-container>ul').html('');
                    for(post of data.data.posts){
                        if(post.user._id != data.data.userId){
                            let ele = reloadPosts(post, data.data.userId);
                            $('#posts-list-container>ul').append(ele);
                        }
                        else{
                            let ele = reloadPostsofHomeUser(post, data.data.userId);
                            $('#posts-list-container>ul').append(ele);
                            deletePost($(' .delete-post-button', ele));

                            //call edit functionality
                            toggleEditSection($(' .edit-button', ele));
                            editPost($(' .edit-section', ele));
                        }
                    }

                    // $('#posts-list-container>ul').html('');
                    // for(ele of arr){
                    //     $('#posts-list-container>ul').append(ele);
                    //     deletePost($(' .delete-post-button', ele));

                    //     //call edit functionality
                    //     toggleEditSection($(' .edit-button', ele));
                    //     editPost($(' .edit-section', ele));
                    // }
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let reloadPostsofHomeUser = function(post, userId){
        return $(`
        <li id="post-${post._id}"><p>
                            

            <small class="user-name">${ post.user.name } posted</small> 

                    
                    <a href="" class="edit-button" id="edit-button-${post._id}"><i class="fa-regular fa-pen-to-square"></i>edit</a>         
                    <form action="/post/edit/?postId=${post._id}&userId=${userId}" method="POST" class="hide edit-section" id="edit-section-${post._id}" value="${post.content}">
                        <textarea name="content" id="" cols="30" rows="3" >${post.content}</textarea>
                        <button type="submit">submit</button>
                    </form>

            <p class="post-content" id="post-content-${post._id}">
            ${post.content}
            </p>

            <small class="time">${post.createdAt }</small>

            <!-- a user can only delete its own post  -->
           
                <small><a href="/post/destroy/${post._id}" class="delete-post-button"><i class="fa-regular fa-trash-can"></i></a></small>
            
        </p></li>
        `)
    }

    let reloadPosts = function(post, userId){
        return $(`
        <li id="post-${post._id}"><p>
                            

            <small class="user-name">${ post.user.name } posted</small> 


            <p class="post-content" id="post-content-${post._id}">
            ${post.content}
            </p>

            <small class="time">${post.createdAt }</small>

            
        </p></li>
        `)
    }

    let makeAllFriendshipsDynamic = function(){
        let buttons = $('.friendship-toggle-button');
        for(button of buttons){
            ajaxToggleFriendship(button);
        }
    }

    makeAllFriendshipsDynamic();
