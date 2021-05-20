//var employeeId = 2;

let hasActiveConsultation = false;

$(document).ready(function () {
    getInfos()
    getTopFive()
    setSessionState()
});

function getTopFive() {
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'topFiveMediums'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.statsTopFiveMediumNonVide) {
                $('#listTopFive').empty();
                $.each(response.listeMedium, function (index, medium) {
                    let rank = index + 1;
                    $('#listTopFive').append(`
                        <li> ${rank} - ${medium.name} - ${medium.numberUniqueClients} clients </li>
                    `)
                })

                window.alert("Top5 fetched");

            } else {
                window.alert("Le top5 est vide");
                $('#notification').html("Erreur lors de la recherche des informations"); // Message pour le paragraphe de notification
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        });
}
function getInfos() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getEmployee'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log(response)
            $('#employee-name').text(response.firstName + " " + response.lastName);
            $('#employee-mail').text(response.mail);
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}

function setSessionState() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'hasActiveConsultation'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log("Consultation active = " + response.hasActiveConsultation)
            hasActiveConsultation = response.hasActiveConsultation
            if(response.hasActiveConsultation) {
                $('#session-state').text("Session en cours")
            } else {
                $('#session-state').text("Aucune session")
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}

function handleAccessSession() {
    if(hasActiveConsultation) {
        window.location.href = './employee-dashboard-session.html'
    }
}