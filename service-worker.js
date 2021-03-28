self.addEventListener("fetch", function (){
    let pedido = event.request;
    let promiseResposta = caches.open("ceep-imagens")
        .then(cache => { return cache.match(pedido)})
        .then(respostaCache => {
            let resposta = respostaCache ? respostaCache : fetch(pedido)
            return resposta
        })
    event.respondWith(promiseResposta)
})
