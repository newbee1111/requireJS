
require.config({
    baseUrl:'js',
    path:{
        "counter":"counter"
    }
});

require(['counter'],function (counter) {
    alert(counter.countOne());
});