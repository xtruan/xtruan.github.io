<?
$name=$_POST['name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$message=$_POST['message'];

$ToEmail = "toasterstrudel@gmail.com";
$ToSubject = "Contact Form From My Website";

$EmailBody =   "Name: $name\n 
Email: $email\n
Phone: $phone\n
Message: $message\n";

$Message = $EmailBody;


$headers .= "Content-type: text; charset=iso-8859-1\r\n";
$headers .= "From:".$email."\r\n";

mail($ToEmail,$ToSubject,$Message, $headers);

?>