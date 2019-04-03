<?php $name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$phone = $_POST['phone'];
$formcontent="From: $name \n Phone: $phone \n Message: $message";
$recipient = "info@tutorias.com.gt";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "<script>location.replace('thankyou.html')</script>";
?>
