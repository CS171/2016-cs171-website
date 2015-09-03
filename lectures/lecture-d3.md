---
layout: code-lecture
title:  DOM Manipulation & D3 Fundamentals
permalink: /lectures/lecture-d3/
nomenu: true
---
*Material based on the lecture by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week3.html), the [D3 Intro by Vadim Ogievetsky](http://vadim.ogievetsky.com/IntroD3/), Scott Murray's Interactive Data Analysis for the Web, and the [D3 website](http://d3js.org/).*

## DOM Manipulation
After we covered the basics of JavaScript last lecture it's now time to explore how javascript interacts with the DOM and thus makes all the interesting things in the browser happen. 
Like we’ve seen before, the HTML we write is represented as a tree inside a web browser. What we are going to turn to now are the JavaScript APIs that web browsers provide to let you edit the DOM dynamically, so that we can build our visualizations with code instead of text editors.

While we will manipulate the DOM mainly through libraries (we will use mainly [D3](http://d3js.org/), but [JQuery](https://jquery.com/) is the most popular DOM manipulation library) you can also manipulate the DOM directly through the standard DOM API through the ``document`` object. Check out the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/document) on the document object.

Here are the very first steps:

{% include code.html id="dom_manipulation" file="dom_manipulation.html" code="" js="false" preview="true" %}

``document`` is a global javascript object that contains the dom. If you log the document object you will see exactly the same as in the DOM view in the web inspector. It is this object that we are manipulating dynamically and that the browser then renders. The document object contains functions, like the ```getElementByID``` method we're using here, or the ```createElement``` or the ```createTextNode``` functions used to create new content.

Now we can make use of the features we learned about last lecture to make more complicated programs that write websites: 

{% include code.html id="dom_manipulation2" file="dom_manipulation2.html" code="" js="false" preview="true" %}


We can also control the attributes of elements, e.g., for styling and positioning with CSS:

{% include code.html id="dom_manipulation_styling" file="dom_manipulation_styling.html" code="" js="false" preview="true" %}

Remember that in JavaScript we can attach new fields to existing objects. You can do this to DOM elements returned by the API, and that turns out to be very powerful. Note how in the snippet below, we are adding a new method ```update``` to the node returned by ```divWithText```. When this method is called, we add the passed value to the current amount (stored at ```v```), compute new positions from ```v```, and update the text content of the node. By calling the update method we can get an **animation**:


{% include code.html id="dom_animation" file="dom_animation.html" code="" js="false" preview="true" %}

Notice the ```tickForever``` function. We can't use an infinte while loop here. If we did, the element attributes would be changed, but the user of the web browser does not get to see it, because the web browser does not ever get a chance to update the graphical representation of the DOM. The way to solve this problem is by using a special browser API called ```requestAnimationFrame```. This API lets you tell a web browser that you’d like the opportunity to change something in the DOM. The next time the web browser is sitting idly, after having drawn all of its needed graphics, it will call the function passed as a parameter. Then, we just need to make sure that after updating the graphics, we call requestAnimationFrame again. The solution is a recursive version of the endless loop above ```(function f() { tick(); f(); })```. The fundamental difference here is that instead of making the recursive call directly, we ask the browser to make the recursive call, after it has updated the graphics. This way there’s always a step in between every update where the web browser updates the UI and graphics, and you get nice animations as a result.

While we've worked with regular HTML elements here, the possibilities of demonstrated equally apply to SVG, of course. So in theory, you would have all the tools to create data driven visualizations. Of course, libraries such as D3 make our lives easier!


## JavaScript Events

Up to this point we have only dealt with documents that are independent from user interaction. For data visualization, however, interaction is critical. Here we will introduce a couple of elementary concepts of how you can define and listen to events in JavaScript. We will be using DOM event handlers, as always, take a look at the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers).

Here is the most simple example possible for events, using two different methods:

{% include code.html id="simple_event" file="simple_event.html" code="" js="false" preview="true" %}

The first button defines the function to be called - ```messageMe()``` directly in HTML. When the button is clicked, the corresponding function is called. The second button has an identifier. In the script we retrieve the button and add the function to be called dynamically. 

``onclick`` is of course not the only event that we can listen to. Here is an example for how to react to changes in a dropdown box with the ```onchange``` events. 
{% include code.html id="event_change" file="event_change.html" code="" js="false" preview="true" %}

Other [useful events](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers) are ```onload```, ```onmouseover```, ```onmouseout```, ```onresize```, etc.  


And finally, we can of course listen to events that are triggered by interacting with any kind of DOM element, not only with form elements such as buttons and drop-downs. Here is an example for SVG:

{% include code.html id="event_svg" file="event_svg.html" code="" js="false" preview="true" %}

So far so good - you can now write interactive code! If you know how to use these events you should be able to deal with all the interaction that you will encounter in the course of this class!

## Running a web server

Before we start doing data driven visualization, we need to briefly talk about web servers. All of the code we talked about up to this point can simply be run by opening any of the html files on your local computer. As we go forward, however, this will no longer be possible. Many browsers have restrictions on loading local files via JavaScript, for security reasons. So, as soon as we start working with data stored in files we need a web server to test our code. There are many different servers and you're welcome to use whichever one you like. I'll briefly introduce two simple solutions:

### The Python SimpleHTTPServer

If you have python installed you can run the built in simple server. To do this, `cd` to the directory where your code is located and run the following command: 

{% highlight bash linenos %}
python -m SimpleHTTPServer
{% endhighlight %}

Open `[http://localhost:8000/](http://localhost:8000/)` to get you to the server.
You can only have one server at the same time (unless you specify ports explicitly). Hit Control-C to quit the server. 

### Running a Server and Debugging with WebStorm

As you know, we made educational licenses of WebStorm available for you in this class. If you develop your code in an IDE like webstorm you get many powerful features, such as code completion, syntax highlighting, refactoring and interactive debuggin. While you can use the chrome developer tools to debug your code, it's more convenient to debug the code in the place you're writing it, as you can immediately edit if you see something wrong. To debug code, you first have to run it on a webserver. Webstorm comes with a built-in webserver, that you can activate via the `Run` menue. Here is an example configuration:

![WebStorm debug configuration](images/debug_config.png)

You should install the [Chrome Plugin for Webstorm](https://www.jetbrains.com/webstorm/help/using-jetbrains-chrome-extension.html) to get a fully-fledged debugging solution. Here I've set a breakpoint in the event handler function we just discussed: 

![WebStorm debug configuration](images/debugging.png)

Especially when you're working on larger projects I recommend using a good IDE, as it will make you much more efficient, once you've learned to use it. 


## D3: Data Driven Documents

D3 is a javascript library for manipulating the DOM based on data. D3 was originally written by Mike Bostock, Vadim Ogievetsky, and Jeff Heer; at this point it has a large number of contributors, and it’s one of the overall most popular projects on GitHub (!). D3 certainly owes some of its popularity to riding the everything-on-the-web wave. Nevertheless, the way in which you can express relationships between data and visual elements is fundamentally superior than any other library available, open source or not! It is nothing short of a breakthrough in the way we use code to express visual encodings. 

D3 can be used to manipulate pure HTML, but most commonly it's used in combination with SVG, i.e., we will be producing SVG charts using D3. 

In addition to the introduction in Scott Murray's book (the mandatory reading) you should work with the [D3 API Reference](https://github.com/mbostock/d3/wiki/API-Reference) to look up particulars of all the features of D3. And of course, you should be learning by examples. A great collection are [Mie Bostock's blocks](http://bl.ocks.org/mbostock) which contain simple examples, such as a [bar chart](http://bl.ocks.org/mbostock/2368837) to complex examples such as [this calendar view](http://bl.ocks.org/mbostock/4063318).

You can download the library to run locally on your computer from the [D3 Website](http://d3js.org/), or you can link directly to the latest release with this snippet: 

{% include code.html id="de_include" file="d3_include.html" code="" js="false" preview="false" %}

### Selections

[See API Reference](https://github.com/mbostock/d3/wiki/Selections)

Here is a minimal D3 example taken from the D3 website: 

{% include code.html id="d3_select" file="d3_select.html" code="" js="false" preview="true" %}

You can see that we achieve a similar result to the DOM manipulation examples we had before. We select an existing element in the DOM, here the first `<p>` element, and apply a style.  However, you can also see differences: instead of having to use the API standard `document.getElementsByTagName` we use `d3.select`; and instead of using `setAttribute("style", "color: steelblue;")` we use D3's `style` method. 

`d3.select` selects the first element that matches a selector. **Selectors** can specify tags (`p` in our example above), classes, and IDs, all through the same interface: 

{% include code.html id="d3_selectors" file="d3_selectors.html" code="" js="false" preview="true" %}

Notice, however, that as mentioned previously, only the first element that matches is selected. Of course, it is more practical to select all elements of a certain type, which we can achieve with `d3.selectAll`


{% include code.html id="d3_selectall" file="d3_selectall.html" code="" js="false" preview="true" %}

The last example illustrates the **declarative approach of D3**: we don't have to iterate over a list of elements and apply the style. Instead we select a set of elements through rules and declare properties. 

Once you have a selection, you can bulk-modify it's content, not only in terms of style, but we can modify [arbitrary properties](https://github.com/mbostock/d3/wiki/Selections#property) using `selection.property(name[, value])`, the [textual content of the elements](https://github.com/mbostock/d3/wiki/Selections#text) with `selection.text([value])`, etc. We can also append elements: 


{% include code.html id="d3_append" file="d3_append.html" code="" js="false" preview="true" %}

Here is a code snippet that we will use in future examples, included as run.js:

{% highlight javascript linenos %}
var button = d3.select("body").append("button");
button.text("Run!");
button.on("click", execute);
{% endhighlight %}

Here we have three SVG rectangles and use selectAll to apply a new style to them: 

{% include code.html id="d3_selectallsvg" file="d3_selectallsvg.html" code="" js="false" preview="true" %}

### Data
Mapping existing element to data: 

{% include code.html id="d3_data" file="d3_data.html" code="" js="false" preview="true" %}

What happens if we have more datapoints than elements? 

{% include code.html id="d3_enter1" file="d3_enter1.html" code="" js="false" preview="true" %}

There are still only three elements, it doesn't matter how many data points we have - we can't use more than there are elements to select. What to do? **Enter**!

{% include code.html id="d3_enter2" file="d3_enter2.html" code="" js="false" preview="true" %}

Progress - we have one element for each data item, but it doesn't look good: 

{% include code.html id="d3_enter3" file="d3_enter3.html" code="" js="false" preview="true" %}

Now, that works! But we're duplicating code. So instead we can do this shorter version: 

{% include code.html id="d3_enter4" file="d3_enter4.html" code="" js="false" preview="true" %}

So what if we don't have initialized svg elements? 

{% include code.html id="d3_enter5" file="d3_enter5.html" code="" js="false" preview="true" %}

Now let's try to get rid of some of the elements:

{% include code.html id="d3_exit1" file="d3_exit1.html" code="" js="false" preview="true" %}

We have a similar problem as before - we need to remove the element that's not bound. 

{% include code.html id="d3_exit2" file="d3_exit2.html" code="" js="false" preview="true" %}

### Transitions

One of the cool features of D3 is that transitions are baked in! 

{% include code.html id="d3_transition1" file="d3_transition1.html" code="" js="false" preview="true" %}

Cool, but we're missing the enter again: 

{% include code.html id="d3_transition2" file="d3_transition2.html" code="" js="false" preview="true" %}

### Drawing Lines

Here's one way to draw a line:

{% include code.html id="d3_lines1" file="d3_lines1.html" code="" js="false" preview="true" %}

But we already know that. There must be something better, and there is! 

{% include code.html id="d3_lines2" file="d3_lines2.html" code="" js="false" preview="true" %}

