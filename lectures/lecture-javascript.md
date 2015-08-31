---
layout: code-lecture
title:  JavaScript Fundamentals
permalink: /lectures/lecture-javascript/
nomenu: true
---

*Material based on the lecture by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week3.html)* 

If you’re following the text below, my suggestion is that you either open the Developer Tools’s JavaScript console on a browser window, and type the examples to see what they do, like we go over in class. You should also try variants, and just generally play around with the console, to get a feel for the language.

Before we get started, though, a few words of warning: there is a lot of bad JavaScript advice on the internet. For example, although StackOverflow is typically a high-quality Q&A website, I would stay well away from it when it comes to JavaScript (why that is the case is beyond my understanding). Finally, the introduction below is not meant to give you a comprehensive description of JavaScript, but rather a foothold.

Once you become proficient in the language, then you can start worrying about best practices and special cases, especially as they related to performance and portability across browsers. It’s easier for you simply not to worry about that kind of stuff right now. (This does mean that if you’re a veteran JavaScript programmer, you’ll spot places where what I’m writing is not 100% accurate. If you were to complain, you’d be technically correct (which is the best kind of correct), but what are you doing reading a JavaScript beginner’s guide?

## JavaScript Background

Why do we want to use JavaScript? So far we have only written **static HTML and SVG code**. In your homework, for example, you have to encode a dataset by hand every time, for your line-chart, bar chart, scatterplot, etc.
If we had a dynamic and general way to load the data, we could use the same variables for all charts and we could also plot the charts with various datasets of different size and with different characteristics. I like to think of pure HTML and SVG as analogous to pen and paper - you can create things that look nice once, but you **can't re-use them efficiently and you can't interact with them**. Computer programming brings **interactivity and generalizability (re-use)** to the table. We can tell the computer how to do something for certain classes of (legal) input, and the computer will do that for all possible cases of legal input. 
  
JavaScript is the most important programming language of the web, and the only programming language that can be used on most web-browsers without any plugins. Alternatives such as Java Applets or Flash were popular in the past but have lost significant ground to JavaScript. JavaScript is mostly used on the client-side of a client-server application, other languages such as Java and Python are popular on the server, but JavaScript is nowadays also used on the server e.g., using [Node.js](https://nodejs.org/). We will be focusing on the client-side in this class. 

JavaScript can be used with **imperative/procedural, object-oriented, and functional programming styles**.  It is a **dynamically typed language**, which can be strange for developers who mainly work with strongly typed languages such as C/C++ and Java. Also, Javascript uses **prototypical inheritance** instead of a class-based model for it's object oriented purposes. That means that there is no "class" that is defined centrally, instead you rely on objects' prototypes for inheritance that can be extended at runtime. If this doesn't mean much to you now, don't worry - we'll go through it slowly.

## JavaScript - The Very Basic

If you know any other mainstream programming language, JavaScript will feel sufficiently familiar. It has variables which hold values:


{% include code.html id="simple_js" file="variables.js" code="" js="true" preview="false" %}


The first thing to notice is that JavaScript’s variables are dynamically typed: you don’t need to declare their types before using them, and they can refer to values of different types at different times in the program execution. (This is convenient but quite error-prone: it’s usually a bad idea to make too much use of this feature.)


More nuts & bolts: Python server
---

*10 minutes; interactive.*

In most cases, we need special software — a *server* — to view HTML files. 

You will need Python; you should already have it installed.

`cd` to `hw1/` and run the following.

```
python -m SimpleHTTPServer
```

Open [http://localhost:8000/](http://localhost:8000/) — we have a server. You can open `table_example.html` to see an HTML file.

*show the relation between the files and the contents of the directory*

You can only have one server at the same time (unless you specify a port). Control-C to quit. 

The DOM
---

*Return to your text editor (`basic.html`). 20 minutes; demonstration only.*

The DOM is the hierarchical structure used for representing elements in the browser — you should already be familiar with it. Here is a simple HTML example:

```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>CS171 Section 1</title>
    <script src="http://d3js.org/d3.v3.min.js"></script>
  </head>
  <body>
    <h1>Welcome to CS171</h1>
    <p>Data visualization</p>
    <svg></svg>
  </body>
</html>
```

*briefly describe the structure of the document*

Notice the tags `<...>` that are matched with `</...>` — those are DOM (HTML) elements.

### The Web Inspector

`<h1>` indicates a heading. Let's change the contents of the `<h1>` and refresh.

Let's add anotger paragraph below the first paragraph — a `<p>`.

*Open `basic.html` in Chrome with Developers Tools vertically docked*

In Developer Tools, we can do live modifications to the DOM. For example, let's move the paragraph around and change its content. Or, let's delete it.

### CSS: Making it pretty

*Return to the text editor*

HTML sets the structure and contents of the page and CSS sets its style — things like fonts, colors, margins, backgrounds, etc.

Let's add some CSS.

```
...
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/style.css" />
  </head>
...
```

That line tells the browser to look for styling information in `style.css`.

*open `style.css` in another pane*

The file describes a list of styles (e.g. `color: darkgrey`) applied to a particular group of HTML elements.

We won't be using CSS extensively in this course: CSS works by assigning styles (e.g. `color: darkgrey`) to particular groups of HTML elements.

Sometimes we want to target one particular element — a particular `p`, not all `p`s. Let's add an *id* of `subheading` to the first `p`.

```html
...
    <h1>Welcome to CS171</h1>
    <p id="subheading">Data visualization</p>
...
```

And now, in `style.css`, we use that id to only apply styling to a specific paragraph.

```css
p#subheading {
  color: darkgrey;
  font-style: italic;
}
```

*return to Developer Tools*

We can also edit CSS live in the Developer Tools. Let's change that paragraph's color to red.

### SVG: Drawing shapes

*return to the text editor*

SVG is a format for drawing vector graphics in the browser. We'll be using SVG a lot in this course and you're probably not familiar with it yet.

HTML and SVG are similar — HTML defines the content and structure of elements such as headings, paragraphs, and images; SVG defines graphical marks such as circles, rectangles, and paths.

Let's add a circle inside the `<svg>` element.

```svg
<circle cx="200" cy="200" r="50"/>
```

We can modify the attributes of the circle. Let's change the `cx` value. Let's make the `fill` attribute `steelblue`.

Let's add a rectangle.

```svg
<rect x="10" y="100" width="10" height="100" fill="steelblue"/>
```

*remove the circle and rectangle*

### Manipulating the DOM

*Expand the console drawer in the Developer Tools Elements pane*

In addition to hardcoding SVG elements, we can use Javascript to programmatically add to the DOM.

```js
var svg = d3.select("svg");

var circle = svg.append("circle");
```

Why don't we see anything? The circle is in the DOM, but it needs attributes for its position and size.

```js
circle
    .attr("cx", 200)
    .attr("cy", 100)
    .attr("r", 40)
    .attr("fill", "steelblue");
```

How about more circles?

```js
var circle2 = svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 100)
    .attr("r", 40)
    .attr("fill", "steelblue");
```

And of course, we can still update our original circle.

```js
circle
	.transition()
    .attr("cx", 400);
```

### Groups

We can group elements using `<g>` elements. First, we create a `<g>` element.

```js
var g = svg.append("g");
```

Let's move the two circles into the `<g>`.

```js
g.node().appendChild(circle.node());
g.node().appendChild(circle2.node());
```

Nothing changes — the `<g>` element just helps us group and organize elements.

We can apply transformations that apply to the whole group — for example, let's translate the group.

```js
g
  .transition()
  .attr("transform", "translate(0, 100)");
```

---
