

//canvas code to make the  image while scrolling

const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 148;
/* I used their images not to make the website assets huge and not easy to find images that can fit as frames */

const currentFrame = (index) =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
        .toString()
        .padStart(4, "0")}.jpg`;

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1158;
canvas.height = 770;
img.onload = function () {
    context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
};

const updateScale = (scaled) => {
    if (scaled) {
        canvas.classList.add("scaled");
    } else {
        canvas.classList.remove("scaled");
    }
};

const updateMatrix = (matrix) => {
    if (matrix) {
        canvas.classList.add("matrix");
    } else {
        canvas.classList.remove("matrix");
    }
};

window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        updateImage(frameIndex + 1);
        updateScale(scrollFraction > 0.75);
        updateMatrix(scrollFraction > .4); 
    });
});

preloadImages();












/////////////here the code for the third section to make the image and text fade in-out while scrolling
const image = document.getElementById("image");
const leftText = document.querySelector(".left-text");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const threshold = 250;

    if (scrollY < threshold) {
        // Scrolling up
        const brightness = 1 - scrollY / threshold;
        image.style.filter = `brightness(${brightness})`;
        image.style.transform = `matrix(${brightness}, 0, 0, ${brightness}, 0, 0)`;

        //  left text brightness
        leftText.style.filter = `brightness(${brightness})`;
    } else {
        // Scrolling down
        const brightness = (scrollY - threshold) / 300;
        image.style.filter = `brightness(${brightness})`;
        image.style.transform = `matrix(${brightness}, 0, 0, ${brightness}, 0, 0)`;

        // here  I Set left text brightness to 0 when scrolling to the mid
        if (scrollY >= threshold + 60) { 
            leftText.style.filter = "brightness(0)";
        } else {
            leftText.style.filter = "brightness(1)";
        }
    }
});
