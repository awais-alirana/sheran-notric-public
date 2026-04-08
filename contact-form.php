<?php
// Contact Form Handler

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fullName = isset($_POST['fullName']) ? htmlspecialchars(trim($_POST['fullName'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $service = isset($_POST['service']) ? htmlspecialchars(trim($_POST['service'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    
    // Validate required fields
    $errors = [];
    
    if (empty($fullName)) {
        $errors[] = "Full Name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email Address is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($service)) {
        $errors[] = "Service is required";
    }
    
    // Service mapping for display
    $serviceMap = [
        'wills-estate' => 'Wills & Estate Planning',
        'power-of-attorney' => 'Power of Attorney',
        'notarization' => 'Document Notarization',
        'statutory-declarations' => 'Statutory Declarations & Affidavits',
        'travel-consent' => 'Travel Consent Letters',
        'mobile-services' => 'Mobile Notary Services',
        'other' => 'Other'
    ];
    
    $serviceDisplay = isset($serviceMap[$service]) ? $serviceMap[$service] : $service;
    
    // If no errors, send email
    if (empty($errors)) {
        // Email recipient
        $to = "awaisalirana93@gmail.com";
        
        // Email subject
        $subject = "New Contact Form Submission - " . $serviceDisplay;
        
        // Email headers - Use a valid from address
        $fromEmail = "noreply@sherannotary.com";
        $headers = "From: " . $fromEmail . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        
        // Email body
        $emailBody = "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <h2 style='color: #1e3a5f;'>New Contact Form Submission</h2>
            <table style='border-collapse: collapse; width: 100%;'>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;'>Full Name:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$fullName}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;'>Email:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$email}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;'>Service Required:</td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$serviceDisplay}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; font-weight: bold; vertical-align: top;'>Message:</td>
                    <td style='padding: 10px;'>" . nl2br($message) . "</td>
                </tr>
            </table>
        </body>
        </html>
        ";
        
        // Try to send email
        $mailSent = @mail($to, $subject, $emailBody, $headers);
        
        // If mail fails, save to file as backup
        if (!$mailSent) {
            $logEntry = "Date: " . date('Y-m-d H:i:s') . "\n";
            $logEntry .= "To: {$to}\n";
            $logEntry .= "From: {$email}\n";
            $logEntry .= "Subject: {$subject}\n";
            $logEntry .= "Name: {$fullName}\n";
            $logEntry .= "Service: {$serviceDisplay}\n";
            $logEntry .= "Message: {$message}\n";
            $logEntry .= "----------------------------------------\n\n";
            
            // Save to submissions file
            @file_put_contents('contact-submissions.txt', $logEntry, FILE_APPEND | LOCK_EX);
        }
        
        // Return JSON response
        header('Content-Type: application/json');
        
        if ($mailSent) {
            echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully.']);
        } else {
            // Email failed but data was saved to file
            echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been received. We will contact you soon.']);
        }
    } else {
        // Return validation errors
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    }
    exit;
} else {
    // If not POST request, redirect to contact page
    header('Location: contact.html');
    exit;
}
?>
