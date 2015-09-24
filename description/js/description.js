//depends on 'button.js', '_buttons.scss', and '_description.scss' to work properly

//depends on the following elements in the index.html file:
//- a [div] in the body with class 'button description'
//- a [div] in the body with class 'top' that holds:
//  - [h1] with class 'title'
//  - [p] with class 'directions'



//Main object that holds functions that deal with positioning sizing of inititial
//description and title of a visualizations. Default state is visibile when the user
//first views the visualization.
var description = {


  //object to hold elements of the description.
  elem: {},


  //object to hold meaurements
  meas: {},


  //property to keep track of if the description is hidden or not
  hidden: false,


  //property that records if user has interacted yet (description is hidden after 5 sec if user does not interact)
  interaction: false,



  /**
   * setUp
   *   Initial function that uses jquery to wait until the page is ready before
   *   defining element properties as well as establishing a timeout function to
   *   draw attention to the button after a certain amount of time, and attach
   *   other event listeners to the elements
   */
  setUp: function(){
    $( document ).ready(function(){  //jquery, makes sure the document is ready.

      description.meas.height = document.documentElement.clientHeight;  //stores document height

      description.addElements();

      //description.elem.holder = document.getElementsByClassName("top")[0];  //store description ('top') div reference
      //description.elem.button = document.getElementsByClassName("button description")[0];  //store hide/show button reference

      //description.elem.buttonArrow = description.elem.button.childNodes[4];

      window.setTimeout(description.checkInteraction, 10000);  //timeout to call hide function after a specified time.

      description.elem.holder.style.height = description.meas.height / 2 + "px";  //sets initial height of top div to half the screen size.

      //Touch ANYWHERE within description will close it
      d3.select(description.elem.holder)  //D3, select description ('top') div
        .on("touchstart", function(){  //bind touch event
          if( !description.hidden ){  //if description is showing
            description.hide();  //hide the description
          }
        });

      d3.select(description.elem.close)  //D3, select hide/show button
        .on("touchstart", function(){  //bind touch event
          if(description.hidden){  //if description is currently hidden
            description.show();  //show the description
          }else{  //if the description is currently showing
            description.hide();  //hide the description
          }
        })
        .on("touchstart.cancel", function() { d3.event.stopPropagation(); });
    });
  },



  /**
   * addElements
   *   Creates div to hold all help explanations ('help-text') and a close button.
   *   Creating here and adding to the DOM allows 'help.js' to be properly applied
   *   to many different visualization without editing the 'index.html' of each vis.
   *
   *  <h1 class="title">Co-op Industry Visualization</h1>
      <p class="description">
      </p>
   */
  addElements: function(){
    var holder = document.createElement("div");
    var title = document.createElement("h1");
    var text = document.createElement("p");
    var close = document.createElement("p");

    console.log(description.elem);
    description.elem.holder = holder; //save reference to main div to be used later
    description.elem.title = title; //save reference to title <h1> element to be used later
    description.elem.text = text; //save reference to 'help-close' <p> element to be used later
    description.elem.close = close; //save reference to 'help-close' <p> element to be used later

    holder.className = "description-holder";
    title.className = "title";
    text.className = "text";
    close.className = "description-close";

    title.innerHTML = donut.description.title;
    text.innerHTML = donut.description.text;
    close.innerHTML = "&#215;";

    holder.appendChild(title);
    holder.appendChild(text);
    holder.appendChild(close);
    document.body.appendChild(holder);
  },



  /**
   * checkInteraction
   *   called after a delay when the document is ready, checks the description.interaction
   *   property to see if the user has interacted with the description yet. If they
   *   HAVE interacted then this function does nothing, if they HAVE NOT interacted
   *   then this function calls 'description.hide()'
   */
  checkInteraction: function(){
    if(!description.interaction){  //if user has not interacted with description
      description.hide();  //hide the description
    }
  },



  /**
   * hide
   *   Function to hide the description after the user interacts with the div or
   *   the button. Shrinks the div, changes the opacity of the directions so they
   *   are no longer visible, and moves the button to the top right area of the screen
   */
  hide: function(){
    var directions = description.elem.holder.children[1];
    directions.style.transition = "opacity .5s";

    description.elem.holder.style.height = "5%";
    description.elem.holder.setAttribute("class", "hidden description-holder");

    description.elem.close.innerHTML = "&#x25BC;";
    description.elem.close.style.lineHeight = 3;
    description.elem.close.style.fontSize = "150%";

    description.elem.text.style.opacity = 0;
    //description.elem.button.setAttribute("class", "hidden button description");
    //description.elem.button.style.height = "25px";

    //description.elem.buttonArrow.style.transform = "rotate(" + 90 + "deg )";

    description.hidden = true;
    description.interaction = true;
  },



  /**
   * show
   *   Function to show the descriptions after the user hits the button when the
   *   description is hidden. Expands the div, changes the opacity of the directions
   *   so they are visible, and moves the button to the lower middle area of the div
   */
  show: function(){
    //var button = description.elem.button;
    //var topDiv = description.elem.holder;

    if(donut.current.active){
      donut.leavePath(donut.current.d, donut.current.touched);
    }

    if(!help.hidden){
      help.hide();
    }

    //var directions = description.elem.holder.children[1];
    //directions.style.transition = "opacity 2.5s";
    //var title = topDiv.children[0];

    description.elem.holder.style.height = description.meas.height / 2 + "px";
    description.elem.holder.setAttribute("class", "description-holder");

    description.elem.close.innerHTML = "&#215;";
    description.elem.close.style.lineHeight = "normal";
    description.elem.close.style.fontSize = "300%";

    description.elem.text.style.opacity = 1;

    //description.elem.button.setAttribute("class", "button description");
    //description.elem.button.style.height = buttons.measurements.buttonWidth;

    //description.elem.buttonArrow.style.transform = "rotate(" + 270 + "deg )";

    //directions.style.transition = "opacity 1s";

    description.hidden = false;
  }
}
