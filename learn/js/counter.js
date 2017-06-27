
require.config({
    baseUrl:'js',
    paths:{
        'math':'math'
    }
});

define(['math'],function (math) {
    var start = 0;
    var countOne = function () {
        return math.add(start,1);
    }
    return {
        countOne:countOne
    }
});