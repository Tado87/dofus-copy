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
