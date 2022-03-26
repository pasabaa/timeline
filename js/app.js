let timeline = document.querySelector('#timeline');
let btnAdd = document.querySelector('#add-item');
let parameters = document.querySelector('.parameters');
let btnModal = document.querySelector('#btn-modal');

let titleTimeline = document.querySelector('#title-timeline');

const btnDownload = document.querySelector('#btn-capture')

btnDownload.addEventListener('click', capture);

var loadFile = function (event) {

    var fileDisplay = document.querySelectorAll('.file-display');

    var selectedFile = event.target.files[0];

    var reader = new FileReader();

    var image = document.querySelectorAll('.output');

    image.forEach(e => {

        e.title = selectedFile.name;

        reader.onload = function (event) {
            e.src = event.target.result;
        };

        fileDisplay.forEach(e => {
            e.classList.add('d-none');
        });

        btnAdd.classList.remove('d-none');

    });

    if (image === undefined || image.length == 0) {
        
        btnAdd.classList.remove('d-none');
    }

    reader.readAsDataURL(selectedFile);

};


btnAdd.addEventListener('click', () => {

    timeline.innerHTML += `
    <div class="item mt-4">
        <div class="delete">
            <div class="image-body">
                <div class="d-flex justify-content-end">
                    <button onclick="deleteItems();" type="button" class="btn-delete btn text-danger fw-bold btn-sm">Eliminar <i class="bi bi-x"></i></button>
                </div>
                <input class="file-display form-control form-control-sm" type="file" onchange="loadFile(event)">
                <img class="output img-fluid p-2 rounded">
                <div contenteditable="true" class="card-text text-center fw-bold h1 year">1453</div>
            </div>
            <div class="line my-4"></div>
            <div class="info p-2">
                <div contenteditable="true" class="fw-bold h4 text-justify title">Termina edad media</div>
                <div contenteditable="true" class="text-justify text">La Edad Media termina con la caída del Imperio Bizantino (o Imperio Romano de Oriente) en 1453.</div>
            </div>
        </div>
    </div>`;

    //Line Color
    let line = document.querySelectorAll('.line');

    let btnChangeColor = document.querySelector('#change-color');

    let lineColor = document.querySelector('#color-line');

    //Year color
    let year = document.querySelectorAll('.year');

    let btnChangeYear = document.querySelector('#change-year');

    let yearColor = document.querySelector('#color-year');

    //Title color
    let title = document.querySelectorAll('.title');

    let btnChangeTitle = document.querySelector('#change-title');

    let titleColor = document.querySelector('#color-title');

    //Text color
    let textBody = document.querySelectorAll('.text');

    let btnChangeText = document.querySelector('#change-text');

    let textColor = document.querySelector('#color-text');


    btnChangeColor.addEventListener('click', () => {

        line.forEach(e => {
            e.style.backgroundColor = lineColor.value;
        });

    });

    btnChangeYear.addEventListener('click', () => {

        year.forEach(e => {
            e.style.color = yearColor.value;
        });

    });

    btnChangeTitle.addEventListener('click', () => {

        title.forEach(e => {
            e.style.color = titleColor.value;
        });

    });

    btnChangeText.addEventListener('click', () => {

        textBody.forEach(e => {
            e.style.color = textColor.value;
        });

    });

    btnDownload.classList.remove('d-none');
    btnModal.classList.remove('d-none');
    btnAdd.classList.add('d-none');

});



function deleteItems() {

    let deleteItem = document.querySelectorAll('.delete');

    var currentImages = deleteItem;
    for (var i = 0; i < currentImages.length; i++) {
        currentImages[i].onclick = function () {
            this.parentNode.remove();
        }
    }
}


function capture() {
    const captureElement = document.querySelector('#capture')
    html2canvas(captureElement)
        .then(canvas => {
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            return canvas
        })
        .then(canvas => {
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            const a = document.createElement('a')
            a.setAttribute('download', `${titleTimeline.textContent} - Línea del tiempo.png`)
            a.setAttribute('href', image)
            a.click()
            canvas.remove()
        })
}


