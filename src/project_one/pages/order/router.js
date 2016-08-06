
module.exports = function(router){
    router.map({
        '/': {
            component: function (resolve) {
                require(['./components/index.vue'],resolve)
            }
        },
    })
    
}