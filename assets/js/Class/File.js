export default class File {

    //Ajax lecture fichier text
    lire_fichier(file_name) {
        let prenoms = []
        $.ajax({
            type: "GET",
            async: false,
            url: file_name,
            error: function (msg) {
                // message en cas d'erreur :
                alert("Assurez vous de la présence du fichier prenoms.txt" +
                    "\rVérifiez que ce dernier se nomme exactement prenoms.txt" +
                    "\rErreur type: " +msg);
            },
            success: function (data) {
                data = data.split('\r\n')
                for (let i = 0; i < data.length; i++){
                    prenoms[i] = data[i]
                }
            }
        })
        return prenoms
    }

}