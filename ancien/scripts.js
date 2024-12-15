// Fonction pour copier dans le presse-papiers et activer un bouton
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text)
        .then(() => setActiveButton(button))
        .catch(err => console.error('Erreur lors de la copie :', err));
}

// Fonction pour activer visuellement un bouton
function setActiveButton(button) {
    document.querySelectorAll('.timeline-item button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Fonction pour dérouler une section
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('open');
    const arrow = section.previousElementSibling.querySelector('.arrow-icon');
    arrow.classList.toggle('open');
}

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
