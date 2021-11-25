function updateTime() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    document.getElementById("time").textContent = time;
    if (time === "0:0:0") {
        updateDate();
    }
}

function updateDate() {
    const now = new Date();
    document.getElementById("date")
        .textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

updateTime();
updateDate();
setInterval(updateTime, 1000);
