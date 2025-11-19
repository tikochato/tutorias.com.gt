<?php
// --- reCAPTCHA ---
$captcha = $_POST['g-recaptcha-response'] ?? '';

if (!$captcha) {
    echo "Por favor, completa el reCAPTCHA.";
    exit;
}

$secret = '6LfWQAYgAAAAAOmTwUreCM4bQJ9UVIxRLDuE-1Ts';
$verifyResponse = file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$captcha}&remoteip=" . $_SERVER['REMOTE_ADDR']
);

$responseData = json_decode($verifyResponse, true);
if (empty($responseData['success'])) {
    echo "Tu respuesta de reCAPTCHA no es válida.";
    exit;
}

// --- Validar campos ---
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    echo "Por favor completa todos los campos obligatorios.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "El email no es válido.";
    exit;
}

// --- Construir correo ---
$to      = "info@tutorias.com.gt";
$subject = "Contact Form";
$body    = "From: {$name}\n"
         . "Email: {$email}\n"
         . "Phone: {$phone}\n"
         . "Message:\n{$message}\n";

$headers  = "From: no-reply@tutorias.com.gt\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar
if (!mail($to, $subject, $body, $headers)) {
    die("Error al enviar el correo.");
}

// Redirigir
echo "<script>location.replace('thankyou.html')</script>";