const Mural = (function (_render, Filtro) {
    "use strict"

    function getCartoes() {
        return (JSON.parse(localStorage.getItem(usuario)) || [])
            .map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo));
    }

    let cartoes = getCartoes();

    cartoes.forEach(cartao => {
        preparaCartao(cartao);
    })

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    function preparaCartao(cartao) {
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", () => {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes()
            render()
        })
    }

    Filtro.on("filtrado", render)

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))
        ))
    }

    login.on("login", () => {
        cartoes = getCartoes()
        render()
    })

    login.on("logout", () => {
        cartoes = []
        render()
    })

    function adiciona(cartao) {
        if (logado) {
            cartoes.push(cartao)
            salvaCartoes()
            preparaCartao(cartao)
            render()
            return true
        } else {
            alert("Você não está logado!")
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
