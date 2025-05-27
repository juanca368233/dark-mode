document.addEventListener('DOMContentLoaded', () => {
    const stages = document.querySelectorAll('.stage');
    
    stages.forEach(stage => {
        const completeButton = stage.querySelector('.stage-complete-button');
        
        completeButton.addEventListener('click', () => {
git            stage.classList.toggle('completed');
            completeButton.textContent = stage.classList.contains('completed') 
                ? '↩️ Deshacer Completado' 
                : '✅ Etapa Completada';
        });
    });

    // Add mode completion functionality
    const modes = document.querySelectorAll('.mode');
    modes.forEach(mode => {
        const completeButton = mode.querySelector('.mode-complete-button');
        if (completeButton) {
            completeButton.addEventListener('click', () => {
                mode.classList.toggle('completed');
                completeButton.textContent = mode.classList.contains('completed') 
                    ? '↩️ Deshacer Completado' 
                    : '✅ Marcar como completado';
            });
        }
    });
});