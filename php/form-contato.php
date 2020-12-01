<?php

require_once('./PHPMailer/PHPMailer.php');
require_once('./PHPMailer/SMTP.php');
require_once('./PHPMailer/Exception.php');
  
use PHPMailer\PHPMailer\PHPMailer;

  try{
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $mensagem = $_POST["mensagem"];
    $mailer = new PHPMailer(true);
    $mailer->setLanguage('br');                             // Habilita as saídas de erro em Português
    $mailer->CharSet='UTF-8';
    $mailer->IsSMTP();
    //$mailer->SMTPDebug = 1;
    $mailer->Port = 587; //Indica a porta de conexão 
    $mailer->Host = 'smtp.gmail.com';//Endereço do Host do SMTP 
    $mailer->SMTPAuth = true; //define se haverá ou não autenticação 
    $mailer->Username ="testevictorhugo2020@gmail.com"; //Login de autenticação do SMTP
    $mailer->Password = ""; //Senha de autenticação do SMTP
    $mailer->isHTML(true);
    $mailer->FromName = 'Formulário site Cristiano Meira Advogados'; //Nome que será exibido
    $mailer->From = 'victorhugo-brito@hotmail.com';
    $mailer->AddAddress('gabriel@cristianomeira.com.br','Cristiano Meira Advogados');
    //Destinatários
    $mailer->Subject = 'Nova mensagem enviada do formulário do site Cristiano Meira Advogados';
    $mailer->Body = '<strong>Nova mensagem enviada do formulário do site!</strong><br><br><b>Nome: </b>' .$nome. '<br><b>E-mail: </b>'.$email.'<br><b>Mensagem: </b>' .$mensagem;
    if(!$mailer->Send())
    {
      echo 'A mensagem não pode ser enviada';
      echo 'Mensagem de erro: ' . $mail->ErrorInfo;
    }else{
      echo "success";
    }
  } catch (Exception $e) {
    //echo "Erro ao enviar mensagem: {$mail->ErrorInfo}";
}

?>