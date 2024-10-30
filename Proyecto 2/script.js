document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById("manejo-imagenes");

    
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPorcentaje = "0";

    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientY;
    };

    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;
    
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY;
        const maxDelta = window.innerHeight / 2;
    
        const porcentaje = (mouseDelta / maxDelta) * 100;
        const prevPorcentaje = parseFloat(track.dataset.prevPorcentaje);
        const nextPorcentaje = prevPorcentaje + porcentaje;
    
        
        const limitadoPorcentaje = Math.max(Math.min(nextPorcentaje, 50), -50);
        track.dataset.porcentaje = limitadoPorcentaje;
    
        
        track.style.transform = `translate(0, ${limitadoPorcentaje - 50}%)`;
    
        
        const trackHeight = track.clientHeight; 

        for(const imagen of track.getElementsByClassName("imagen")) {
            const imagenHeight = imagen.clientHeight;
            const maxMove = trackHeight - imagenHeight; 
    
            
            let newObjectPositionY = nextPorcentaje + 50;
    
            
            newObjectPositionY = Math.max(Math.min(newObjectPositionY, 100), 0);
    
            
            imagen.style.objectPosition = `50% ${newObjectPositionY}%`;
        }
    };
    
    

    

    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0"; // Reiniciar al soltar el botón del mouse
        track.dataset.prevPorcentaje = track.dataset.porcentaje; // Guardar el porcentaje acumulado
    };
});

