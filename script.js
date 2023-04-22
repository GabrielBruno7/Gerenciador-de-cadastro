
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}





const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));


const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}


//Interação com layout

const isValidFields = () => {
 return document.getElementById('form').reportValidity()

}

const clearFields =  () => {
   const fields = document.querySelectorAll(".modal-field")
   fields.forEach(fields => fields.value = "")

}



const saveClient = () => {
    if (isValidFields()){
        const client = {
            os: document.getElementById("os_value").value,
            nome: document.getElementById("nome_value").value,
            pcNotebook: document.getElementById("pcNotebook_value").value,
            descriçao: document.getElementById("descriçao_value").value,
            statuss: document.getElementById("status_value").value,
        }
        createClient(client)
        updateTable()
        closeModal()
       
    }
}

const createRow = (client) => {
   const newRow = document.createElement('tr')
newRow.innerHTML = `
        <td>${client.os}</td>
        <td>${client.nome}</td>
        <td>${client.pcNotebook}</td>
        <td>${client.descriçao}</td>
        <td>${client.statuss}</td>
        <td class="btn_crud">
            <button type="button" class="button_green">EDITAR</button>
            <button type="button" class="button_red">EXCLUIR</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () =>{
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()




//Eventos


document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('btn_salvar')
       .addEventListener('click', saveClient)
       
