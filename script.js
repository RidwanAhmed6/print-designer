document.addEventListener("DOMContentLoaded", function () {
    const canvas = new fabric.Canvas('on');
    let currentCanvas = 'on';

    // Function to set the current canvas
    function setCanvas(name) {
        currentCanvas = name;
        document.querySelectorAll('canvas').forEach(c => c.style.display = 'none');
        document.getElementById(currentCanvas).style.display = 'block';
    }

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
                canvas.add(image);
                canvas.renderAll();
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Function to add text
    document.getElementById('yaziEkleBtn').addEventListener('click', function () {
        const text = new fabric.IText('Merhaba', {
            left: 50,
            top: 50,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 50
        });
        canvas.add(text);
    });

    // Function to add stickers
    function addSticker(imageURL) {
        fabric.Image.fromURL(imageURL, function (image) {
            image.set({
                left: 50,
                top: 50,
                angle: 0,
                padding: 10,
                cornersize: 10
            });
            canvas.add(image);
        });
    }

    // Zoom functionality
    function zoom(direction) {
        const factor = direction === 'in' ? 1.1 : 0.9;
        canvas.setZoom(canvas.getZoom() * factor);
    }

    // Text panel update functions
    function updateFontText() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.text = document.getElementById('fontText').value;
            canvas.renderAll();
        }
    }

    function updateFontFamily() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.fontFamily = document.getElementById('fontFamily').value;
            canvas.renderAll();
        }
    }

    function updateFontColor() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.fill = document.getElementById('fontColor').value;
            canvas.renderAll();
        }
    }

    function textBold() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.fontWeight = activeObject.fontWeight === 'bold' ? 'normal' : 'bold';
            canvas.renderAll();
        }
    }

    function textItalic() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.fontStyle = activeObject.fontStyle === 'italic' ? 'normal' : 'italic';
            canvas.renderAll();
        }
    }

    function textUnderLine() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.textDecoration = activeObject.textDecoration === 'underline' ? '' : 'underline';
            canvas.renderAll();
        }
    }

    // Attach event listeners for text panel
    document.getElementById('fontText').addEventListener('keyup', updateFontText);
    document.getElementById('fontFamily').addEventListener('change', updateFontFamily);
    document.getElementById('fontColor').addEventListener('change', updateFontColor);

    // Expose functions to global scope for button onclick attributes
    window.textBold = textBold;
    window.textItalic = textItalic;
    window.textUnderLine = textUnderLine;
    window.setCanvas = setCanvas;
    window.zoom = zoom;
    window.addSticker = addSticker;

    // Initialize canvas settings
    setCanvas('on');
});

