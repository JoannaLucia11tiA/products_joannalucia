const API_URL = '/api/produtos'
const formCadastro = document.getElementById('form-cadastro')

formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault()

    const btnSubmit = document.getElementById('btn-submit')
    const btnText = btnSubmit.querySelector('.btn-text')
    const alertMessage = document.getElementById('alert-message')

    const nome = document.getElementById('nome').value
    const preco = document.getElementById('preco').value
    const categoria = document.getElementById('categoria').value
    const descricao = document.getElementById('descricao').value

    btnSubmit.disabled = true
    btnText.innerHTML = '<span class="spinner"></span> Salvando...'
    alertMessage.classList.add('hidden')
    alertMessage.className = 'alert hidden'

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, preco, categoria, descricao })
        })

        const data = await response.json()

        if (response.ok) {
            showAlert('success', '✨ Sucesso! Produto adicionado ao catálogo.')
            formCadastro.reset()
        } else {
            throw new Error(data.error || 'Erro desconhecido')
        }
    } catch (error) {
        showAlert('error', `❌ Ops! Falha ao conectar. Detalhes: ${error.message}`)
    } finally {
        btnSubmit.disabled = false
        btnText.innerHTML = 'Cadastrar Produto'
    }
})

function showAlert(type, text) {
    const alertMessage = document.getElementById('alert-message')
    alertMessage.className = `alert ${type}`
    alertMessage.textContent = text
}
