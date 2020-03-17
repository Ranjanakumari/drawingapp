$(function(){

    /*var canvas =document.getElementById("paint");
    var context = canvas.getContext('2d');
    //draw a line
    
    // declare new path
    context.beginPath();
    //set the line width
    context.lineWidth =40;
    //set the color
    context.strokeStyle = '#42e565';
    //set cap to the line(round,but,squae)
    context.lineCap ="round";
    // set the line join style(bevel,round,milter)
    context.lineJoin="round";
    //position the context point
    context.moveTo(50,50);
   //draw a straight line from straight point to a new position
    context.lineTo(200,200);
    //draw another line
    context.lineTo(400,100);
    //make the visible
    context.stroke();*/
    
    
    //declare variable
    var paint =false;
    //paintingerasing or not
    var paint_erase = "paint";
    //painting or erasing
    // get the canvas container
    var canvas  = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    //container
    var container = $("#container");
    
    // mouse position
    var mouse = {x:0,y:0};
    //onload load saved work from localstorage
    //set drawing parameters(lineWidth,linejoin,lineCap)
    ctx.lineWidth =3;
    ctx.lineJoin ="round";
    ctx.lineCap ="round";
    //click inside container
    container.mousedown(function(e){
      paint= true;
    //    window.alert(paint);
        ctx.beginPath();
        mouse.x = e.pageX-this.offsetLeft;
        mouse.y = e.pageY-this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });
    //move the mouse while holding mouse key
        container.mousemove(function(e){
          mouse.x = e.pageX-this.offsetLeft;
        mouse.y = e.pageY-this.offsetTop;
        if( paint == true) {
            if(paint_erase == "paint")
                {
                    //get color input
                    ctx.strokeStyle = $("#paintColor").val();
                     
                }else{
                    //white color
                    ctx.strokeStyle ="white";
                }
            ctx.lineTo(mouse.x,mouse.y); 
            ctx.stroke();
        }   
    });
    //moouse up we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    });
    //click on save button
$("#save").click(function(){
    if(typeof(localStorage)!= null)
    {
      localStorage.setItem("imgCanvas",canvas.toDataURL());
      // window.alert(localStorage.getItem("imgCanvas"))
    }
    else
        {
            window.alert("not");
        }
});
    //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") !=null)
        {
           var img = new Image();
            img.onload = function()
            {
                ctx.drawImage(img,0,0);
            }
            img.src = localStorage.getItem("imgCanvas");
        };
    
    //click on erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else
            {
                paint_erase ="paint";
            }
        $(this).toggleClass("eraseMode")
    });
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
       paint = false ; 
    });
  
    
    //reset button
    $("#reset").click(function(){
       ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //change color input
    
    $("#paintColor").change(function(){
       
        $("#circle").css("background-color",$(this).val());
    });
    //change linaWidth using slider
        $("#slider").slider({
        min:3,
        max:30,
        slide:function(event,ui)
        {
         $("#circle").height(ui.value);
        $ ("#circle").width(ui.value);  
          ctx.lineWidth = ui.value ; 
        }
    });
    

    
    
    
});