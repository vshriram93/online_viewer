var slideCounter=1;
function changeData(divId)
{
    var inputElement=document.createElement("input");
    var pointer=divId.id.toString().substring(8);
    inputElement.id="inputElement"+pointer;
    inputElement.value="Type here to change";
    var data=inputElement.value.toString();
    inputElement.setAttribute("onblur","updateData("+divId.id+","+pointer+")");
    document.getElementById(divId.id).innerHTML="";
    document.getElementById(divId.id).appendChild(inputElement);
}
function updateData(divId,point)
{
    var data=document.getElementById("inputElement"+point);
    document.getElementById(divId.id).innerHTML=data.value;
}
function addMoreSlides()
{
    slideCounter++;
    var slideDiv=document.createElement("div");
    slideDiv.setAttribute("class","slideDiv");
    slideDiv.id="slideDiv"+slideCounter;
    document.getElementById("slides").appendChild(slideDiv);
    var titleDiv=document.createElement("div");
    titleDiv.setAttribute("class","titleDiv");
    titleDiv.id="titleDiv"+slideCounter;
    titleDiv.setAttribute("ondblclick","changeData("+titleDiv.id+")");
    titleDiv.innerHTML="Double-Click to add Title";
    document.getElementById("slideDiv"+slideCounter).appendChild(titleDiv);
    var conttDiv=document.createElement("div");
    conttDiv.setAttribute("class","conttDiv");
    conttDiv.id="conttDiv"+slideCounter;
    conttDiv.setAttribute("ondblclick","changeData("+conttDiv.id+")");
    conttDiv.innerHTML="Double-Click to add Content";
    document.getElementById("slideDiv"+slideCounter).appendChild(conttDiv);
    var delSlide=document.createElement("button");
    delSlide.id="delSlide"+slideCounter;
    delSlide.setAttribute("onclick","delData("+slideCounter+")");
    delSlide.innerHTML="Delete Slide";
    document.getElementById("slideDiv"+slideCounter).appendChild(delSlide);
}
function delData(pointer)
{
    var delSlideId="slideDiv"+pointer;
    var delElement=document.getElementById(delSlideId);
    delElement.parentNode.removeChild(delElement);
}
function addSlides()
{
    document.getElementById("viewerCreator").innerHTML=document.getElementById("viewerName").value;
    var slideDiv=document.createElement("div");                                                                                              
    slideDiv.setAttribute("class","slideDiv");                                                                                                 
    slideDiv.id="slideDiv"+slideCounter;                                                                                                       
    document.getElementById("slides").appendChild(slideDiv);                                                                                   
    var titleDiv=document.createElement("div");                                                                                                
    titleDiv.setAttribute("class","titleDiv");                                                                                                 
    titleDiv.id="titleDiv"+slideCounter;                                                                                                       
    titleDiv.setAttribute("ondblclick","changeData("+titleDiv.id+")");                                                                         
    titleDiv.innerHTML="Double-Click to add Title";                                                                                            
    document.getElementById("slideDiv"+slideCounter).appendChild(titleDiv);                                                                    
    var conttDiv=document.createElement("div");                                                                                                
    conttDiv.setAttribute("class","conttDiv");                                                                                                 
    conttDiv.id="conttDiv"+slideCounter;                                                                                                       
    conttDiv.setAttribute("ondblclick","changeData("+conttDiv.id+")");                                                                         
    conttDiv.innerHTML="Double-Click to add Content";                                                                                          
    document.getElementById("slideDiv"+slideCounter).appendChild(conttDiv);                                                                    
    var addButton=document.createElement("button");                                                                                            
    addButton.id="addButton";                                                                                                                  
    addButton.innerHTML="Add next slide";                                                                                                      
    addButton.setAttribute("onclick","addMoreSlides()");                                                                                       
    document.getElementById("mainContent").appendChild(addButton);                                                                             
    var saveButton=document.createElement("button");
    saveButton.id="saveButton";                                                                                                                
    saveButton.setAttribute("onclick","saveSlides()");
    saveButton.innerHTML="Save!";                                                                                                              
    document.getElementById("mainContent").appendChild(saveButton);
}
saveSlides = (function() {
    var numSlides=document.getElementById("slides").childNodes.length;
    for(var i=0;i<numSlides;i++)
    {
	var slideTitle=document.getElementsByClassName("titleDiv")[i].innerHTML;
	var slideContent=document.getElementsByClassName("conttDiv")[i].innerHTML;
	var admin;
	MyFBId(function(response){
	    admin=response.id;
	    console.log(admin);
	    var viewer=document.getElementById("viewerCreator").innerHTML;
	    now.sendSlideDetails(slideTitle,slideContent,viewer,admin);
	});
    }
});
now.sendSlideDetailsResponse=function(result)
{
    if(result)
    {
	var addContactsButton=document.createElement("button");
	addContactsButton.id="addContactsButton";
	addContactsButton.innerHTML="Add your contacts";
	document.getElementById("mainContent").innerHTML="";
	document.getElementById("mainContent").appendChild(addContactsButton);
    }
}
window.onload=function()
{
    var create=1;
    document.getElementById("createViewer").onclick=function()
    {
	if(create)
	{
	    create=0;
	    var viewerName=document.createElement("input");
	    viewerName.id="viewerName";
	    viewerName.value="Enter viewer name";
	    var viewerCreateButton=document.createElement("button");
	    viewerCreateButton.id="viewerCreateButton";
	    viewerCreateButton.innerHTML="Create";
	    viewerCreateButton.setAttribute("onclick","addSlides()");
	    document.getElementById("viewerCreator").appendChild(viewerName);
	    document.getElementById("viewerCreator").appendChild(viewerCreateButton);
	}
    }
}