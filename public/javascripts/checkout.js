Stripe.setPublishableKey('pk_test_wpsaZLzicJCvZLC0yZMd6QHf00yOyDoak5');
var $form = $('#checkoutForm');
$form.submit(function (e) {
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val(),
        address_zip: $('.address_zip').val()
      }, stripeResponseHandler);
      return false;
})



function stripeResponseHandler(status, response) {


  
    if (response.error) { // Problem!
  
      // Show the errors on the form
      $('#payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false); // Re-enable submission
  
    } else { // Token was created!
  
      // Get the token ID:
      var token = response.id;
  
      // Insert the token into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
  
      // Submit the form:
      $form.get(0).submit();

  
    }
  }
