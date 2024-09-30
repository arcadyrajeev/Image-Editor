// Extract the image data from the URL
const urlParams = new URLSearchParams(window.location.search);
const imageData = urlParams.get('image');

if (imageData) {
    // Set the image data as the src of the image element
    document.getElementById('image-display').src = decodeURIComponent(imageData);
} else {
    alert("No image data found!");
}

// add event for active slider
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.edit-options'); // Select all edit-options buttons
   // var sliders = document.querySelectorAll('.slider-box')

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove active class from all buttons and slider-boxes
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.nextElementSibling && btn.nextElementSibling.classList.contains('slider-box')) {
                    btn.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle active class for clicked button
            button.classList.toggle('active');

            // Toggle active class for the corresponding slider-box
            if (button.nextElementSibling && button.nextElementSibling.classList.contains('slider-box')) {
                button.nextElementSibling.classList.toggle('active');
            }
        });
    });

    document.addEventListener('click', function(event) {
        buttons.forEach(function(button) {
            // If the click event happens outside of the button, remove 'active' class 
            
            var sliderBox = button.nextElementSibling;

            if (!button.contains(event.target)  && !(sliderBox && sliderBox.contains(event.target)) ) {
                button.classList.remove('active');
                
                if(sliderBox){
                    sliderBox.classList.remove('active');
                }
            }
        });
    });
});

//Zoom functionality

document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('image-display');
    let scale = 1;
    const scaleStep = 0.1; // Amount of zoom per scroll step
    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Apply zoom effect
    function applyZoom() {
        image.style.transform = `scale(${scale})`;
    }

    // Event listener for zoom
    image.addEventListener('wheel', function(event) {
        event.preventDefault();

        if (event.deltaY < 0) {
            scale += scaleStep; // Zoom in
        } else {
            scale = Math.max(1, scale - scaleStep); // Zoom out
        }

        applyZoom();
    });

    // Event listener for mousedown (start dragging)
    image.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialX = image.offsetLeft;
        initialY = image.offsetTop;
        image.style.cursor = 'grabbing'; // Change cursor to grabbing
    });

    // Event listener for mousemove (dragging)
    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;
            image.style.left = `${initialX + deltaX}px`;
            image.style.top = `${initialY + deltaY}px`;
        }
    });

    // Event listener for mouseup (end dragging)
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            image.style.cursor = 'grab'; // Change cursor back to grab
        }
    });
});


//editor functionalities

// Load the image dynamically
document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('image-display');
    const urlParams = new URLSearchParams(window.location.search);
    
    const imageData = urlParams.get('image');
    if (imageData) {
        img.src = decodeURIComponent(imageData);
    } else {
        alert("No image data found!");
    }
    // Sliders for filters
    const brightnessSlider = document.getElementById("brightnessSlider");
    const contrastSlider = document.getElementById("contrastSlider");
    const highlightSlider = document.getElementById("highlightSlider");
    const shadowSlider = document.getElementById("shadowSlider");
    const saturationSlider = document.getElementById("saturationSlider");
    const sepiaSlider = document.getElementById("sepiaSlider");
    const hueSlider = document.getElementById("hueSlider");
    const blurSlider = document.getElementById("blurSlider");

    

    // Apply filters
    function applyFilter() {
        const shadowBrightness = (shadowSlider.value-100)*-0.2 + 100;
        const shadowContrast = (shadowSlider.value-100)*0.5 + 100;

        const highlightBrightness = (highlightSlider.value-100)*0.4 + 100;
        const highlightContrast = (highlightSlider.value-100)*0.2 + 100;

        const filterStr = `
            brightness(${brightnessSlider.value}%)
            contrast(${contrastSlider.value}%)
            saturate(${saturationSlider.value}%)
            sepia(${sepiaSlider.value}%)
            hue-rotate(${hueSlider.value}deg)
            blur(${blurSlider.value}px)
            brightness(${parseFloat(brightnessSlider.value)-100+ parseFloat(highlightBrightness)}%)
            contrast(${parseFloat(contrastSlider.value)-100+ parseFloat(highlightContrast)}%)
            brightness(${parseFloat(brightnessSlider.value)-100 + parseFloat(shadowBrightness)}%)
            contrast(${parseFloat(contrastSlider.value)-100 + parseFloat(shadowContrast)}%)
        `;
        img.style.filter = filterStr;
    }

    // Event listeners for each slider
    [brightnessSlider, contrastSlider, highlightSlider, shadowSlider, saturationSlider, hueSlider, sepiaSlider, blurSlider].forEach(slider => {
        slider.addEventListener('input', applyFilter);
    });
});

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('image-display');

    // Create a slider for sharpening (if not already created)
    const sharpenSlider = document.getElementById("sharpenSlider");

    // Event listener for sharpen slider
    sharpenSlider.addEventListener('input', function() {
        const sharpenValue = sharpenSlider.value; // Get the slider value from 0 to 100
        applySharpenFilter(sharpenValue);
    });

    // Function to apply the sharpen filter
    function applySharpenFilter(intensity) {
        // Scale intensity from 0 to 1
        const sharpenIntensity = intensity / 100;

        // Adjust the convolution matrix dynamically based on the intensity
        const kernelMatrix = [
            0, -sharpenIntensity, 0,
            -sharpenIntensity, 1 + 4 * sharpenIntensity, -sharpenIntensity,
            0, -sharpenIntensity, 0
        ].join(' ');

        // Get the SVG filter and update the kernel matrix
        const sharpenFilter = document.querySelector('#sharpen feConvolveMatrix');
        sharpenFilter.setAttribute('kernelMatrix', kernelMatrix);

        // Apply the SVG filter to the image element
        img.style.filter = 'url(#sharpen)';
    }

    // Initialize with slider value (if slider has default value)
    applySharpenFilter(sharpenSlider.value);
});

