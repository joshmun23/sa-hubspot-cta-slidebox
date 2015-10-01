<script>
submitToggle = false;
$('#slidebox input[type=submit]').on('click', function(e) {
  e.preventDefault();
  var formContainer = this.parentElement,
      formChildren  = formContainer.children,
      emailField    = '',
      emailInput    = '',
      baseUrl       = 'https://sa-hs-proxy.herokuapp.com/forms',
      url           = baseUrl,
      params        = '?',
      formSent      = false;

  submitToggle  = true;
  var pageUrl = window.location.href,
      pageName = document.title,
      hutk;

  for(var i = 0; i < formChildren.length; i++) {
    if (formChildren[i].className === 'sa-email') {
      emailField = formChildren[i];
      break;
    }
  };

  if (emailField && emailField.value.length > 0) {
    emailInput = emailField.value;

    var emailValid = function validateEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }
    if (emailValid(emailInput)) {
      params = params + 'email=' + emailInput;
    }
    else {
      submitToggle = false;
      var errorMsg = 'Please enter a valid e-mail';
      $('.sa-errors h4').html(errorMsg);
      $('.sa-errors h4').addClass('errorMsg').fadeIn().delay(1000).fadeOut();
    }
  } else if (emailField && emailField.value.length === 0) {
      submitToggle = false;
      var errorMsg = 'Please enter an e-mail address';
      $('.sa-errors h4').html(errorMsg);
      $('.sa-errors h4').addClass('errorMsg').fadeIn().delay(1000).fadeOut();
  }

  if (document.cookie && params.length > 1) {
    var splitCookies = document.cookie.split(';')
    for(var i = 0; i < splitCookies.length; i++) {
      var splitCookie = splitCookies[i].split('=');
      var cookieName = splitCookie[0],
          cookieValue = splitCookie[1];

      if (cookieName === ' hubspotutk') {
        params = params + '&' + cookieName.replace(' ', '') + '=' + cookieValue;
        hutk = cookieValue;
        break;
      }
    }
  }
  if (params && params.length > 1 && submitToggle ) {
    var request = $.ajax({
      method: "GET",
      url: url + params,
      crossDomain: true,
      dataType: "JSONP",
      data: {
        'email': emailInput,
        'hs_context': {
          "hutk": hutk,
          "pageUrl": pageUrl,
          "pageName": pageName
        }
      },
      success: function(data) {
        formSent = true;
        if (data.hsStatus === 200) {
          $('.sa-bot-section').fadeOut(); $('.sa-mid-section').fadeOut(); $('.sa-top-section').fadeOut();
          $('.sa-cta-container').append('<p style="text-align: center; display: none;"><i class="fa fa-check-circle fa-3x"></i></p>');
          $('.sa-cta-container').append('<h4 style="text-align: center; color: #fff; letter-spacing: 1px; display: none">Thanks for signing up for our newsletter</h3>');
          $('.sa-cta-container p:last').fadeIn();
          $('.sa-cta-container h4:last').fadeIn();

        } else if (data.hsStatus === 400) {
          window.open('http://info.foodspoileralert.com/newsletter-sign-up-spoiler-alert')
        }
      },
      errors: function(data) {
        window.open('http://info.foodspoileralert.com/newsletter-sign-up-spoiler-alert')
      },
      complete: function(data) {
        setTimeout(function() { $('.sa-cta-container').delay(500).fadeOut(); }, 3000);
      }
    });

    setTimeout(function(){
      if (!formSent && request.status && request.status ) {
        window.open('http://info.foodspoileralert.com/newsletter-sign-up-spoiler-alert');
        // email support group
      }
    }, 5000);
  }
});
</script>
