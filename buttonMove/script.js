var startbtn = document.getElementById("makeBtn");
startbtn.addEventListener("click", generateBtn);
var moveBtn = document.getElementById("moveBtn");
moveBtn.addEventListener("click", toggleMovement);
var numBtn = 0;
var total = 0;
var isMoving = false;
var animationFrameId = null;

function generateBtn() {
    var color = document.getElementById("colors").value;
    var btn = document.createElement("button");

    btn.innerHTML = Math.floor(Math.random() * 100);
    btn.style.position = "absolute";
    var x_pos = Math.floor(Math.random() * 899) + 180;
    var y_pos = Math.floor(Math.random() * 800) + 280;
    btn.style.left = x_pos + "px";
    btn.style.top = y_pos + "px";
    btn.style.backgroundColor = color;
    btn.style.color = "white";
    btn.className = "btn btn-secondary";
    btn.id = numBtn++;
    btn.style.height = "20px";
    btn.style.width = "30px"

    document.body.appendChild(btn);
    btn.onclick = function() {
        var color = document.getElementById("colors").value;
        console.log(this.id);
        total += parseInt(this.innerHTML);
        document.getElementById("total").innerHTML = `<br>Running Total: ${total}`
        btn.style.backgroundColor = color;
        if (color == "white" || color == "yellow") {
            btn.style.color = "black";
        } else {
            btn.style.color = "white";
        }
    }
}

// Toggle start/stop of animation
function toggleMovement() {
    isMoving = !isMoving;

    // If movement is stopped, cancel the animation
    if (!isMoving && animationFrameId) {
        document.getElementById("moveBtn").innerText = "MOVE"
        cancelAnimationFrame(animationFrameId);
    } else if (isMoving) {
        document.getElementById("moveBtn").innerText = "PAUSE"
        move(); // Restart the animation if it's moving
    }
}

function move() {
    let speed = 2;
    let direction = 1; // 1 means moving right, -1 means moving left

    function animate() {
        let buttons = document.querySelectorAll("button"); // Get all buttons

        buttons.forEach((button) => {
            let positionX = parseFloat(button.style.left) || 0;
            const maxX = window.innerWidth - button.offsetWidth; // Right boundary
            const minX = 0; // Left boundary

            // If hitting the right edge, move left
            if (positionX >= maxX) {
                direction = -1; // Reverse direction to left
            }
            // If hitting the left edge, move right
            else if (positionX <= minX) {
                direction = 1; // Reverse direction to right
            }

            positionX += speed * direction; // Move based on direction
            button.style.left = `${positionX}px`;
        });

        // Continue the animation if the flag is true
        if (isMoving) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    animationFrameId = requestAnimationFrame(animate);
}