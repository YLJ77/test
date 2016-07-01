var resourceWidth=app.activeDocument.width;
var resourceHeight=app.activeDocument.height;
var rowsCount = 0;

if (resourceWidth == '608 px') {
  rowsCount = resourceHeight / 76;
} else if (resourceWidth == '990 px') {
  rowsCount = resourceHeight / 124;
} else {
  alert('图片宽度既不等于608也不等于990!');
}
rowsCount = parseInt(rowsCount);
/*check if a document is open. set rulerunit to pixel*/

if(app.documents.length > 0) { 
   var oldUnitSettings = app.preferences.rulerUnits;
   app.preferences.rulerUnits = Units.PIXELS;
   mainDialog();
}   
 
 else{  
    
  alert("no open documents")

} 

/*Interface */

function mainDialog(){
    
var win = new Window("dialog", "Gridder", [0,0,312,283], );

with(win){

  win.columnsPanel = add( "panel", [10,15,152,106], 'Columns', {name: 'Columspanel', } );
    with(win.columnsPanel){

    win.columnsPanel.gNumberText = add( "edittext", [80,16,126,36], "0" );
    win.columnsPanel.gGutterText = add( "edittext", [80,43,126,63], "0px" );
    win.columnsPanel.gNumberLabel = add( "statictext", [22,17,80,37], 'Number:' );
    win.columnsPanel.sText = add( "statictext", [32,45,80,65], 'Gutter:' );

    }

  win.rowsPanel = add( "panel", [160,15,302,106], 'Rows', {name: 'Rows', } );
    with(win.rowsPanel){

    win.rowsPanel.rNumberText = add( "edittext", [80,16,126,36], rowsCount );
    win.rowsPanel.rGutterText = add( "edittext", [80,43,126,63], "0px");
    win.rowsPanel.rNumberLabel = add( "statictext", [22,17,80,37], 'Number:' );
    win.rowsPanel.rGutterLabel = add( "statictext", [32,45,80,65], 'Gutter:' );

    }

  win.marginsPanel = add( "panel", [10,116,302,200], 'Margins' );

  with(win.marginsPanel){

    win.marginsPanel.mTopText = add( "edittext", [94,14,140,34], "0px" );
    win.marginsPanel.mBottomText = add( "edittext", [94,39,140,59], "0px" );
    win.marginsPanel.mRightText = add( "edittext", [195,14,241,34], "0px" );
    win.marginsPanel.mLeftText = add( "edittext", [195,39,241,59], "0px" );
    win.marginsPanel.mTopLabel = add( "statictext", [60,16,90,36], 'Top:' );
    win.marginsPanel.mBottomLabel = add( "statictext", [39,39,90,59], 'Bottom:' );
    win.marginsPanel.mRightLabel = add( "statictext", [155,16,190,36], 'Right:' );
    win.marginsPanel.mLeftLabel = add( "statictext", [162,39,190,59], 'Left:' );

    }

  win.okButton = add( "button", [155,253,225,274], 'Ok' );
  win.cancelButton = add( "button", [235,253,300,274], 'Cancel', {name: 'Cancel', } );
  win.calcButton = add( "button", [10,253,80,274], 'Calculate', );
  win.oddPixelCheck = add( "checkbox", [13,197,65,234], undefined );
  win.oddPixelLabel = add( "statictext", [33,206,191,236], 'Allow guides on subpixel' );
  win.optClearGuides = add( "checkbox", [13,220,65,248], undefined );
  win.optClearGuidesLabel = add( "statictext", [33,225,191,236], 'Clear old guides' );


  }
  
  win.calcButton.onClick = function calcClick(){

    
  /*parse input */
    
  if (win.marginsPanel.mTopText.text.length==0){win.marginsPanel.mTopText.text=0;}
  if (win.marginsPanel.mBottomText.text.length==0){win.marginsPanel.mBottomText.text=0;}
  if (win.marginsPanel.mLeftText.text.length==0){win.marginsPanel.mLeftText.text=0;}
  if (win.marginsPanel.mRightText.text.length==0){win.marginsPanel.mRightText.text=0;}
  if (win.rowsPanel.rNumberText.text.length==0){win.rowsPanel.rNumberText.text=0;}
  if (win.rowsPanel.rGutterText.text.length==0){win.rowsPanel.rGutterText.text=0;}
  if (win.columnsPanel.gNumberText.text.length==0){win.columnsPanel.gNumberText.text=0;}
  if (win.columnsPanel.gGutterText.text.length==0){win.columnsPanel.gGutterText.text=0;}
    
  var margTop = parseInt(win.marginsPanel.mTopText.text);
  var margLeft = parseInt(win.marginsPanel.mLeftText.text);
  var margRight = parseInt(win.marginsPanel.mRightText.text);
  var margBottom = parseInt(win.marginsPanel.mBottomText.text);
  var collNumber = parseInt(win.columnsPanel.gNumberText.text);
  var collGutter = parseInt(win.rowsPanel.rGutterText.text);
  var rowNumber = parseInt(win.rowsPanel.rNumberText.text);
  var rowGutter = parseInt(win.columnsPanel.gGutterText.text);

  var optclear = win.optClearGuides.value;
  var optodd = win.oddPixelCheck.value;
  var documentWidth = parseInt(activeDocument.width);
  var documentHeight = parseInt(activeDocument.height); 
  var continueanyway=true;
  
  /* Form validation */
    
  if (isNaN(margTop)==true||isNaN(margBottom)==true||isNaN(margLeft)==true||isNaN(margRight)==true||isNaN(collNumber)==true||isNaN(collGutter)==true||isNaN(rowGutter)==true||isNaN(rowNumber)==true)
         
    {
      alert("empty field(s) or invalid type");
      return 0;   
    }
           
  if (collNumber>=500||rowNumber>=500)
               
    {
      var warning = new Window ("dialog", "warning");
      var myWarning = warning.add ("statictext"); 
      myWarning.text = "shitload of columns and rows. continue anyway?";
      var buttons = warning.add("group");
      var cancelbutton = buttons.add("button", undefined, "Continue", {name: 'ok', }); 
      var okbutton = buttons.add("button", undefined, "cancel", {name: 'cancel', });
      cancelbutton.onClick= function(){warning.close(); continueanyway=true; return true;}
      okbutton.onClick=continueanyway=function(){warning.close(); continueanyway=false; return true;}
    
      warning.show ();
    }
     
  if (collNumber<0||collGutter<0||rowGutter<0||rowNumber<0)
          
    {
      alert("invalid type");
      return 0;   
    }
           
  /*calculating gridwidth */
  
  var gridwidth = (documentWidth-margLeft-margRight-(collGutter*(collNumber-1)))/collNumber;
  var gridheight = (documentHeight-margTop-margBottom-(rowGutter*(rowNumber-1)))/rowNumber;  


  if (continueanyway==true)
  {
      resultwin();
  }
  

function resultwin(){
      var calcresult = new Window ("dialog", "Result");
      var docDimensions = calcresult.add ("statictext"); 
      docDimensions.text = "Document: "+documentWidth+"px x "+documentHeight+"px";
      
     if(optodd==false)
         {
           roundgridwidth=Math.round(gridwidth);
           roundgridheight=Math.round(gridheight);
           hrestpixel=documentWidth-margLeft-margRight-((roundgridwidth)*(collNumber))-(collGutter*(collNumber-1));
           wrestpixel=documentHeight-margTop-margBottom-((roundgridheight)*(rowNumber))-(rowGutter*(rowNumber-1));

          
           columnwidth = calcresult.add ("statictext"); 
           columnwidth.text = "Columns: "+collNumber+" x "+roundgridheight+"px "+"("+gridheight.toFixed(2)+"px"+")";
           rowwidth = calcresult.add ("statictext"); 
           rowwidth.text = "Rows: "+rowNumber+" x "+roundgridwidth.toFixed(2)+"px "+"("+gridwidth.toFixed(2)+"px"+")";
            
            hrest = calcresult.add ("statictext"); 
            hrest.text = "Rest pixel horizontal: "+hrestpixel;

            wrest = calcresult.add ("statictext"); 
            wrest.text = "Rest pixel vertical: "+wrestpixel;
        }

      else{

            var columnwidth = calcresult.add ("statictext"); 
            columnwidth.text = "Columns: "+collNumber+" x "+gridheight.toFixed(3)+"px";
            var rowwidth = calcresult.add ("statictext"); 
            rowwidth.text = "Rows: "+rowNumber+" x "+gridwidth.toFixed(3)+"px";
        

      }

      var buttons = calcresult.add("group");
      var cancelbutton = buttons.add("button", undefined, "Ok", {name: 'ok', }); 
      cancelbutton.onClick= function(){calcresult.close(); continueanyway=true; return true;}
    
      calcresult.show ();
 }

  }
  

  win.okButton.onClick = function onClick(){

    
  /*parse input */
    
  if (win.marginsPanel.mTopText.text.length==0){win.marginsPanel.mTopText.text=0;}
  if (win.marginsPanel.mBottomText.text.length==0){win.marginsPanel.mBottomText.text=0;}
  if (win.marginsPanel.mLeftText.text.length==0){win.marginsPanel.mLeftText.text=0;}
  if (win.marginsPanel.mRightText.text.length==0){win.marginsPanel.mRightText.text=0;}
  if (win.rowsPanel.rNumberText.text.length==0){win.rowsPanel.rNumberText.text=0;}
  if (win.rowsPanel.rGutterText.text.length==0){win.rowsPanel.rGutterText.text=0;}
  if (win.columnsPanel.gNumberText.text.length==0){win.columnsPanel.gNumberText.text=0;}
  if (win.columnsPanel.gGutterText.text.length==0){win.columnsPanel.gGutterText.text=0;}
    
  var margTop = parseInt(win.marginsPanel.mTopText.text);
  var margLeft = parseInt(win.marginsPanel.mLeftText.text);
  var margRight = parseInt(win.marginsPanel.mRightText.text);
  var margBottom = parseInt(win.marginsPanel.mBottomText.text);
  var collNumber = parseInt(win.columnsPanel.gNumberText.text);
  var collGutter = parseInt(win.rowsPanel.rGutterText.text);
  var rowNumber = parseInt(win.rowsPanel.rNumberText.text);
  var rowGutter = parseInt(win.columnsPanel.gGutterText.text);

  var optclear = win.optClearGuides.value;
  var optodd = win.oddPixelCheck.value;
  var documentWidth = parseInt(activeDocument.width);
  var documentHeight = parseInt(activeDocument.height); 
  var continueanyway=true;
  
  /* Form validation */
    
  if (isNaN(margTop)==true||isNaN(margBottom)==true||isNaN(margLeft)==true||isNaN(margRight)==true||isNaN(collNumber)==true||isNaN(collGutter)==true||isNaN(rowGutter)==true||isNaN(rowNumber)==true)
         
    {
      alert("empty field(s) or invalid type");
      return 0;   
    }
           
  if (collNumber>=500||rowNumber>=500)
               
    {
      var warning = new Window ("dialog", "warning");
      var myWarning = warning.add ("statictext"); 
      myWarning.text = "shitload of columns and rows. continue anyway?";
      var buttons = warning.add("group");
      var cancelbutton = buttons.add("button", undefined, "Continue", {name: 'ok', }); 
      var okbutton = buttons.add("button", undefined, "cancel", {name: 'cancel', });
      cancelbutton.onClick= function(){warning.close(); continueanyway=true; return true;}
      okbutton.onClick=continueanyway=function(){warning.close(); continueanyway=false; return true;}
    
      warning.show ();
    }
     
  if (collNumber<0||collGutter<0||rowGutter<0||rowNumber<0)
          
    {
      alert("invalid type");
      return 0;   
    }
           
  /*calculating gridwidth */
  
  var gridwidth = (documentWidth-margLeft-margRight-(collGutter*(collNumber-1)))/collNumber;
  var gridheight = (documentHeight-margTop-margBottom-(rowGutter*(rowNumber-1)))/rowNumber;  


  /*check for odd pixel and round if necessary */

  if(parseInt(gridwidth)!=gridwidth||parseInt(gridheight)!=gridheight&&optodd==false)
    {
    gridwidth=Math.round(gridwidth);
    gridheight=Math.round(gridheight);
    }
  

  /*clear guides*/
  if(optclear==true)
    {
      var id556 = charIDToTypeID( "Dlt " ); 
      var desc102 = new ActionDescriptor(); 
      var id557 = charIDToTypeID( "null" ); 
      var ref70 = new ActionReference(); 
      var id558 = charIDToTypeID( "Gd  " ); 
      var id559 = charIDToTypeID( "Ordn" ); 
      var id560 = charIDToTypeID( "Al  " ); 
      ref70.putEnumerated( id558, id559, id560 ); 
      desc102.putReference( id557, ref70 ); 
      executeAction( id556, desc102, DialogModes.NO ); 
  }


  if (continueanyway==true)
  {
      drawguides();
      exsistingguides=true;
  }
    
  function drawguides(){
  
        /*draw Margin guides */
        
        app.activeDocument.guides.add(Direction.HORIZONTAL, margTop);
        app.activeDocument.guides.add(Direction.HORIZONTAL, documentHeight-margBottom);
        app.activeDocument.guides.add(Direction.VERTICAL, margLeft);
        app.activeDocument.guides.add(Direction.VERTICAL, documentWidth-margRight);
        
       
        
       /*draw vertical guides*/

      
       var tempvar = parseInt(margLeft);
       for(i=1;i<collNumber;i++) {
          
          app.activeDocument.guides.add(Direction.VERTICAL, gridwidth+tempvar);
          app.activeDocument.guides.add(Direction.VERTICAL, gridwidth+tempvar+collGutter);
          tempvar = tempvar+gridwidth+collGutter;

        }
    
    /*draw horizontal guides */
    
     var tempvare= parseInt(margTop);
     for(i=1;i<rowNumber;i++) {
          
          app.activeDocument.guides.add(Direction.HORIZONTAL, gridheight+tempvare);
          // app.activeDocument.guides.add(Direction.HORIZONTAL, gridheight+tempvare+rowGutter);
          tempvare= tempvare+gridheight+rowGutter;

        }
    
    win.close();
  }
}
   


win.center();
win.show();
}

/*restore original settings*/
if(app.documents.length > 0) { 
app.preferences.rulerUnits = oldUnitSettings;
} 