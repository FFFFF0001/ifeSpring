/**
 * Created by 海枯 on 2016/6/25.
 */
angular.module('xmApp', [])
    .controller('indexCtrl', function ($scope) {
        //伪造预约json，填充数据
        $scope.someGoods = [
            {
                GoodsId: 1,
                GoodsPicUrl: './img/thing1.png',
                GoodsTitle: ['我已亭亭，无忧亦无惧'],
                GoodsDesc: '三亚 1day',
                GoodsPrice: '1,690',
                CreaterHeadIcon: './img/headicon1.png',
                CreaterUsername: '奇妙能力许小姐',
                CreaterLevel: '高级会员',
                CreaterYears: '8年'
            },
            {
                GoodsId: 2,
                GoodsPicUrl: './img/thing2.png',
                GoodsTitle: ['多谢你如此精彩绕眼','做我平淡岁月里星辰'],
                GoodsDesc: '三亚 2day',
                GoodsPrice: '2,860',
                CreaterHeadIcon: './img/headicon2.png',
                CreaterUsername: '乌君',
                CreaterLevel: '人气之星',
                CreaterYears: '3年'
            },
            {
                GoodsId: 3,
                GoodsPicUrl: './img/thing3.png',
                GoodsTitle: ['想要你的吻 做你爱的人'],
                GoodsDesc: '三亚 1day',
                GoodsPrice: '1,260',
                CreaterHeadIcon: './img/headicon1.png',
                CreaterUsername: '小偕婉株',
                CreaterLevel: '高级会员',
                CreaterYears: '5年'
            }
        ];

    });