// Fonction pour copier dans le presse-papiers
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log(`Texte copié : "${text}"`);
    }).catch(err => {
        console.error('Échec de la copie', err);
    });
}

// Fonction pour afficher ou masquer une section
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    var arrow = section.previousElementSibling.querySelector('.arrow-icon');
    section.classList.toggle('open');
    arrow.classList.toggle('open');
}

document.querySelectorAll('.timeline-item button').forEach(button => {
    button.addEventListener('click', () => {
        // Supprimez la classe active des autres boutons
        document.querySelectorAll('.timeline-item button').forEach(btn => btn.classList.remove('active'));

        // Ajoutez la classe active au bouton cliqué
        button.classList.add('active');
    });
});

async function fetchAlmanax() {
    const container = document.getElementById('almanax-container');
    container.innerHTML = '';

    try {
        const response = await fetch('https://alm.dofusdu.de/dofus/fr/ahead/3');
        const data = await response.json();

        if (data && data.data) {
            const sortedData = data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
            sortedData.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.innerHTML = `
                    <h2>${new Date(day.date).toLocaleDateString('fr-FR')}</h2>
                    <p><strong>Bonus :</strong> ${day.bonus.bonus} - ${day.bonus.description}</p>
                    <p><strong>Offrande :</strong> ${day.item_quantity} x 
                        <a href="${day.item_url}" target="_blank">${day.item_name}</a>
                    </p>
                    <p><strong>Kamas reçus :</strong> ${day.reward_kamas}</p>
                    <img src="${day.item.image_url}" alt="${day.item_name}" style="width: 80px; height: auto; margin-top: 10px;">
                `;
                container.appendChild(dayElement);
            });
        } else {
            container.innerHTML = '<p>Aucune donnée disponible pour l\'Almanax.</p>';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'Almanax :', error);
        container.innerHTML = '<p>Erreur lors du chargement des données.</p>';
    }
}

fetchAlmanax();
