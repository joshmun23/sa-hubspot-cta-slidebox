form.html#

<form class='form-inline' id='my-custom-form'>
  <div class="form-group">
    <input type='email' class='form-control' placeholder='Your email address' required>
  </div>
  <button class="btn btn-primary" type='submit'>Sign up</button>
</form>

<!-- Actual form that gets submitted to HubSpot -->
<div class="hidden" id='hubspot-form'>
  <script charset="utf-8" src="//js.hsforms.net/forms/current.js"></script>
  <script>
    hbspt.forms.create({
      portalId: 'YOUR_PORTAL_ID',
      formId: 'TARGET_FORM_ID',
      onFormReady: function($form) {
        $form.attr('target', 'hubspot-iframe');
      }
    });
  </script>

  <!-- iFrame that data will get submitted to. This hack stops the page redirect. -->
  <iframe name="hubspot-iframe" id="hubspot-iframe"></iframe>
</div>
script.js#

// Send form data to HubSpot from the client.
function submitToHubSpot(data) {
  var $form = $('#hubspot-form form'),
      k;

  // Loop through each value and find a matching input.
  // NOTE: Doesn't support checkbox/radio.
  for (k in data) {
    $form.find("input[name='" + k + "']").val(data[k]);
  }

  $form.submit();
}

// Here's how you'd use this.
$('#my-custom-form').on('submit', function() {
  var formData = {};
  $(this).serializeArray().forEach(function(data) {
    formData[data.name] = data.value;
  });

  submitToHubSpot(formData);

  // We sent the data. Now do whatever else you want.
  alert('Gee, thanks Jonathan! Now I can focus on onboarding my customers with Appcues!');
  window.location.href = 'http://appcues.com';
})
