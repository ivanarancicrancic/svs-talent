function checkPaymentResponse() {

    $('iframe#paymentFrame').load(function () {
        alert($('iframe#paymentFrame').get(0).contentWindow.location);
        alert($('iframe#paymentFrame').contents());
    });

}

$(document).ready(function ()
{
    checkPaymentResponse();

    $("#sendenInquiry").click(function () {

        var mailOk = true;
        var email = "";
        var formContent = "";

        $("input").each(function () {
            $(this).children("input").removeClass("bg-danger"); // "*"
        });

        $(".form-group").each(function () {

            if (
                    $("#Geraet").val() != "" && $("#E-Mail").val() != ""
                    && $("#E-Mail").val() != "" && $("#gesuchtes_Ersatzteil").val() != ""
                    && $("#Firma").val() != "" && $("#Name").val() != "") {

                email = $("#E-Mail").val();

                 formContent = $("input, textarea, select").serialize();
              formContent = unescape(formContent.replace(/\+/g, '%20').replace("user=&pwd=&", '').replace(/&/g, '\n')
                        .replace(/=/g, ': ')).replace(/Ã¼/g, "ü").replace(/Ã¶/g, "ö").replace(/Ã¤/g, "ä").replace(/Ã/g, "ß").replace(/Ã©/g, "é").replace(/Ã¢/g,"â").replace(/Ãª/g,"ê").replace(/Ã/g,"Ç").replace(/Ã´/g, "ô")
           .replace(/Ä‘/g, "đ").replace(/Å£/g, "ţ").replace(/Ä/g, "ă").replace(/Å/g, "Ś").replace(/Å»/g, "Ż").replace(/Å¼/g, "ż").replace(/Åº/g, "ź").replace(/Ã±/g, "ñ").replace(/Ä¯/g, "į").replace(/Ä/g, "ė").replace(/Ä/g, "ę").replace(/Ä/g, "ą").replace(/Ä¶/g, "Ķ").replace(/Å«/g, "ū").replace(/Å/g, "ņ").replace(/Ä¼/g, "ļ").replace(/Ä·/g, "ķ").replace(/Ä«/g, "ī").replace(/Ä¢Ä£/g, "Ģģ").
                          replace(/Å/g, "ń").replace(/Å/g, "ł").replace(/Ä‡/g, "ć").replace(/Ã‡/g, "Ç").replace(/Ä°/g, "İ").replace(/ÅŸ/g, "ş").replace(/Ä±/g, "ı").replace(/Ä/g, "ğ").replace(/Ã/g, "Ö").replace(/Ã/g, "Å").replace(/Ä/g, "Ē").replace(/Ä/g, "Č").replace(/Ä/g, "ē").replace(/Ä/g, "č").replace(/Ä/g, "ā").replace(/Ã/g, "Á").replace(/Ã/g, "Þ").replace(/Ã¾/g, "þ").replace(/Å±/g, "ű").replace(/Å/g, "ő").replace(/Ã¡/g, "á").replace(/Ã/g, "Î").
                         replace(/Å/g, "ŋ").replace(/Å§/g, "ŧ").replace(/Å/g, "ś").replace(/Å³/g, "ų").replace(/Ã/g, "É").replace(/Ã/g, "Ð").replace(/ Ã°/g, "ð").replace(/ Ãµ/g, "õ").replace(/Ã¥/g, "å").replace(/Ã¸/g, "ø").replace(/ Ã¦/g, "æ").replace(/Ã½/g, "ý").replace(/Å¯/g, "ů").replace(/Ãº/g, "ú").
                          replace(/Å¥/g, "ť").replace(/Ã³/g, "ó").replace(/Åˆ/g, "ň").replace(/à­/g, "í").replace(/Ä•/g, "ĕ").replace(/Å™/g, "ř").replace(/Å¾/g, "ž").replace(/Å/g, "š").replace(/Ä/g, "đ").replace(/Ä‘/g, "dž").
                          replace(/dÅ¾/g, "ć").replace(/Ä‡/g, "ć").replace(/Ä/g, "č").replace(/Ã§/g, "ç").replace(/áºž/g,"ẞ").replace(/Ã®/g,"î")
                          .replace(/Ã»/g, "û").replace(/Ã/g, "à").replace(/à¨/g, "è").replace(/à¹/g, "ù").replace(/à«/g, "ë").replace(/à¯/g, "ï").replace(/à/g, "Ü").replace(/à–/g, "Ö").replace(/à/g, "Ä");
                   
            } else {

                mailOk = false;
                $(this).children("input").addClass("bg-danger");
            }

        });

        if (mailOk == true && validateEmail(email)) {
             $.post('./function', {'lang': getLang(varLang), 'email': email, 'func': 6, 'artNr': formContent, 'option': "anfrage"});
             $("#inquiry").html("Anfrage wurde erfolgreich an uns gesendet!  Vielen Dank :)");
         } else if (mailOk == false) {
             alert("Bitte alle Pflichtfelder ausfüllen");
         } else if (validateEmail(email) == false && mailOk == true) {
             alert("Bitte korrekte E-Mail Adresse angeben");
         }
    });
}); // /ready

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}


function searchArtNr(artNr) {
    $().redirect('./parts', {'lang': getLang(varLang), 'artNr': artNr, 'func': "2"});
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 