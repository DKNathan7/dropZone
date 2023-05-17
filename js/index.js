const dropArea = document.querySelector(".divIzquierda");
const dragText = dropArea.querySelector("h2")
const button = dropArea.querySelector(".seleccionaArchivos");
const input = dropArea.querySelector("#input-file");

button.addEventListener('click', (e) => {
    //console.log('click');
    input.click();
});

input.addEventListener('change', (e) => {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

/*Elemenos que arrastre, se activa ésto: */
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

/*Elemenos que arrastre, pero aún no esté dentro de la zona: */
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta archivos";
});

/*Elemenos suelte dentro de la zona: */
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Tu archivo se ha subido";
});

function showFiles(files){
    if(files.length === undefined){
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}

function processFile(file){
    const docType = file.type; //tipo de archivos
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"]; //Extensiones permitidas en mi área
    
    if(validExtensions.includes(docType)){
        // Archivo válido
        
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;
        fileReader.addEventListener('load', (e) =>{
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="50">
                    <div>
                        <span>${file.name}</span>
                        <span class="status-text">
                            Loading...
                        </span>
                    </div>
                </div>
            `;
            const html = document.querySelector("#preview").innerHTML;
            document.querySelector('#preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    }else{
        // No es un archivo válido
        alert("No es un archivo válido");
    }
}

function uploadFile(file){
    
}
