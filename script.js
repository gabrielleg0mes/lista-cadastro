function createPerson(nome, dataNascimento, telefone, email) {
    console.log('createPerson function called');
    return {
        nome,
        dataNascimento,
        telefone,
        email
    };
}

function saveToLocalStorage(personList) {
    console.log('saveToLocalStorage function called');
    localStorage.setItem('personList', JSON.stringify(personList));
}

function loadFromLocalStorage() {
    console.log('loadFromLocalStorage function called');
    const personList = localStorage.getItem('personList');
    return personList ? JSON.parse(personList) : [];
}

function renderPersonList(personList, filter = '') {
    console.log('renderPersonList function called');
    const listaPessoas = document.getElementById('listaPessoas');
    listaPessoas.innerHTML = '';

    const filteredList = personList.filter(person => person.nome.toLowerCase().includes(filter.toLowerCase()));

    filteredList.forEach((person, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${person.nome} - ${person.dataNascimento} - ${person.telefone} - ${person.email} `;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            console.log('Edit button clicked for index:', index);
            editPerson(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            console.log('Delete button clicked for index:', index);
            personList.splice(index, 1);
            saveToLocalStorage(personList);
            renderPersonList(personList);
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        listaPessoas.appendChild(li);
    });
}

function editPerson(index) {
    console.log('editPerson function called for index:', index);
    const personList = loadFromLocalStorage();
    const person = personList[index];

    document.getElementById('nome').value = person.nome;
    document.getElementById('dataNascimento').value = person.dataNascimento;
    document.getElementById('telefone').value = person.telefone;
    document.getElementById('email').value = person.email;

    document.getElementById('cadastrarButton').style.display = 'none';
    const saveButton = document.getElementById('saveButton');
    saveButton.style.display = 'inline';

    saveButton.onclick = function(event) {
        event.preventDefault();

        person.nome = document.getElementById('nome').value;
        person.dataNascimento = document.getElementById('dataNascimento').value;
        person.telefone = document.getElementById('telefone').value;
        person.email = document.getElementById('email').value;

        personList[index] = person;
        saveToLocalStorage(personList);
        renderPersonList(personList);

        document.getElementById('cadastrarButton').style.display = 'inline';
        saveButton.style.display = 'none';
        saveButton.onclick = null;
        document.getElementById('cadastroForm').reset();
    };
}

function addPerson(event) {
    console.log('addPerson function called');
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const person = createPerson(nome, dataNascimento, telefone, email);
    const personList = loadFromLocalStorage();
    personList.push(person);
    saveToLocalStorage(personList);
    renderPersonList(personList);

    document.getElementById('cadastroForm').reset();
}

document.getElementById('cadastroForm').addEventListener('submit', addPerson);

document.getElementById('searchInput').addEventListener('input', function() {
    console.log('searchInput input changed');
    const personList = loadFromLocalStorage();
    renderPersonList(personList, this.value);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const personList = loadFromLocalStorage();
    renderPersonList(personList);
});
