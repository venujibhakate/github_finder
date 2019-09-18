$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username= e.target.value;
    
    $.ajax({
     url:'https://api.github.com/users/'+username,
     data:{
         client_id:'41a58fe625be9492a363',
         client_secret:'759c1600c026a7ba644af24a493f84d729ed7590'
        }
    }).complete(function(like){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
            client_id:'41a58fe625be9492a363',
            client_secret:'759c1600c026a7ba644af24a493f84d729ed7590'
           }
       }).always(function(repo){
         $.each(repo,function(index,rep){
           $('#repos').append(`
           <div class="well">
           <div class="row">
           <div class="col-md-4 col">
           <p>${rep.name}<p>
           </div>
           <div class="col-md-5 col">
           <span class="labels label-defaulta">fork:${rep.forks_count}</span>
           <span class="labels label-defaultb">Public Gists:${rep.watchers_count}</span>
           <span class="labels label-defaultc">followers:${rep.stargazers_count}</span>
           
           </div>
           <div class="col-md-8 col">
           <a href="${rep.html_url}" target"_blank" class="btn btn-default">repo page</a>
           </div>
           </div>
           </div>

         `)
         });
       });
        $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${like.name}</h3>
        </div>
        <div class="panel-body">
            
              <div class="col-md-3 pp">
                <img class="thumbnail" src="${like.avatar_url}"><br>
                
                <div class="target">
                <a target="_blank" class="btn btn-primary btn-block" href="${like.html_url}">View Profile</a>
                </div>
              </div>
        <div class="col-md-9 pp">
          <button class="label label-default">Public Repos: ${like.public_repos}</button>
          <button class="label label-default1">Public Gists: ${like.public_gists}</button>
          <button class="label label-default2">Followers: ${like.public_followers}</button>
          <button class="label label-default3">Following: ${like.public_following}</button>
        <br><br>
      <ul>
      <li class="list-group-item">company:${like.company}</li>
      <li class="list-group-item">website/blog:${like.blog}</li>
      <li class="list-group-item">location:${like.location}</li>
      <li class="list-group-item">member since:${like.created_at}</li>
      </ul>
        </div>
          </div>
            
      
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <hr>
        <div id="repos"></div>
      
        `);

    });
});
});
