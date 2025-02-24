<?php
// Enable error reporting for debugging (only in development environments)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ensure that the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the required data exists in POST
    if (isset($_POST["full_name"]) && isset($_POST["phone_number"]) && isset($_POST["email_address"]) && isset($_POST["case_desc"])) {
        // Get form data
        $full_name = $_POST["full_name"];
        $phone_number = $_POST["phone_number"];
        $email_address = $_POST["email_address"];
        $case_desc = $_POST["case_desc"];

        // Send email
        $to = "hasun.mohl@hotmail.com";  // Replace with your actual email address
        $subject = "New Consultation Request from $full_name";
        $message = "
        Full Name: $full_name\n
        Phone Number: $phone_number\n
        Email Address: $email_address\n
        Case Description: $case_desc
        ";
        $headers = "From: $email_address\r\nReply-To: $email_address";

        // Try sending the email and return the appropriate message
        if (mail($to, $subject, $message, $headers)) {
            // Return only the success message to AJAX response
            echo "Thank you for your request, $full_name! Your form has been submitted successfully.";
        } else {
            // Return only the error message to AJAX response
            echo "There was an error sending your form. Please try again.";
        }
    } else {
        // Return message if required form data is missing
        echo "Error: Some form data is missing. Please ensure all fields are filled out.";
    }
} else {
    // Return message for invalid request method
    echo "Invalid request method.";
}
?>
