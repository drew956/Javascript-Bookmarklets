/*
   4-12-2021
   This does not work as a bookmarklet. 
   This is designed to be saved as a "Snippet" to be run in Chrome. 
   (Can't be run as a bookmarklet due to cross-origin policy)
   What this does is it marks all the assignments in a gradebook for a specific assignment as having no problems. 
   (i.e. assignments marked "late" will be changed to "none".)
   It does not change the assignment for people with a score of 0, however. 
   
   Usage:
   Run the code while looking at the gradebook. 
   It will automatically come up with a list of selectors representing the various assignments.
   Enter the selector into the popup. 
   For example:
   .f3 

   Please verify that this does indeed match your gradebook format, as it was modeled after my gradebooks.
   Then just wait patiently as it clicks all the assignments and changes their status.
*/

let names        = [];
let class_offset = 0; //due to "Title IV column"
let num_headers  = $(".Gradebook__ColumnHeaderDetail").length;
let assignments  = $(".assignment");

for(let i = 0; i < num_headers; i++){
    if($(".assignment.f" + i).length != 0){
        class_offset = i;
        break;
    }
}

let assignments_headers = $(".Gradebook__ColumnHeaderDetail--primary");
assignments_headers.each( (i, el) => 
    names.push(el.innerText + "(.f" + (i + class_offset) +")")
);

let selector = prompt("Which is it?\n" + names.join("\n") );
let cells   = $(selector);
let offset  = 0;

cells.each(function(index_cell, cell){
    if($(cell).find(".missing").length > 0 && parseInt($(cell).find(".Grade")[0].innerText) != 0 ){
        setTimeout(() => {
            $(cell).click();
            $(cell).find("button").click(); //open the options

            setTimeout(() => {
                $($("input[name=SubmissionTrayRadioInput]")[0]).click();

                setTimeout( () =>{
                    let buttons = $("button");
                    buttons.each(function(index_button, button){
                        let svgs = $(button).find("svg");

                        svgs.each(function(index_svg, svg){

                            if(svg.getAttribute && svg.getAttribute("name") == "IconX"){
                                $(button).click();
                            }
                        });

                    });
                }, 2000);
            }, 2000);
        }, (offset + 1)*6000); //3 seconds inbetween each one
        offset++;
    }
});
