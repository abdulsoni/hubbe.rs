<?php include 'head.php' ?>
    <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
        <tr style="padding: 0;vertical-align: top;text-align: left;">
            <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;position: relative;padding-right: 0px;border-collapse: collapse!important;">
                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;margin: 0 auto;width: 580px;">
                    <tr style="padding: 0;vertical-align: top;text-align: left;">
                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;border-collapse: collapse!important;">
                            <br>
                            <h2 style="color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;padding: 0;margin: 0;text-align: left;line-height: 1.3;word-break: normal;font-size: 36px;">Hi, <?php echo $user->name; ?></h2>
                            <br>
                            <p class="lead" style="margin: 0;margin-bottom: 15px;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 24px;font-size: 20px;">Verify your email address</p>
                            <p style="margin: 0;margin-bottom: 15px;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 21px;font-size: 15px;">Thanks for creating an account with Fundator. Plase click the link below to verify your email address</p>
                            <p style="margin: 0;margin-bottom: 15px;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 21px;font-size: 15px;"><a href="<?php echo 'http://desk.fundator.co/#/auth/confirm/?code=' . $user->confirmation_code . '&email=' . $user->email; ?>" style="color: #2ba6cb;text-decoration: none;"><?php echo 'http://desk.fundator.co/#/auth/confirm/?token=' . $user->confirmation_code . '&email=' . $user->email; ?></a></p></p>
                        </td>
                        <td class="expander" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0!important;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;visibility: hidden;width: 0px;border-collapse: collapse!important;"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
<?php include 'footer.php' ?>