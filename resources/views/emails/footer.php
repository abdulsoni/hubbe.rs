<table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
    <tr style="padding: 0;vertical-align: top;text-align: left;">
        <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;position: relative;padding-right: 0px;border-collapse: collapse!important;">
            <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;margin: 0 auto;width: 580px;">
                <tr style="padding: 0;vertical-align: top;text-align: left;">
                    <td align="center" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;border-collapse: collapse!important;">
                        <center style="width: 100%;min-width: 580px;">
                            <p style="text-align: center;margin: 0;margin-bottom: 15px;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;padding: 0;line-height: 21px;font-size: 15px;"><a href="#" style="color: #2ba6cb;text-decoration: none;">Unsubscribe from these emails</a></p>
                        </center>
                    </td>
                    <td class="expander" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0!important;vertical-align: top;text-align: left;color: #222222;font-family: 'Helvetica', 'Arial', sans-serif;font-weight: normal;margin: 0;line-height: 21px;font-size: 15px;visibility: hidden;width: 0px;border-collapse: collapse!important;"></td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</center>
</td>
</tr>
</table>
<script type="text/javascript">
    /* <![CDATA[ */
    (function() {
        try {
            var s, a, i, j, r, c, l = document.getElementsByTagName("a"),
                t = document.createElement("textarea");
            for (i = 0; l.length - i; i++) {
                try {
                    a = l[i].getAttribute("href");
                    if (a && a.indexOf("/cdn-cgi/l/email-protection") > -1 && (a.length > 28)) {
                        s = '';
                        j = 27 + 1 + a.indexOf("/cdn-cgi/l/email-protection");
                        if (a.length > j) {
                            r = parseInt(a.substr(j, 2), 16);
                            for (j += 2; a.length > j && a.substr(j, 1) != 'X'; j += 2) {
                                c = parseInt(a.substr(j, 2), 16) ^ r;
                                s += String.fromCharCode(c);
                            }
                            j += 1;
                            s += a.substr(j, a.length - j);
                        }
                        t.innerHTML = s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        l[i].setAttribute("href", "mailto:" + t.value);
                    }
                } catch (e) {}
            }
        } catch (e) {}
    })();
    /* ]]> */
</script>
</body>

</html>