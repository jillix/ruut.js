window.addEventListener("load", function () {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        maxLines: Infinity
    });
    editor.setFontSize(18);
    editor.getSession().setMode("ace/mode/javascript");

    var pre = document.querySelector("#result pre")
      , input = document.querySelector("#result input")
      ;

    function run() {
        eval(editor.getValue());
        pre.textContent = JSON.stringify(_router(input.value), null, 2);
        hljs.highlightBlock(pre);
    }
    document.querySelector("#result button").addEventListener("click", run);
    run();
});
