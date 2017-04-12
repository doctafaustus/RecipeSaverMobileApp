// Disables Phonegap proxy
(function() {
  var xhr = {};
  xhr.open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (url.indexOf('/proxy/') === 0){
      url = window.decodeURIComponent(url.substr(7));
    }
    xhr.open.apply(this, arguments);
  };
})(window);

$('#alert-id').click(function(e) {
  e.preventDefault();
  alert(localStorage.app_rs_id);
  //window.open('https://www.facebook.com', '_blank', 'location=yes');
});


// TO CODE
$('#test-get-recipes').click(function(e) {
  e.preventDefault();

  $('.app').hide();

  $.ajax({
    type: 'POST',
    url: 'http://www.recipesaver.net/app-get-recipes',
    //data: {app_rs_id: localStorage.app_rs_id},
    data: {app_rs_id: '54e93773531d9f03007b4722'},
	  success: function(data) {
	  	data.forEach(function(recipe) {
	  		//$('#recipes-target').append('<div>' + recipe.recipeName + '</div>');
	  		$('#recipes-list').append('<li class="recipe-entry">' + recipe.recipeName + '</li>');
	  	});

	  },
	  error: function() {
	  	alert('There was an error');
	  }
  });
});



	$('.social-login-link').click(function(e) {
		e.preventDefault();
		var loc = $(this).attr('href');

  var win = window.open('https://www.recipesaver.net' + loc, '_blank', 'location=yes');
  win.addEventListener('loadstart', function() {
    var poller = setInterval(function() {
      win.executeScript(
        { code: "document.querySelector('#app-rs-id').innerText.trim()" },
        function(values) {
          var app_rs_id = values[0];
          if (app_rs_id) {
            clearInterval(poller);
            localStorage.app_rs_id = app_rs_id;

            // Close browser window
            win.close();
          }
        }
      );
    }, 100);
  });
	});