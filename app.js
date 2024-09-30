// Select the dropbox and the preview image element
const dropbox = document.getElementById('dropbox');
const previewImage = document.getElementById('preview');

// Prevent default behavior for drag-and-drop events
dropbox.addEventListener('dragover', (event) => {
    event.preventDefault(); // Prevent the browser from opening the image
    dropbox.classList.add('dragover_class'); // Optional: Add visual feedback
});

dropbox.addEventListener('dragleave', () => {
    dropbox.classList.remove('dragover_class'); // Remove visual feedback
});

// Handle the drop event
dropbox.addEventListener('drop', (event) => {
    event.preventDefault();
    dropbox.classList.remove('dragover_class');
    
    const files = event.dataTransfer.files;

    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            // Redirect to a new page and pass the image data as a URL parameter
            const imageData = encodeURIComponent(e.target.result); // Encode the data URL
            window.location.href = `Editor2.html?image=${imageData}`;
        };

        reader.readAsDataURL(file); // Read the image as a Data URL
    } else {
        alert('Please drop a valid image file!');
    }
});

