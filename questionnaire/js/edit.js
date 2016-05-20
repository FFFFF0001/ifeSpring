/**
 *
 * Created by haiku on 2016/5/18.
 */
requirejs.config({
    paths: {
        "jquery": ["http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min"]
    }
});
require(['jquery','editCommon'],function ($,common) {

    var eachWrapper = '.each-question-wrap';
    //点添加问题
    $(".add-btn").bind('click', function () {
        $(".question-kind").fadeIn();
    });
    //点击标题
    $(document).on('click', '.edit-block h3', function () {
        var ct = $(this).html();
        $(this).replaceWith("<input type='text' name='paper_title'" +
            " class='title-input' value=" + ct + " />");
    });
    //失去焦点变为原来的标题
    $(document).on('blur',"[name=paper_title]",function () {
        var ths = $(this);
        var ct = ths.val();
        $(this).replaceWith("<h3>" + ct + "</h3>");
    });
    //上移下移等按钮的显示
    $(document).on('mouseenter', eachWrapper,function () {
        $(this).find('.bottom-handler').stop().fadeIn();
    }).on('mouseleave', eachWrapper,function () {
        $(this).find('.bottom-handler').stop().fadeOut();
    });
    //叉叉
    $(document).on('mouseenter',eachWrapper+' p',function () {
        $(this).find('.cha').fadeIn();
    }).on('mouseleave',eachWrapper+' p',function () {
        $(this).find('.cha').fadeOut();
    });
    //remove cha<p
    $(document).on('click', '.cha', function () {
        var len = $(this).parents('p[class^=each-option]').siblings().length;
        if(len-1==4) {
            $(this).parents('.each-question-wrap')
                .find('.bottom-handler')
                .before("<p id='add-question-op'>+</p>");
        }
        $(this).closest('p').remove();

    });
    //click became input
    $(document).on('click', eachWrapper+' .xx-ct', function () {
        var content = $(this).text();
        $(this).replaceWith("<input type='text' class='option-ip' value='" + content + "'>");
        $(this).find('input').focus();
    });
    //blur bacame font
    $(document).on('blur', '.option-ip', function () {
        var content = $(this).val();
        $(this).replaceWith("<span class='xx-ct'>"+content+"</span>");
    });
    //click add option
    $(document).on('click', '#add-question-op', function () {
        var ths = $(this);
        var len = ths.prevAll('p[class^=each]').length;

        if(ths.prev().hasClass('each-option-single')) {// is single option
            $(this).before("<p class='each-option-single'><span class='xx-ct'>选项</span><i class='cha'>x</i></p>");
        }else if(ths.prev().hasClass('each-option-multiple')) { // is multiple option
            $(this).before("<p class='each-option-multiple'><span class='xx-ct'>选项</span><i class='cha'>x</i></p>");
        }
        //if optionCount eq 3,remove addBtn
        len==3&&$(this).remove();

    });
        common.addSingle();
        common.addMultiple();
        common.addText();
        common.Up();
        common.Down();
        common.Repeat();
        common.delete();
});