{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

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

    let newPostDom = function(post){
        return $(`
        <li id="post-${post._id}"><p>
            <!-- a user can only delete its own post  -->

                <small><a href="/post/destroy/${post._id}" class="delete-post-button">X</a></small>
            
            ${post.content}
            <br>
            <small>${ post.user.name }</small>
        </p></li>
        `);
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
}