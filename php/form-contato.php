<?php
    require("PHPMailer/PHPMailer.php");
    require("PHPMailer/SMTP.php");
    
    if(isset($_POST['email']) && !empty($_POST['email'])){
        
        // $emailParaEnviar = "victorhugogoncalves2010@gmail.com";
        $emailParaEnviar = addslashes($_POST['email']);
        $nome = addslashes($_POST['nome']);
        $email = addslashes($_POST['email']);
        $mensagem = addslashes($_POST['mensagem']);
    
        $mail = new PHPMailer\PHPMailer\PHPMailer();  
        $mail -> isSMTP();
        $mail->Port = "465"; 
        $mail->Host = 'smtp.gmail.com';
        $mail->isHTML(true); 
        $mail->SMTPSecure = 'ssl';
        $mail->Mailer = 'smtp';
        $mail->CharSet = 'UTF-8';
        $mail->SMTPAuth = true;
        $mail->Username = 'testevictorhugo2020@gmail.com';
        $mail->Password = 'abcv3625';
        $mail->SingleTo = true;
    
        $mail->From = 'testevictorhugo2020@gmail.com';
        $mail->FromName = 'Sistema Cristiano Meira Advogados';
        $mail->addAddress($emailParaEnviar);
        $mail->Subject = "Nova mensagem do formulário de contado de $nome !";
        $mail->Body = "<p>Nova mensagem enviada do formulário de contato no site<p> <br> <span>Nome: </span>$nome <br> <span>E-mail: </span>$email <br> <span>Mensagem: </span>$mensagem";
    
        if(!$mail->send()){
            echo $mail->ErrorInfo;
        }else{
            echo "success";
        }
    }else{
        echo "vazio";
    }

?>