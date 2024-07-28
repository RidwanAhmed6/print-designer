 
        // Fabric.js initialization
        var canvas = new fabric.Canvas('canvas');

        // Load t-shirt front and back images
        function loadTshirtDesign() {
            fabric.Image.fromURL('images/templates/front-t-shirt.png', function (img) {
                img.scaleToHeight(450);
                img.scaleToWidth(450);
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            });
        }

        document.getElementById('imgLoader').onchange = function handleImage(e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var imgObj = new Image();
                imgObj.src = event.target.result;
                imgObj.onload = function () {
                    var image = new fabric.Image(imgObj);
                    image.set({ left: 100, top: 100, angle: 0, padding: 10, cornersize: 10 });
                    canvas.add(image);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        };

        function textPanel() {
            document.querySelector('.textPanel').style.display = 'block';
        }

        function updateFontText() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ text: document.getElementById('fontText').value });
                canvas.renderAll();
            }
        }

        function textBold() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold' });
                canvas.renderAll();
            }
        }

        function textItalic() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic' });
                canvas.renderAll();
            }
        }

        function textUnderLine() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ underline: !activeObject.underline });
                canvas.renderAll();
            }
        }

        function updateFontFamily() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ fontFamily: document.getElementById('fontFamily').value });
                canvas.renderAll();
            }
        }

        function updateFontColor() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.set({ fill: document.getElementById('fontColor').value });
                canvas.renderAll();
            }
        }

        function changeColor(color) {
            // Change T-shirt color
        }

        function changeSize(size) {
            // Change T-shirt size
        }

        $('#zoomIn').on('click', function () {
            canvas.setZoom(canvas.getZoom() * 1.1);
        });

        $('#zoomOut').on('click', function () {
            canvas.setZoom(canvas.getZoom() / 1.1);
        });

        $('#clear').on('click', function () {
            canvas.clear();
            loadTshirtDesign(); // Reload t-shirt design after clearing
        });

        loadTshirtDesign(); // Initial load of t-shirt design
    
