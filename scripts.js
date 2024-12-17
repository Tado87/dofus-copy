$(document).ready(function () {
    console.log("Début du chargement des trajets...");

    // Chargement du fichier JSON
    $.getJSON("trajet.json", function (data) {
        console.log("Données JSON chargées :", data);
        renderTrajets(data.trajets);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors du chargement des trajets :", textStatus, errorThrown);
    });

    function renderTrajets(trajets) {
        const $container = $("#trajet-sections");

        trajets.forEach(trajet => {
            const $section = $("<div>").addClass("section-container");

            // Titre principal
            const $title = $("<h2>")
                .addClass("section-title")
                .text(trajet.profession)
                .append($("<span>").addClass("arrow-icon").text("▼"))
                .on("click", function () {
                    $(this).next(".content").slideToggle();
                    $(this).find(".arrow-icon").toggleClass("open");
                });

            const $content = $("<div>").addClass("content");

            trajet.sections.forEach(section => {
                const $sectionTitle = $("<h3>").text(section.nom);
                const $timeline = $("<div>").addClass("timeline");

                section.points.forEach(point => {
                    const $timelineItem = $("<div>").addClass("timeline-item");

                    const $button = $("<button>")
                        .text(point.icone)
                        .on("click", function () {
                            // Retirer la classe 'active' de tous les boutons dans cette timeline
                            $timeline.find("button").removeClass("active");
                            // Ajouter 'active' au bouton cliqué
                            $(this).addClass("active");
                            // Copier la commande dans le presse-papiers
                            copyToClipboard(point.commande);
                        });

                    const $label = $("<span>").text(point.nom);

                    $timelineItem.append($button, $label);
                    $timeline.append($timelineItem);
                });

                $content.append($sectionTitle, $timeline);
            });

            $section.append($title, $content);
            $container.append($section);
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log(`Commande copiée : ${text}`);
        });
    }
});


// Charger les données de l'Almanax
async function fetchAlmanax() {
    const container = document.getElementById('almanax-container');
    container.innerHTML = '';

    try {
        const response = await fetch('https://alm.dofusdu.de/dofus/fr/ahead/3');
        const data = await response.json();

        if (data && data.data) {
            // Trier les données par date du plus ancien au plus récent
            const sortedData = data.data.sort((a, b) => new Date(a.date) - new Date(b.date));

            sortedData.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.innerHTML = `
                    <h2>${new Date(day.date).toLocaleDateString('fr-FR')}</h2>
                    <p><strong>Bonus :</strong> ${day.bonus.bonus} - ${day.bonus.description}</p>
                    <p><strong>Offrande :</strong> ${day.item_quantity} x 
                        ${day.item_name}
                    </p>
                    <p><strong>Kamas reçus :</strong> ${day.reward_kamas}</p>
                    <img src="${day.item.image_url}" alt="${day.item_name}">
                `;
                container.appendChild(dayElement);
            });
        } else {
            container.innerHTML = '<p>Aucune donnée disponible pour l\'Almanax.</p>';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'Almanax :', error);
    }
}

fetchAlmanax();

async function fetchAlmanaxTotal() {
    const containerTotal = document.getElementById('almanax-total');
    containerTotal.innerHTML = '';

    try {
        const response = await fetch('https://alm.dofusdu.de/dofus/fr/ahead/15');
        const data = await response.json();

        if (data && data.data) {
            // Trier les données par date du plus ancien au plus récent
            const sortedData = data.data.sort((a, b) => new Date(a.date) - new Date(b.date));

            sortedData.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.innerHTML = `
                    <h2>${new Date(day.date).toLocaleDateString('fr-FR')}</h2>
                    <p><strong>Bonus :</strong> ${day.bonus.bonus} - ${day.bonus.description}</p>
                    <p><strong>Offrande :</strong> ${day.item_quantity} x 
                        ${day.item_name}
                    </p>
                    <p><strong>Kamas reçus :</strong> ${day.reward_kamas}</p>
                    <img src="${day.item.image_url}" alt="${day.item_name}">
                `;
                containerTotal.appendChild(dayElement);
            });
        } else {
            containerTotal.innerHTML = '<p>Aucune donnée disponible pour l\'Almanax.</p>';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'Almanax :', error);
    }
}
fetchAlmanaxTotal()