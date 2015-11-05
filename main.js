$(function() {
    var milkcocoa = new MilkCocoa("readifasz4fb.mlkcca.com");

    var ds = milkcocoa.dataStore("message");
    ds.stream().sort("desc").next(function(err, datas) {
        datas.forEach(function(data) {
            renderMessage(data);
        });
    });
    ds.on("push", function(e) {
        renderMessage(e);
    });

    var last_message = "dummy";
    var total_info = "total";
    var n = 0;

    function renderMessage(message) {
        var message_html = '<p class="post-text">' + '<a href="http://www.amazon.co.jp/gp/search/?field-keywords='+escapeHTML(message.value.isbn)+'" target="_blank">' + escapeHTML(message.value.content) + '</a>' + '</p>';
        var result_html = '<p class="post-page">' + "P." + escapeHTML(message.value.first) + " ~ " + escapeHTML(message.value.last) + "  の " + escapeHTML(message.value.result) + " ページを読んだよ！" +'</p>';
        var date_html = '';
        var total_html = escapeHTML(message.value.total);
        if(message.value.date) {
            date_html = '<p class="post-date">'+escapeHTML( new Date(message.value.date).toLocaleString())+'</p>';
        }
        $("#"+last_message).before('<div id="'+message.id+'" class="post">' + message_html + result_html + date_html + '</div>');
        last_message = message.id;
        /*$("#"+total_info).before('<div id="'+total.id+'">' + total_html + '</div>');
        total_message = total.id;*/
    }
    function post() {
        var content = escapeHTML($("#content").val());
        var first = escapeHTML($("#first").val());
        var last = escapeHTML($("#last").val());
        var isbn = escapeHTML($("#isbn").val());
        var result = 0;
        result += last - first + 1;
        /*var total = [];*/
        if ((content && content !== "") && (first && first !== "") && (last && last !== "")) {
            ds.push({
                title: "タイトル",
                content: content,
                first: first,
                last: last,
                result: result,
                isbn: isbn,
                /*total: total,*/
                date: new Date().getTime()
            }, function (e) {});
        }
        $("#content").val("");
        $("#first").val("");
        $("#last").val("");
        $("#result").val("");
        $("#isbn").val("");
        /*$("#total").val("");*/
    }
    $('#post').click(function () {
        post();
    });
    $('#content').keydown(function (e) {
        if (e.which == 13){
            post();
            return false;
        }
    });
    $('#first').keydown(function (e) {
        if (e.which == 13){
            post();
            return false;
        }
    });
    $('#last').keydown(function (e) {
        if (e.which == 13){
            post();
            return false;
        }
    });
    $('#result').keydown(function (e) {
        if (e.which == 13){
            post();
            return false;
        }
    });
    $('#isbn').keydown(function (e) {
        if (e.which == 13){
            post();
            return false;
        }
    });
      /*$('#total').keydown(function (e) {
        n += 1;
        for (var i = 0; i < n; i++) {
            total[i] = total[i - 1] + result;
        }
        post();
        return false;
    });*/
});
function escapeHTML(val) {
    return $('<div>').text(val).html();
};