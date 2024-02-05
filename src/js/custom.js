const stickCursor = document.getElementById('stickCursor');
const cursorHands = document.querySelector('.cursor-hands');
const cursorHandsLeft = document.querySelector('.stick-left-hand');
const cursorHandsRight = document.querySelector('.stick-right-hand');

const cursorRightLeg = document.querySelector('.stick-right-leg');
const cursorLeftLeg = document.querySelector('.stick-left-leg');

let lastX = 0;
let lastY = 0;
let isMoving = false;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const deltaX = x - lastX;
    const deltaY = y - lastY;

    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        isMoving = true;
    } else {
        isMoving = false;
    }

    stickCursor.style.transition = isMoving ? 'transform 0.3s ease-out' : 'transform 0.5s ease-out';
    stickCursor.style.transform = `translate(${x}px, ${y}px)`;

    const angles = {
        'up': {
            angle: 100,
            topPosition: 6
        },
        'down': {
            angle: -20,
            topPosition: 15
        },
        'left': {
            angle: 0,
            topPosition: 11.5
        },
        'right': {
            angle: 60,
            topPosition: 10.5
        }
    };

    const moveTo = calculateDirection(deltaX, deltaY);

    const angleInfo = angles[moveTo];
    if (angleInfo) {
        const angle = angleInfo.angle;
        const topPos = angleInfo.topPosition;

        cursorHandsLeft.style.transform = `rotate(${45 + angle}deg)`;
        cursorHandsLeft.style.top = `${topPos}px`;
        cursorHandsRight.style.transform = `rotate(${-45 - angle}deg)`;
        cursorHandsRight.style.top = `${topPos}px`;

        if (moveTo === 'left') {
            animateCursor(cursorHandsLeft, angle);
            cursorRightLeg.style.top = `${25}px`;
            cursorLeftLeg.style.transform = `rotate(${-40}deg)`;
            cursorRightLeg.style.transform = `rotate(${20}deg)`;
        } else if (moveTo === 'right') {
            cursorLeftLeg.style.transform = `rotate(${-10}deg)`;
            cursorLeftLeg.style.top = `${25}px`;
            cursorRightLeg.style.transform = `rotate(${40}deg)`;
        } else {
            animateCursor(cursorHandsRight, angle);
            cursorRightLeg.style.top = `${23}px`;
            cursorLeftLeg.style.top = `${23}px`;
            cursorLeftLeg.style.transform = `rotate(${-40}deg)`;
            cursorRightLeg.style.transform = `rotate(${40}deg)`;
        }
    }

    lastX = x;
    lastY = y;
});

function calculateDirection(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'left' : 'right';
    } else {
        return deltaY < 0 ? 'up' : 'down';
    }
}

function animateCursor(element, ang) {
    if (!isMoving) {
        element.style.transform = `rotate(${ang + 10 * Math.sin(Date.now() / 100)}deg)`;
    } else {
        element.style.transform = `rotate(${ang - 45}deg)`;
        stickCursor.classList.add('click-animation');
        setTimeout(() => {
            element.style.transform = `rotate(${ang + 45}deg)`;
            stickCursor.classList.remove('click-animation');
        }, 300);
    }
}



// Rest of the code remains unchanged
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const customCursor = document.querySelector(".custom-cursor");

    navbar.addEventListener("mouseenter", function () {
        customCursor.classList.add("show-cursor");
    });

    navbar.addEventListener("mouseleave", function () {
        customCursor.classList.remove("show-cursor");
    });

    document.addEventListener("mousemove", function (e) {
        const { clientX: mouseX, clientY: mouseY } = e;

        // Check if the mouse is inside the navbar
        const isMouseInsideNavbar = (mouseX >= navbar.offsetLeft &&
            mouseX <= navbar.offsetLeft + navbar.offsetWidth &&
            mouseY >= navbar.offsetTop &&
            mouseY <= navbar.offsetTop + navbar.offsetHeight);

        if (isMouseInsideNavbar) {
            customCursor.classList.add("show-cursor");
        } else {
            customCursor.classList.remove("show-cursor");
            customCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }

        const cursors = document.querySelectorAll('.stick-cursor-parts');

        // Get the background color of the element under the cursor
        const bgColor = getBackgroundColorUnderCursor(mouseX, mouseY);

        // Loop through each cursor element and set the backgroundColor
        cursors.forEach(cursor => {
            cursor.style.backgroundColor = invertColor(bgColor);
        });
        const curHead = document.querySelector('.cursor-head');
        curHead.style.border = `2px solid ${invertColor(bgColor)}`;

    });

});



function getBackgroundColorUnderCursor(x, y) {
    const element = document.elementFromPoint(x, y);
    const bgColor = window.getComputedStyle(element).backgroundColor;
    return bgColor;
}

function invertColor(hexColor) {
    // Convert hex to RGB
    const spliedArr = hexColor.split('(');
    const nums = spliedArr[1].split(',');

    if (nums.length > 3) {
        const r = parseFloat(nums[0], 16);
        const g = parseFloat(nums[1].trim(), 16); // Trim leading spaces
        const b = parseFloat(nums[2].trim(), 16); // Trim leading spaces

        // Extracting alpha value (consider adjusting based on actual input format)
        const alphaPart = nums[3].split(')');
        const a = parseFloat(alphaPart[0].trim()); // Trim leading spaces

        // Invert RGB values
        const invertedR = 255 - r;
        const invertedG = 255 - g;
        const invertedB = 255 - b;

        // Keep alpha as is or adjust as needed
        const invertedA = a;

        // Convert RGB back to hex
        const invertedHex = rgbaToHex(invertedR, invertedG, invertedB, invertedA);

        return invertedHex;



    } else {
        const r = parseFloat(nums[0], 16);
        const g = parseFloat(nums[1], 16);
        const lstArr = nums[2].split(')')
        const b = parseFloat(lstArr[0], 16);
        // Invert RGB values
        const invertedR = 255 - r;
        const invertedG = 255 - g;
        const invertedB = 255 - b;

        const invertedHex = rgbToHex(invertedR, invertedG, invertedB);

        // const invertedHex = `#${invertedR.toString(16).padStart(2, '0')}${invertedG.toString(16).padStart(2, '0')}${invertedB.toString(16).padStart(2, '0')}`;
        // Convert RGB back to hex

        return invertedHex;
    }



}

function rgbToHex(r, g, b) {
    const toHex = (channel) => {
        const hex = channel.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
}

function rgbaToHex(r, g, b, a) {
    const toHex = (channel) => {
        const hex = Math.round(channel * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b) + toHex(a);
}

