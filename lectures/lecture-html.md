---
layout: code-lecture
title:  The Languages and Tools of the Web
permalink: /lectures/lecture-html/
nomenu: true
---

*Based on material by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week2.html) and Kevin Sun*
Next, we go over the very basics of how the content of a web page is represented in HTML. We will learn some simple CSS, which lets us separate the content of the web page with how we want it to look; this separation will let us change both things independently of one another, which will help a lot when we’re quickly iterating over designs. For visual elements such as lines, circles and polygons, we will learn SVG.



## HTML
In this course we will use HTML to create our data visualizations. HTML stands for “HyperText Markup Language”. 25 years ago, [that used to be a meaningful description of what HTML actually did](http://www.w3.org/People/Raggett/book4/ch02.html): it has links ([hypertext](http://en.wikipedia.org/wiki/Hypertext)), and it is a [markup language](http://en.wikipedia.org/wiki/Markup_language). But we will be using many things from the HTML5 standard, which does much, much more: [graphics](https://developer.mozilla.org/en-US/docs/Web/SVG), [audio, video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video), etc. So it is easier to think of HTML as “whatever it is that web browsers know how to interpret”, and just not think about the actual term.

### Elements

The important thing about HTML is that the markup is represented by elements. An HTML element is a portion of the content that is surrounded by a pair of tags of the same name. Like this:

{% include code.html id="basic_element" code="<strong>This is an HTML element.</strong>"  file=""%}

In this element, strong is the name of the tag; the open tag is <strong>, and the matching closing tag is </strong>. The way you should interpret this is that the text “This is an HTML element” should be “strong”, i.e., typically this will be bold text.
 
HTML elements can and commonly do nest:

{% include code.html id="nested_element" code="<strong>This is strong, and <u>this is underlined and strong.</u></strong>"  file=""%}

In addition to the names, opening tags can contain extra information about the element. These are called attributes:

{% include code.html id="attribute" code="<a href='http://www.google.com'>A link to Google's main page</a>"  file=""%}

In this case, we’re using the ``a`` element (which stood for “anchor”, but now is almost universally used as a “link” — go figure). ``href`` means “HTML reference”, which actually makes sense for a change. The meaning given to each attribute changes from element to element. 

We will use element attributes in pretty much every example from now on. The most important ones are ``id``, ``class``, and ``style``. The ``id`` attribute gives the attribute a unique name, which can then be used to access the element via Javascript (we’ll see how next week). Think of it as making the element accessible via a global variable. This is as convenient as a global variable, and potentially just as confusing: needing lots of different element ids might be a sign that you could organize your code better (in the next weeks we’ll learn about good practices like this). The class and style attributes will be explained soon, in the CSS section below.

**Self-closing elements**
Some elements rarely have internal content, and it becomes a bit of a pain to type the closing tags every time. In that case, you can use the following shorthand notation: <foo/> is equivalent to <foo></foo> (you might have noticed that in the charset declaration above).

**Here are some important tags:**
{% include code.html id="htmls_tags" file="html_tags.html" code="" %}

A couple of tags that don't have visual equivalents on the website, they define **document metadata**:
 * ``<html>`` creates the entire HTML container.
 * ``<head>`` Creates the header (generally where the title and links to style sheets/scripts are found).
 * ``<script>`` links to or embeds a script (we will do that a lot).
 * ``<style>`` for embedding a style in the website.
 *  ``<link>`` to reference an external document, often a css document like that: ``<link rel="stylesheet" type="text/css" href="theme.css">``. The rel attribute defines the relationship to the active document, the type attribute tells the browser which type of file to expect. 
 * ``<body>`` marks the container of the content on the website.  
 
 A comprehensive and well structured list of all elements can be [found at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
    


### Necessary Boilerplate

An HTML5 document has a little bit of necessary boilerplate that you should just copy and paste every time you need to get started (and no, you won’t get charged with plagiarism for this one bit.). Every HTML5 document you create in class should have this skeleton:

{% include code.html id="simple_example" file="simple_example.html" code="" %}


### DOM 

As we have seen above, a markup document looks a lot like a tree: it has a root, the HTML element, and elements can have children that are containing elements themselves.

While HTML is a textual representation of a markup document, the DOM is a programming interface for it. DOM stands for “Document Object Model”, and in this class we will use “DOM” to mean the tree created by the web browsers to represent the document, and the API that they provide in order to access it. This week, we will not use the API part of it, but the examples we’ll go over in class will highlight the tree structure of the DOM.

#### INSPECTING THE DOM IN A LIVE BROWSER

Perhaps the most important habit you will learn in these first web lessons is the following: when in doubt, go to the Developer Tools. In this case, we’ll look at the Element tree, by clicking on the menu bar: View → Developer → Developer Tools. Alternatively, you can right click on any part of the webpage, and choose “Inspect Element”. Notice that there can be a big difference between what is in the DOM and what is in the source. In fact, much of this class is about dynamically generating DOM elements.

## Making Things Pretty: Cascading Style Sheets

HTML specifies the content of a web page, but plain HTML says relatively little about how the content looks. This is where CSS comes in. CSS stands for Cascading Style Sheets: they are external declarations that control the way your elements will get rendered by a web browser. A full discussion of CSS syntax is, as usual, given at the [MDN CSS website](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax); we show the very basics here.

A stylesheet will usually consist of a list of CSS rules that are inserted in <style> elements on the HTML header, <head>. A single CSS rule associates a CSS selector with a set of CSS declarations. These are easier to see through examples.

### CSS Element Selectors

Let’s look at a very simple CSS rule:

{% include code.html id="simple_css" file="simple_css.html" code="" %}

In this rule, **strong is the selector**, and each line inside the curly brackets is a **declaration**. Roughly, the way this goes is: for every DOM element with tag name strong, make its background color red, and its font size 300% of the base size. CSS rules are applied in order that they appear in the document, and if more than one rule matches the element, then they both apply. For instance, the example below is entirely equivalent to the above:

{% include code.html id="simple_css2" file="simple_css2.html" code="" %}

### CSS Class Selectors

CSS selectors can be much more powerful than selecting on element names. For example, we can create user-defined “classes” of style. Classes allow us to define certain elements to be of a specific type that is then formatted consistently. Here is an example with "important" text and a "footnote". Both are in a div, but they have different semantics, and we also want to display them differntly. 

{% include code.html id="css_classes" file="css_classes.html" code="" %}

Note that we can also apply multiple classes to a single element, as you can see in the important footnote. 

### CSS ID Selectors

ID selectors work similar to class selectors, but IDs may only be used once for an element in the DOM. You can use IDs as "anchors" to refer to a site by appending ``#idname`` to the URL. But you can also use IDs to apply custom styles in CSS:

{% include code.html id="css_ids" file="css_ids.html" code="" %}

You can also use the combination of IDs and CSS to create layouts of a page:

{% include code.html id="css_layouts" file="css_layouts.html" code="" %}

### CSS Relationship Selectors

CSS selectors let you match elements based on their relationship with other elements. While I will simply refer you to the [MDN Selectors webpage](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) for the full reference, I want to highlight two particularly important ones, the child selector, and the descendant selector.

The child selector matches every time an element is directly enclosed by a different element. For example, consider the following rule involving the child selector:

{% include code.html id="css_relationships" file="css_relationships.html" code="" %}

### Multiple Rules in CSS

When more than one CSS rule matches, then different CSS declarations might conflict with one another. In that case, then, “the most specific declaration wins”. The rules for what counts as more specific are [really disgusting](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), so if you find yourself debugging CSS code because the styles “don’t take”, the first thing you should try is to set completely different classes for the element, add all the declarations to this class. Then, with help from the Developer Tools, you can add classes back to your element to see which declarations might be winning the specificity race. In order to avoid this kind of trouble, it’s better to stick to simple declarations as much as possible.

### Other ways of declaring CSS 

You can provide CSS stylesheets as an external file. This is very useful when you want to share CSS rules across many different documents. In that case, you include the following element in your ``<head>``:

``<link rel="stylesheet" href="style.css"/>`` 

In this case, style.css should be an additional file that consists entirely of CSS rules.

Finally, you can place CSS declarations directly inside an element. You do this using the style attribute, which most HTML elements support. For example, if you have this CSS rule:

{% include code.html id="css_inline" file="css_inline.html" code="" %}

It’s a bad idea to do this in HTML that you write manually: you’re mixing content with presentation, and making it hard to reuse the declarations. But later on we will be writing code to generate elements in the DOM for us, and in that case, this will be a very common and good thing to do. In this latter situation it’s a good thing to do because the reusability will be represented in our Javascript source code


## SVG

