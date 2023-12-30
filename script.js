const fetchData = async () => {
    try {
        const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
        if (response.status === 200) {
            const parsedData = await response.json();
            const data = parsedData.product;
            const images = data.images;
            const options = data.options;

            // Update images in the leftDiv
            const imagesList = document.getElementById("imgList");
            images.forEach((img) => {
                const imageItem = document.createElement('li');
                imageItem.innerHTML = (`
                    <img src="${img.src}" class="smallerImg" alt="Product">
                `);
                imagesList.appendChild(imageItem);
            });

            // Update text data and options in the rightDiv
            const productDetailsDiv = document.getElementById("productDetails");
            productDetailsDiv.innerHTML = `
                <p>${data.vendor}</p>
                <h1>${data.title}</h1>
                <p>Price: ${data.price}</p>
                <strike>Compare at Price: ${data.compare_at_price}</strike>

                <div id="colorOptions" class="colorOptionsContainer">
                    <h3>Color Options:</h3>
                    <ul class="colorOptionsList">${renderOptions(options.find(option => option.name === 'Color').values)}</ul>
                </div>
                
                <div id="sizeOptions" class="sizeOptionsContainer">
                    <h3>Size Options:</h3>
                    <ul>${renderOptions(options.find(option => option.name === 'Size').values)}</ul>
                </div>
                
                <p>${data.description}</p>
                <p>Product Type: ${data.product_type}</p>
            `;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Helper function to render options
const renderOptions = (options) => {
    return options.map(option => {
        const optionName = Object.keys(option)[0];
        const optionValue = option[optionName];

        return `
            <li class="colorBox">
                <div style="background-color: ${optionValue};" class="colorBoxInner">${optionName}</div>
            </li>
        `;
    }).join('');
};

window.onload = fetchData;
