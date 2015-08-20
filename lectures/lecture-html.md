---
layout: code-lecture
title:  The Languages and Tools of the Web
permalink: /lectures/lecture-html/
nomenu: true
---

*Based on material by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week2.html)*
Next, we go over the very basics of how the content of a web page is represented in HTML. We will learn some simple CSS, which lets us separate the content of the web page with how we want it to look; this separation will let us change both things independently of one another, which will help a lot when we’re quickly iterating over designs. For visual elements such as lines, circles and polygons, we will learn SVG.



## HTML
In this course we will use HTML to create our data visualizations. HTML stands for “HyperText Markup Language”. 25 years ago, [that used to be a meaningful description of what HTML actually did](http://www.w3.org/People/Raggett/book4/ch02.html): it has links ([hypertext](http://en.wikipedia.org/wiki/Hypertext)), and it is a [markup language](http://en.wikipedia.org/wiki/Markup_language). But we will be using many things from the HTML5 standard, which does much, much more: [graphics](https://developer.mozilla.org/en-US/docs/Web/SVG), [audio, video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video), etc. So it is easier to think of HTML as “whatever it is that web browsers know how to interpret”, and just not think about the actual term.

### Elements

The important thing about HTML is that the markup is represented by elements. An HTML element is a portion of the content that is surrounded by a pair of tags of the same name. Like this:

{% include code.html id="basic_element" code="<strong>This is an HTML element.</strong>"  file=""%}

In this element, strong is the name of the tag; the open tag is <strong>, and the matching closing tag is </strong>. The way you should interpret this is that the text “This is an HTML element” should be “strong”, for some strong (typically this will be bold text). HTML elements can nest:

<strong>This is strong, and <u>this is underlined and
strong.</u></strong>
(Line breaks in HTML do not translate to line breaks in the rendered result.) In addition to the names, opening tags can contain extra information about the element. These are called attributes:

<a href="http://www.google.com">A link to Google's main page</a>
In this case, we’re using the a element (which stood for “anchor”, but now is almost universally used as a “link” — go figure). href means “HTML reference”, which actually makes sense for a change. The meaning given to each attribute changes from element to element. In this case, the above element would be rendered as below:

A link to Google’s main page

We will use element attributes in pretty much very example from now on. The most important ones are id, class, and style. The id attribute gives the attribute a name, which can then be used to access the element via Javascript (we’ll see how next week). Think of it as making the element accessible via a global variable. This is as convenient as a global variable, and potentially just as confusing: needing lots of different element ids might be a sign that you could organize your code better (in the next weeks we’ll learn about good practices like this). (The class and style attributes will be explained soon, in the CSS section below.)

{% include code.html id="simple_example" file="simple_example.html" code="" %}
[simple_example.html](simple_example.html)
test


asdf


<textarea rows="4" cols="50">
At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies. 
</textarea>
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
*See you next week!*