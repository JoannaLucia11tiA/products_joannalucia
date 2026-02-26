const API_URL = '/api/produtos'

const categoryEmojis = {
    'Eletrônicos': '💻',
    'Móveis': '🛋️',
    'Roupas': '👕',
    'Alimentos': '🍔',
    'Outros': '✨'
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

document.addEventListener('DOMContentLoaded', loadProdutos)

async function loadProdutos() {
    const loading = document.getElementById('loading')
    const errorMessage = document.getElementById('error-message')
    const emptyState = document.getElementById('empty-state')
    const produtosGrid = document.getElementById('produtos-grid')

    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Falha ao buscar produtos do servidor.')

        const produtos = await response.json()

        loading.classList.add('hidden')

        if (!produtos || produtos.length === 0) {
            emptyState.classList.remove('hidden')
        } else {
            produtosGrid.innerHTML = ''
            produtos.forEach(produto => {
                const card = createProductCard(produto)
                produtosGrid.appendChild(card)
            })
            produtosGrid.classList.remove('hidden')
        }
    } catch (error) {
        console.error(error)
        loading.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
}

function createProductCard(produto) {
    const div = document.createElement('div')
    div.className = 'card'

    const emoji = categoryEmojis[produto.categoria] || '📦'
    const precoFormatado = formatCurrency(produto.preco || 0)

    div.innerHTML = `
        <div class="card-header">
            <span class="emoji">${emoji}</span>
            <span class="badge">${produto.categoria || 'Sem categoria'}</span>
        </div>
        
        <div class="card-body">
            <h3 class="card-title">${produto.nome}</h3>
            <div class="card-price">${precoFormatado}</div>
            <p class="card-desc">${produto.descricao || 'Nenhuma descrição fornecida.'}</p>
        </div>
    `
    return div
}
