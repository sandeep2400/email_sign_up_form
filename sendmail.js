function sendfax($fax_num) {

		require_once ('/Mail/Mail.php');
		require_once ('/Mail/mime.php');
		require_once ('/Net_SMTP/SMTP.php');
        $from = EMAIL_FROM;
		$to = EMAIL_TO;
		$port = SMTP_PORT;
		$subject = "RMA Document for Dreamline: ".$fax_num;

		$headers = array ('From' => $from,'To' => $to, 'Subject' => $subject);
		$text = 'Please look at the document for RMA instructions.';

/*		$html = '<html>';
		$html .= '<head>';
		$html .= '</head><body><h4>Please look at the document for RMA instructions.</h4></body></html>';
*/		
//		$html = "<html></html>";

        $file = 'files/Lowes_RMA.docx'; // attachment
		$crlf = "\n";
 
		$mime = new Mail_mime($crlf);
//		$mime->setHTMLBody($html);
		$mime->setTXTBody($text);
//		$mime->addAttachment($file, 'text/plain');
		$mime->addAttachment($file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

		$body = $mime->get();
		$headers = $mime->headers($headers);

		$host = SMTP_SERVER;
		$username = SMTP_USER;
		$password = SMTP_PASSWORD;

		$smtp = Mail::factory('smtp', 
				array ('host' => $host,
                       'port' => $port, 
				       'auth' => true,
		 		       'username' => $username,
				       'password' => $password));
 
		$mail = $smtp->send($to, $headers, $body);
		if (PEAR::isError($mail)) {
		  echo($mail->getMessage());
		}
	}	

?>// JavaScript Document