import {
	getUserData
} from './data.js'; // Import the getUserData function from data.js
// Array to store winners
let winnersList = [];
// Function to handle the draw
function performDraw() {
	const winnerDisplay = document.getElementById('winner');
	const winnersDisplay = document.getElementById('winnersList'); // Element to display winners
	const tickets = getUserData(); // Retrieve tickets using the imported function
	try {
		if (tickets.length > 0) {
			for (let i = 0; i < 3; i++) {
				setTimeout(() => {
					const randomIndex = Math.floor(Math.random() * tickets.length);
					const winner = tickets[randomIndex];
					// Play the sound effect when a winner is selected
					const audio = new Audio('success-fanfare-trumpets-6185.mp3');
					audio.play();
					// Add the winner to the list of winners
					winnersList.push(winner);
					// Display the winner's name
					winnerDisplay.innerText = `${winner.name}`;
					// Create an img element
					const imgElement = document.createElement('img');
					// Change the image source based on the winner number
					switch (i + 1) {
						case 1:
							imgElement.src = 'imgs/winner1.png';
							break;
						case 2:
							imgElement.src = 'imgs/winner2.png';
							break;
						case 3:
							imgElement.src = 'imgs/winner3.png';
							break;
						default:
							break;
					}
					// Handle error if the image fails to load
					imgElement.onerror = function() {
						console.error(`Error loading image for winner ${winner.name}`);
						imgElement.src = 'ph-pro.png'; // Set a placeholder image
					};
					// Append the img element to the container in the HTML document
					const container = document.getElementById('image-container');
					container.appendChild(imgElement);
					// Show the image after selecting the winner
					imgElement.style.display = 'block';
					// Slide the images to the left
					const images = container.getElementsByTagName('img');
					for (let j = 0; j < images.length; j++) {
						images[j].style.animation = 'slideLeft 0.5s ease-in-out';
					}
					setTimeout(() => {
						// Reset the animation for the next slide
						for (let j = 0; j < images.length; j++) {
							images[j].style.animation = '';
						}
					}, 500); // Adjust this timeout to match the animation duration
					// Display the list of winners
					displayWinners(winnersList, winnersDisplay);
				}, i * 8000); // Display each winner after 8 seconds (5 seconds + 3 seconds)
			}
		} else {
			winnerDisplay.innerText = "No tickets to draw from.";
		}
	} catch (error) {
		// If an error occurs during the draw operation, display an alert
		alert("An error occurred while performing the draw. Please try again.");
		console.error("Error:", error); // Log the error to the console for debugging
	}
}
// Event listener for the Draw button
document.getElementById('draw').addEventListener('click', performDraw);