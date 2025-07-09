<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $to = "yaseenshyjal@gmail.com";  // Admin email
    $subject = "Nieuwe Offerte Aanvraag";
    $message = "Gegevens:\n\n";
    $message .= "Naam: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    $message .= "Telefoon: " . $data['phone'] . "\n";
    $message .= "Type: " . $data['goot'] . "\n";
    $message .= "Kleur: " . $data['kleur'] . "\n";
    $message .= "Dak: " . $data['dak'] . "\n";
    $message .= "Afmetingen: " . $data['breedte'] . " x " . $data['diepte'] . "\n";
    $message .= "Zonwering: " . $data['zonwering'] . "\n";

    //$headers = "From: offerte@verandanoordnederland.nl\r\n";
    //$headers .= "Reply-To: " . $data['email'] . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
