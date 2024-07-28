document.addEventListener("DOMContentLoaded", function () {
    const canvasOn = new fabric.Canvas('on');
    const canvasArka = new fabric.Canvas('arka');
    let currentCanvas = canvasOn;

    // Function to set the current canvas
    function setCanvas(name) {
        document.querySelectorAll('canvas').forEach(c => c.classList.remove('active'));
        if (name === 'on') {
            currentCanvas = canvasOn;
            document.getElementById('on').classList.add('active');
        } else {
            currentCanvas = canvasArka;
            document.getElementById('arka').classList.add('active');
        }
    }

    // Expose setCanvas function to global scope
    window.setCanvas = setCanvas;

    // Function to handle zooming
    function zoom(direction) {
        const zoomFactor = direction === 'in' ? 1.1 : 0.9;
        currentCanvas.setZoom(currentCanvas.getZoom() * zoomFactor);
    }

    // Expose zoom function to global scope
    window.zoom = zoom;

    // Function to handle image upload
    document.getElementById('imgLoader').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                const image = new fabric.Image(imgObj);
                image.set({
                    left: 50,
                    top: 50,
                    angle: 0,
                    padding: 10,
                    cornersize: 10
                });
                image.scaleToWidth(200); // Adjust image size as needed
                currentCanvas.add(image);
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    });
});
