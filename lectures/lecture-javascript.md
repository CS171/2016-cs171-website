---
layout: code-lecture
title:  JavaScript Fundamentals
permalink: /lectures/lecture-javascript/
nomenu: true
---


## Web Stack

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
