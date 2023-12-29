// Create a stylized rocket button
const rocketButton = document.createElement('button');
rocketButton.style.backgroundColor = 'red';
rocketButton.style.width = '100px';
rocketButton.style.height = '50px';
rocketButton.style.border = 'none';
rocketButton.style.borderRadius = '5px';
rocketButton.style.color = 'white';
rocketButton.style.fontWeight = 'bold';
rocketButton.textContent = 'Rocket';

// Create an image element for the rocket
const rocketImage = document.createElement('img');
rocketImage.src = 'daone.png';
rocketImage.style.position = 'absolute';
rocketImage.style.display = 'none';

// Create a shut down button
const shutDownButton = document.createElement('button');
shutDownButton.style.backgroundColor = 'blue';
shutDownButton.style.width = '100px';
shutDownButton.style.height = '50px';
shutDownButton.style.border = 'none';
shutDownButton.style.borderRadius = '5px';
shutDownButton.style.color = 'white';
shutDownButton.style.fontWeight = 'bold';
shutDownButton.textContent = 'Shut Down';

// Add event listener to the shut down button
let shutDownButtonActive = false;
shutDownButton.addEventListener('click', toggleShutDownButton);
// Function to toggle the shut down button
function toggleShutDownButton() {
    shutDownButtonActive = !shutDownButtonActive;
    if (shutDownButtonActive) {
        shutDownButton.style.backgroundColor = 'grey';
        document.body.style.backgroundColor = ''; // Change the background color to grey
        document.body.style.backgroundImage = "url(images/pop.gif)"; // Change the background URL
    } else {
        shutDownButton.style.backgroundColor = 'blue';
        document.body.style.backgroundColor = ''; // Reset the background color
        document.body.style.backgroundImage = ''; // Reset the background URL
    }
}

// Append the shut down button to the document
document.body.appendChild(shutDownButton);

// Create an array to store projectile images
const projectiles = [];

// Variable to track if the rocket is out
let rocketOut = false;

// Add event listener to the rocket button
rocketButton.addEventListener('click', toggleRocket);

// Function to toggle the rocket and projectiles
function toggleRocket() {
    if (rocketOut) {
        // Hide the rocket image
        rocketImage.style.display = 'none';

        // Clear all projectile images
        projectiles.forEach((projectile) => {
            projectile.remove();
        });
        projectiles.length = 0;
    } else {
        // Show the rocket image
        rocketImage.style.display = 'block';
    }

    // Toggle the rocketOut variable
    rocketOut = !rocketOut;
}

// Add event listener to the rocket button
rocketButton.addEventListener('click', toggleRocket);

// Add event listener to the document to track mouse movement
document.addEventListener('mousemove', (event) => {
    if (rocketOut) {
        // Update the position of the rocket image to follow the mouse
        rocketImage.style.left = event.clientX + 'px';
        rocketImage.style.top = event.clientY + 'px';
    }
});

// Append the rocket button and rocket image to the document
document.body.appendChild(rocketButton);
document.body.appendChild(rocketImage);

// Add event listener to the document to track mouse click
document.addEventListener('click', (event) => {
    if (rocketOut && !shutDownButtonActive) {
        // Check if the click target is a button
        if (event.target === rocketButton || event.target === shutDownButton) {
            return; // Do not create projectile if the click target is a button
        }

        // Create a projectile image
        const projectileImage = document.createElement('img');
        projectileImage.src = 'anything.png';
        projectileImage.style.position = 'absolute';
        projectileImage.style.left = event.clientX + 'px';
        projectileImage.style.top = event.clientY + 'px';

        // Check if the projectile overlaps with the buttons
        const rocketButtonRect = rocketButton.getBoundingClientRect();
        const shutDownButtonRect = shutDownButton.getBoundingClientRect();
        const projectileRect = projectileImage.getBoundingClientRect();

        if (
            projectileRect.left < rocketButtonRect.right &&
            projectileRect.right > rocketButtonRect.left &&
            projectileRect.top < rocketButtonRect.bottom &&
            projectileRect.bottom > rocketButtonRect.top
        ) {
            return; // Do not create projectile if it overlaps with the rocket button
        }

        if (
            projectileRect.left < shutDownButtonRect.right &&
            projectileRect.right > shutDownButtonRect.left &&
            projectileRect.top < shutDownButtonRect.bottom &&
            projectileRect.bottom > shutDownButtonRect.top
        ) {
            return; // Do not create projectile if it overlaps with the shut down button
        }

        // Append the projectile image to the document
        document.body.appendChild(projectileImage);

        // Add the projectile image to the projectiles array
        projectiles.push(projectileImage);
    }
});
