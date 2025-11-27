// Structure des données pour chaque métier et leurs ressources
const jobsData = {
    "Alchimiste": {
        "Belladone": ["Belladone_Ephedrya.png"],
        "Edelweiss": ["edelweiss.png", "edelweiss1.png"],
        "Ginseng": ["ginseng.png", "Ginseng2.png", "ginseng3.png", "ginseng4.png"],
        "Mandragore": ["Brakmar_mandragore.png"],
        "Mangrove": ["mangrove1.png"],
        "Menthe": ["menthe.png"],
        "Orchidée Freyesque": ["orchidee-freyesque.png", "orchidee-freyesque1.png", "orchidee-freyesque2.png", "orchidee-freyesque3.png", "orchidee-freyesque4.png"],
        "Ortie": ["ortie_r_1.png", "ortie_r_2.png"],
        "Pandouille": ["pandouille.png"],
        "Perce-neige": ["Perce-neige_frigost.png", "Perce-neige_frigost2.png"],
        "Sauge": ["sauge.png", "sauge2.png", "sauge3.png", "sauge4.png", "sauge5.png"],
        "Trèfle": ["trefle1.png", "trefle2.png", "trefle3.png"]
    },
    "Bûcheron": {
        "Aquajou": ["Aquajou.png"],
        "Bambou": ["Bambou_pandala.png", "Bambou_sacre.png", "Bambou_sombre_pandala.png"],
        "Charme": ["Plaine_de_Cania_Charme.png"],
        "Ébène": ["Otomai_Ebene.png", "Plaine_de_Cania_Ebene.png"],
        "Érable": ["Coin_des_bouftou_Erable.png", "Lac_de_Cania_Erable.png"],
        "IF": ["Ootomai_IF.png"],
        "Kaliptus": ["Kaliptus.png"],
        "Merisier": ["Lac_de_Cania_Merisier.png", "Otomai_Merisier.png"],
        "Noisetier": ["Otomai_Noisetier.png"],
        "Oliviolet": ["map_oliviolet-min.png"],
        "Orme": ["orme_lac.png", "scara_omr.png"],
        "Pin": ["Pin_Albuera.png"],
        "Tremble": ["chemin_tremble2.png"],
        "Autres": ["unknown.png"]
    },
    "Paysan": {
        "Frostiz": ["frostiz.png"],
        "Lin": ["Champs_Lin.png", "Coin_Lin.png", "Scara_Lin.png"],
        "Malt": ["Champs_Malt.png", "Coin_Malt.png", "Scara_Malt.png"],
        "Quisnoa": ["Quisnoa.png"]
    }
};

let selectedJob = null;

// Mapping entre le nom affiché et le nom du dossier
const jobFolderNames = {
    "Alchimiste": "Alchimiste",
    "Bûcheron": "Bucheron",
    "Paysan": "Paysan"
};

$(document).ready(function() {
    // Gestion de la sélection du métier
    $('.job-btn').on('click', function() {
        selectedJob = $(this).data('job');

        // Mise à jour visuelle du bouton sélectionné
        $('.job-btn').removeClass('active');
        $(this).addClass('active');

        // Afficher la sélection de ressources
        displayResources(selectedJob);

        // Masquer les images
        $('#images-container').hide();
    });

    // Fonction pour afficher les ressources d'un métier
    function displayResources(job) {
        const resources = jobsData[job];
        const $resourceButtons = $('#resource-buttons');
        $resourceButtons.empty();

        // Créer un bouton pour chaque ressource
        Object.keys(resources).forEach(resource => {
            const $btn = $('<button>')
                .addClass('resource-btn')
                .text(resource)
                .data('resource', resource)
                .on('click', function() {
                    $('.resource-btn').removeClass('active');
                    $(this).addClass('active');
                    displayImages(job, resource);
                });
            $resourceButtons.append($btn);
        });

        $('#resource-selection').fadeIn();
    }

    // Fonction pour afficher les images d'une ressource
    function displayImages(job, resource) {
        const images = jobsData[job][resource];
        const $imagesGrid = $('#images-grid');
        $imagesGrid.empty();

        // Mettre à jour le titre
        $('#selected-title').text(`${job} - ${resource}`);

        // Utiliser le nom du dossier correct (sans accent pour Bûcheron)
        const folderName = jobFolderNames[job];

        // Créer une carte pour chaque image
        images.forEach((imageName, index) => {
            const imagePath = `map/${folderName}/${imageName}`;

            const $card = $('<div>')
                .addClass('trajet-image-card')
                .html(`
                    <div class="trajet-image-header">
                        <h3>Trajet ${index + 1}</h3>
                    </div>
                    <div class="trajet-image-wrapper">
                        <img src="${imagePath}" alt="${resource} - Trajet ${index + 1}" loading="lazy" class="zoomable-image">
                    </div>
                `);

            $imagesGrid.append($card);
        });

        $('#images-container').fadeIn();

        // Ajouter les event listeners pour le zoom
        attachImageZoomListeners();
    }

    // Fonction pour gérer le clic sur les images (popup)
    function attachImageZoomListeners() {
        $('.zoomable-image').off('click').on('click', function() {
            const imgSrc = $(this).attr('src');
            const imgAlt = $(this).attr('alt');
            openImageModal(imgSrc, imgAlt);
        });
    }

    // Fonction pour ouvrir la modale avec l'image
    function openImageModal(src, alt) {
        // Créer la modale si elle n'existe pas
        if ($('#image-modal').length === 0) {
            $('body').append(`
                <div id="image-modal" class="image-modal">
                    <span class="modal-close">&times;</span>
                    <img class="modal-content" id="modal-image">
                    <div class="modal-caption" id="modal-caption"></div>
                </div>
            `);

            // Fermer la modale au clic sur le X
            $('.modal-close').on('click', closeImageModal);

            // Fermer la modale au clic en dehors de l'image
            $('#image-modal').on('click', function(e) {
                if (e.target.id === 'image-modal') {
                    closeImageModal();
                }
            });

            // Fermer avec la touche ESC
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeImageModal();
                }
            });
        }

        // Afficher l'image dans la modale
        $('#modal-image').attr('src', src);
        $('#modal-caption').text(alt);
        $('#image-modal').fadeIn(300);
    }

    // Fonction pour fermer la modale
    function closeImageModal() {
        $('#image-modal').fadeOut(300);
    }
});
