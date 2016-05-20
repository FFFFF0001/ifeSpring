/**
 *
 * Created by Administrator on 2016/5/20.
 */
define(['jquery'], function ($) {
    var wrap = $("#question-list"),
        addBtn = $(".question-kind");
    function nextIndex() {
        return wrap.find('.each-question-wrap').length+1;
    }
    function currentIndex() {
        return wrap.find('.each-question-wrap').length;
    }
    function ltTen() {
        if(wrap.find('.each-question-wrap').length>=10) {
            return false;
        }else{
            return true;
        }
    }
    var obj  = {
        addSingle:function () {
            $(document).on("click",".add-dan",function () {
                if(ltTen()) {
                    addBtn.before("<div class='each-question-wrap'>" +
                        "<p class='q-top'>Q"+nextIndex()+" 单选题</p>" +
                        "<p class='each-option-single'><span class='xx-ct'>选项一</span><i class='cha'>x</i></p>" +
                        "<p class='each-option-single'><span class='xx-ct'>选项二</span><i class='cha'>x</i></p>" +
                        "<p class='each-option-single'><span class='xx-ct'>选项三</span><i class='cha'>x</i></p>" +
                        "<p id='add-question-op'>+</p>"+
                        "<span class='bottom-handler' style='display: none;'>" +
                        "<span class='up btn'>上移</span>" +
                        "<span class='down btn'>下移</span>" +
                        "<span class='repeat btn'>复用</span>" +
                        "<span class='delete btn'>删除</span>" +
                        "</span>" +
                        "</div>");
                }

            });
            },
        addMultiple:function () {
            $(document).on("click",".add-duo",function () {
                if(ltTen()) {
                    addBtn.before("<div class='each-question-wrap'>" +
                        "<p class='q-top'>Q"+nextIndex()+" 多选题</p>" +
                        "<p class='each-option-multiple'><span class='xx-ct'>选项一</span><i class='cha'>x</i></p>" +
                        "<p class='each-option-multiple'><span class='xx-ct'>选项二</span><i class='cha'>x</i></p>" +
                        "<p class='each-option-multiple'><span class='xx-ct'>选项三</span><i class='cha'>x</i></p>" +
                        "<p id='add-question-op'>+</p>"+
                        "<span class='bottom-handler' style='display: none;'>" +
                        "<span class='up btn'>上移</span>" +
                        "<span class='down btn'>下移</span>" +
                        "<span class='repeat btn'>复用</span>" +
                        "<span class='delete btn'>删除</span>" +
                        "</span>" +
                        "</div>");
                }

            });
        },
        addText:function () {
            $(document).on("click",".add-textrea",function () {
                if(ltTen()) {
                    addBtn.before("<div class='each-question-wrap'>" +
                        "<p class='q-top'>Q"+nextIndex()+" 文本题</p>" +
                        "<textarea class='text-input' name=' id=' cols='70' rows='6'></textarea>" +
                        "<span class='bottom-handler' style='display: none;'>" +
                        "<span class='up btn'>上移</span>" +
                        "<span class='down btn'>下移</span>" +
                        "<span class='repeat btn'>复用</span>" +
                        "<span class='delete btn'>删除</span>" +
                        "</span>" +
                        "</div>");
                }

            });
        },
        Up:function () {
            $(document).on("click", '.up', function () {
                if (currentIndex() != 1) {
                    var p = $(this).parents(".each-question-wrap"),
                        p_content = "<div class='each-question-wrap'>" + p.html() + '</div>',
                        curInd = p.index();
                    p.remove();
                    $(".each-question-wrap").eq(curInd - 1).before(p_content);
                }
            });
        },
        Down:function () {
            $(document).on("click", '.down', function () {
                if (currentIndex() != 1) {
                    var p = $(this).parents(".each-question-wrap"),
                        p_content = "<div class='each-question-wrap'>" + p.html() + '</div>',
                        curInd = p.index();
                    p.remove();
                    $(".each-question-wrap").eq(curInd - 1).after(p_content);
                }
            });
        },
        Repeat:function () {
            $(document).on("click", '.repeat', function () {

                    var p = $(this).parents(".each-question-wrap"),
                        p_content = "<div class='each-question-wrap'>" + p.html() + '</div>',
                        curInd = p.index();

                    $(".each-question-wrap").eq(curInd).after(p_content);

            });
        },
        delete:function () {
            $(document).on("click", '.delete', function () {

                var p = $(this).parents(".each-question-wrap");
                p.remove();
            });
        }
    }
    
    return obj;
});
