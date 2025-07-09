<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $to = "yaseenshyjal@gmail.com"; // user's email
    $subject = "Uw offerte aanvraag bij Veranda Noord Nederland";

    $message = "Beste " . $data['name'] . ",\n\n";
    $message .= "Uw selectie:\n";
    $message .= "Type: " . $data['goot'] . "\n";
    $message .= "Kleur: " . $data['kleur'] . "\n";
    $message .= "Dak: " . $data['dak'] . "\n";
    $message .= "Afmetingen: " . $data['breedte'] . " x " . $data['diepte'] . " cm\n";
    $message .= "Zonwering: " . $data['zonwering'] . "\n\n";
    $message .= "We nemen zo snel mogelijk contact met u op.\n";

    $headers = "From: offerte@veranda-noord.nl\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
