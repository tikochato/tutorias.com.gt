<?php 

//Checking For reCAPTCHA
$captcha;
if (isset($_POST['g-recaptcha-response'])) {
    $captcha = $_POST['g-recaptcha-response'];
}
// Checking For correct reCAPTCHA
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfWQAYgAAAAAOmTwUreCM4bQJ9UVIxRLDuE-1Ts&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']);
if (!$captcha || $response.success == false) {
  echo "Your CAPTCHA response was wrong.";
  exit ;
} else {
  // Checking For Blank Fields..
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $phone = $_POST['phone'];
  $formcontent="From: $name \n Phone: $phone \n Message: $message";
  $recipient = "info@tutorias.com.gt";
  $subject = "Contact Form";
  $mailheader = "From: $email \r\n";
  mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
  echo "<script>location.replace('thankyou.html')</script>";
}
?>
