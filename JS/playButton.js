function addDate(){
    var date=document.getElementById('slider')['value'];
    if (Number(date)<document.getElementById('slider')['max']){
        document.getElementById('slider')['value']=Number(date)+1;
        var label=document.getElementById("filters");
        for (var i=0; i< label.children.length;i++)
            if (label.children[i].checked==true){
                setDate((Number(date)+1),label.children[i].id);
            }
    }
}
function minusDate(){
    var date=document.getElementById('slider')['value'];
    if (Number(date)>document.getElementById('slider')['min']){
        document.getElementById('slider')['value']=Number(date)-1;
        var label=document.getElementById("filters");
        for (var i=0; i< label.children.length;i++)
            if (label.children[i].checked==true){
                setDate((Number(date)-1),label.children[i].id);
            }
    }
}
function autoPlay(){
    var currentButton=document.getElementById("autoPlay").className;
    if (currentButton=='play'){
        addDate()
        document.getElementById("autoPlay").className='pause';
        interval=setInterval("addDate()",1000) //global variable
    }
    else if (currentButton='pause'){
        document.getElementById("autoPlay").className='play';
        clearInterval(interval)
    }
}
