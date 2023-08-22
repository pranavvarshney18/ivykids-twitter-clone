
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post, data.data.userId);
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

                    //call edit functionality
                    toggleEditSection($(' .edit-button', newPost));
                    editPost($(' .edit-section', newPost));

                    //add flash message
                    new Noty({
                        theme: 'relax',
                        text: 'New post created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show();
                },
                error: function(err){
                    console.log(err);
                }
            })
        });
    }

    let newPostDom = function(post, userId){
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


    //function to delete a post 
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).attr('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Post deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show();
                },
                error: function(err){
                    console.log(err);
                }
            })
        })
    }

    //existing posts can be deleted as well
    let makeAllPostsDynamic = function(){
        let posts = $('.delete-post-button');
        for(post of posts){
            deletePost(post);
        }
    }

    makeAllPostsDynamic();
    createPost();
