function sleep(waitSec, callbackFunc) {
    var spanedSec = 0;
    var id = setInterval(function () {
        spanedSec++;
        if (spanedSec >= waitSec) {
            clearInterval(id);
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
}

function to_result_screen(){
    let init = document.getElementById('init');
    let loading = document.getElementById('loading');
    let result = document.getElementById('result');
    init.classList.add("d-none");
    loading.classList.remove("d-none")
    sleep(3, function(){
        loading.classList.add("d-none");
        result.classList.remove("d-none")  
    })
}

function to_initial_screen(){
    let init = document.getElementById('init');
    let result = document.getElementById('result');
    init.classList.remove("d-none");
    result.classList.add("d-none")
}

let start_button = document.getElementById('start');
start_button.onclick = to_result_screen;

let restart_button = document.getElementById('restart');
restart_button.onclick = to_initial_screen;
