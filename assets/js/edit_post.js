
    let toggleEditSection = function(link){
        $(link).click(function(e){
            e.preventDefault();
            $.ajax({
                success: function(){
                    let postId = $(link).attr('id').split('-')[2];

                    $(`#edit-section-${postId}`).removeClass('hide');
                    $(`#post-content-${postId}`).addClass('hide');
                }
            })

        });
    }

    let callAllEditButtons = function(){
        let editButtons = $('.edit-button');
        for(editButton of editButtons){
            toggleEditSection(editButton);
        }
    }

    let editPost = function(link){
        $(link).submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: $(link).attr('action'),
                data: $(link).serialize(),
                success: function(data){
                    $(`#post-content-${data.data.postId}`).html(data.data.content);

                    $(`#post-content-${data.data.postId}`).removeClass('hide');
                    $(`#edit-section-${data.data.postId}`).addClass('hide');

                    //add flash message
                    new Noty({
                        theme: 'relax',
                        text: 'Post updated',
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

    let callAllEditSubmissionButtons = function(){
        let submissionButtons = $('.edit-section');
        for(b of submissionButtons){
            editPost(b);
        }
    }

    callAllEditSubmissionButtons();
    callAllEditButtons();
