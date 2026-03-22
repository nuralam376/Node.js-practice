const buttons = document.querySelectorAll("button");

for(let btn of buttons) {
    btn.addEventListener("click" ,() => {
        alert("Button was clicked");
    });
}