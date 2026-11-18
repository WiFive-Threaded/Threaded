/*THREADED - solo product page javascript*/

document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailButtons = document.querySelectorAll('.thumbnail-button');
    const colorRadios = document.querySelectorAll('input[name="color"]');
    
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantity');
    const orderButton = document.getElementById('orderButton');
    const orderFeedback = document.getElementById('orderFeedback');

    if (!mainImage) {
        console.error("Error: #mainProductImage element not found!");
        return;
    }

    // function to update active main image and sync thumbnails or swatches
    function updateProductDisplay(imageSrc, altText, selectedColorName) {
        // for the smooth fade effect
        mainImage.style.opacity = '0.4';
        
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
        }, 120);

        // update thumbnail active states
        thumbnailButtons.forEach(btn => {
            const btnImage = btn.getAttribute('data-image');
            if (btnImage === imageSrc || btnImage.trim() === imageSrc.trim()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // update color radio if triggered from thumbnail click
        if (selectedColorName) {
            const matchingRadio = document.querySelector(`input[name="color"][value="${selectedColorName}"]`);
            if (matchingRadio) {
                matchingRadio.checked = true;
            }
        }
    }

    // thumbnail click event listeners
    thumbnailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const img = this.getAttribute('data-image');
            const alt = this.getAttribute('data-alt') || "Product Image";
            
            let colorName = 'White';
            const lowerImg = img.toLowerCase();
            if (lowerImg.includes('black')) colorName = 'Black';
            else if (lowerImg.includes('gray')) colorName = 'Gray';
            else if (lowerImg.includes('beige')) colorName = 'Beige';

            updateProductDisplay(img, alt, colorName);
        });
    });

    // color swatch change event listeners
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                const img = this.getAttribute('data-image');
                const colorValue = this.value;
                const alt = `Don't Be Late Tee in ${colorValue}`;
                updateProductDisplay(img, alt, null);
            }
        });
    });

    // quantity controls
    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) quantityInput.value = currentValue - 1;
        });
    }

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 99) quantityInput.value = currentValue + 1;
        });
    }

    // order Now Action
    if (orderButton && quantityInput && orderFeedback) {
        orderButton.addEventListener('click', function () {
            const selectedColorRadio = document.querySelector('input[name="color"]:checked');
            const selectedSizeRadio = document.querySelector('input[name="size"]:checked');
            
            const selectedColor = selectedColorRadio ? selectedColorRadio.value : 'Default';
            const selectedSize = selectedSizeRadio ? selectedSizeRadio.value : 'S';
            const qty = quantityInput.value;

            orderButton.textContent = "ADDED!";
            orderButton.style.backgroundColor = "var(--product-green)";
            orderFeedback.textContent = `Success! ${qty}x Don't Be Late Tee (${selectedColor}, Size: ${selectedSize}) added to your cart.`;

            setTimeout(() => {
                orderButton.textContent = "ORDER NOW";
                orderButton.style.backgroundColor = "";
            }, 2500);
        });
    }
});