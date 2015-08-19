---
layout: page
title:  Version Control with Git, HTML Basics
permalink: /lectures/lecture-git-html/
nomenu: true
---

Welcome to CS-5630 / CS-6630 - Visualization. In this class we use a mix of traditional slides and interactive documents that we will use to teach, but that you can also use as a reference for reading. This is the first such interactive lecture. We will cover the basics of version control with git, as well as the basics of the web stack. 

## Git


*30 minutes; interactive.*
We will be using a version control tool called git to track changes to our code. We'll also be using Github, an online tool for hosting git repositories.

You should already have git installed, if not see the [official documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on how to install git on your operating system. 



### Why version Control?
 
 * **Keep copies of multiple states of files** 
  By committing you record a state of the file to which you can go back any time.
 * **Create alternative sates**
 Imagine you just want to try out something, but you realize you have to modify multiple files. You're not sure whether it works or is worth it. With version control you can just create a **branch** where you can experiment or develop new features without disturbing the main or other branches.
 * **Collaborate in Teams** 
 Nobody wants to send code via e-mail. Version control lets you keep your code remotely and has dedicated ways to merge and deal with conflicts. 
 * **Keep your work save**
 Your hard drive breaks. Your computer is stolen. But your code is save because you store it not only on your computer but also on a remote server. 
 * **Share**
 You developed something awesome and want to share it. But not only do you want to make it available, you're also happy about contributions from others! 


![Version Control with Central Repository](images/centralized.png)

### Types of Version Control: Central Repository

 * Everybody needs to write to one server
 * All operations (history, commit, branches) require server connection
 * Common traditional model: CVS, SVN, etc. 
 * Pros: 
   * Simple Model
 * Cons: 
   * Complex for larger projects
        * Who is allowed to write?
        



### Types of Version Control: Distributed Version Control


![Distribute Version Control](images/distributed.png)

 * Everybody has a full history of the repository locally
 * No defined server - every node is equal.
   * In practice: often server is used for one "official" copy of code.
    But: server by convention only, no technical difference.
 * Pros: 
    * No access issues
        * Make a copy and hack away
        * Ask if partner wants to accept your changes
    * Everything is local
        * Fast!
        * No internet connection required
        * Commit often model (once per feature) - don't sync all the time.
 * Cons:
    * Extra effort to distinguish between committing and pushing/pulling (synchronizing). 

### Implementations

 * Centralized
    * CVS
    * SVN
    * Team Foundation Server 
    * ...
 * Distributed
    * git
    * Mercurial
    * ...
 * We will be using git in this lecture. 
 
### git

 * Created by Linus Torvalds, 2005
 * Meaning: British English slang roughly equivalent to "unpleasant person". 
 * git – the stupid content tracker.

*I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'git'. -- Linus Torvalds*

### Why git?

 * Popular (~50% of open source projects)
 * Truly distributed
 * Very fast
 * Everything is local
 * Free
 * Safe against corruptions
 * GitHub!
 
### git model 
 
Whiteboard sketch of git with a server. 
 
### git tutorial

This is a quick intro to git, used in combination with GitHub. This is not a complete tutorial, but will use the most important git features. 

**Create a folder for your project**

{% highlight bash linenos %}
$ mkdir myProject 
$ cd myProject/
{% endhighlight %}


**Initalize the git repository**
{% highlight bash linenos %}
$ git init 
Initialized empty Git repository in ../myProject/.git/
{% endhighlight %}

**What does git do to your file system?**
{% highlight bash linenos %}
# Let's look at what git creates
$ ls .git/ 
branches  config  description  HEAD  hooks  info  objects  refs

# The interesting stuff is in the config file
$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true


# More interesting for a project with branches and remotes 
$ cat .git/config 
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
[remote "origin"]
        url = https://github.com/CS171/HW1.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master

{% endhighlight %}

**Now let's create a file**
{% highlight bash linenos %}
$ echo 'Hello World' > demo.txt
$ cat demo.txt 
Hello World
{% endhighlight %}

**Let's add it to version control**
{% highlight bash linenos %}
$ git add demo.txt
{% endhighlight %}


**Let's look at what is going on with the repository**
{% highlight bash linenos %}
$ git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)
#
#       new file:   demo.txt
#
{% endhighlight %}

That means: git knows that it's supposed to track this file, but it's not yet versioned.
 
**Let's commit the file.** Once a file is committed, it's state is recorded and you can go back to previous versions any time.

{% highlight bash linenos %}
# The -m option specifies the commit message. If you don't use it you'll go into an editor to enter your commit message.  
$ git commit -m "Committing the test file" 
[master (root-commit) 3be5e8c] Wrote to demo
 1 file changed, 1 insertion(+)
 create mode 100644 demo.txt

# Did it work?
$ git status
# On branch master
nothing to commit, working directory clean
{% endhighlight %}

That means that now the file is tracked and committed to git. But it's still only stored on this one computer! 

**Next, we change a file and commit it again.**

{% highlight bash linenos %}
# Now let's change something
$ echo 'Are you still spinning?' >> demo.txt 
$ cat demo.txt 
Hello World!
Are you still spinning?

# Let's check the status of git!
$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   demo.txt
#
no changes added to commit (use "git add" and/or "git commit -a")

# So git knows that something has changed, but hasn't recorded it. Let's commit. 
$ git commit -m "Added a line to the demo file" 
On branch master
Changes not staged for commit:
	modified:   demo.txt
	
# That didn't work! You have to add all the files you want to commit every time. There is a shorthand that you can use to add all the tracked files: append '-a'.
$ git commit -a -m "added a line to the demo file" 
[master b03178f] added a line to the demo file
 1 file changed, 1 insertion(+)

# Better. Now, let's look at what happened up to now
$ git log
commit a939cdfeaf0a7ffb972e6616549e9053917e0673
Author: Alexander Lex <alex@seas.harvard.edu>
Date:   Thu Jan 30 20:35:37 2014 -0500

    spinning

commit 3be5e8c4b3691a70598d784483ef9cf35d5663ba
Author: Alexander Lex <alex@seas.harvard.edu>
Date:   Thu Jan 30 20:29:52 2014 -0500

    Wrote to demo

{% endhighlight %}

Commits have a unique ID. This ID is a hash of your complete history.  When we retreive your homeworks, we will tell you the commit ID of the homework we grade. Check whether that's the correct ID!

Through this cycle of editing, adding and committing, you can develop software in a linear fashion. Now let's see how we can create alternate versions. 

### Branching

# Now let's create a branch
$ git branch draft

# This created a branch with the name draft. Let's look at all the other branches
$ git branch
  draft
* master

# We have two branches, draft and master. The * tells us the active branch (the HEAD)

# Let's switch the branch
$ git checkout draft
Switched to branch 'draft'

# Let's see if there is something different
$ cat demo.txt 
Hello World!
Are you still spinning?

# No - it's the same! Now let's edit.
$ echo "Spinning round and round" >> demo.txt 
$ cat demo.txt 
Hello World!
Are you still spinning?
Spinning round and round

# And commit
$ git commit -a 
[draft 059daaa] Confirmed, spinning
 1 file changed, 1 insertion(+)
 
# No let's switch back to master again
$ git checkout master
Switched to branch 'master'

# The text isn't here.
$ cat demo.txt 
Hello World!
Are you still spinning?

# Writing something to the front and to the end
$ cat demo.txt 
I am here!
Hello World!
Are you still spinning?
Indeed!

$ git commit -a 
[master 8437327] Front and back
 1 file changed, 2 insertions(+)
 
# Now let's try to merge it
$ git merge draft
Auto-merging demo.txt
CONFLICT (content): Merge conflict in demo.txt
Automatic merge failed; fix conflicts and then commit the result.

# The result
$ cat demo.txt 
I am here!
Hello World!
Are you still spinning?
<<<<<<< HEAD
Indeed!
=======
Spinning round and round
>>>>>>> draft

# The first line was merged without problems, The final line, where we have two alternative versions is a conflict. We have to manually resolve the conflict.

# Once this is done, we can commit again.
$ git commit -a 
[master 4dad82f] Merge branch 'draft'

# Everything back in order.
$ git status 
# On branch master
nothing to commit, working directory clean

# Now I'll create a new repository on github

# If you don't have a git repository with code yet, you can simply clone that repository and start working on it:
$ git clone https://github.com/alexsb/Demo.git
# This creates a local copy of the (empty) github repository.

# I'd like to push our changes to this repository.
# This command tells git where the "origin" of this repository is.
$ git remote add origin https://github.com/alexsb/Demo.git

# We can see the changes already:
$ cat .git/config 
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
[remote "origin"]
        url = https://github.com/alexsb/Demo.git
        fetch = +refs/heads/*:refs/remotes/origin/*

# Now we send our changes to github
$ git push -u origin master
Username for 'https://github.com': alexsb
Password for 'https://alexsb@github.com': 
Counting objects: 15, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (15/15), 1.22 KiB | 0 bytes/s, done.
Total 15 (delta 2), reused 0 (delta 0)
To https://github.com/alexsb/Demo.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.

# Now our changes are on github.
# Let's edit the file through the github web interface
# To get the changes locally, we pull 

$ git pull 
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 1), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From https://github.com/alexsb/Demo
   4dad82f..4a83d51  master     -> origin/master
Updating 4dad82f..4a83d51
Fast-forward
 demo.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

# Now these changes are back here:
$ cat demo.txt 
I am here!
Hello World!
Are you still spinning?
Indeed!
Spinning round and round.
But don't you grow tired?


# Forking on Github: Forking is essentially making use of the distributed nature of git, while having the benefits of a server.
# Github Issues are a great way to keep track of open tasks and problems. Issues can be references and closed from commits. 

 






### git Resources

[Understanding git conceptually](http://www.sbf5.com/~cduan/technical/git/)
[Fun and insightful talk on git by Linus Torvalds](http://www.youtube.com/watch?v=4XpnKHJAok8)
[A successful git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
[Wikipedia on git](http://en.wikipedia.org/wiki/Git_(software))



*briefly describe the value of version control*

First, let's configure git: open a shell. *describe how to do this on other OSes*

Run the following.


```
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR EMAIL ADDRESS"
```

`cd` to the directory you want put your homework in (e.g., your Documents folder). *ensure the concept of a working directory is clear*

What we going to do as overview:
![Setting up your Github repository](images/section1_github.png?raw=true)



Run the following:

```
git clone https://github.com/CS171/2015-cs171-homework.git -o homework
```

Then `cd` into the newly created `2015-cs171-homework/` directory.  You can change the directory name if you want.

*open a browser window*

Create a new repository on the Github website following the `cs171-hw-lastname-firstname` naming convention. **Use all lowercase for your repository name. It is important that your repository be named exactly as above so that we can access it for grading.**

Ensure your new repository is private and don't click the option to "Initialize the repository with a README".

Unless you know what you're doing, select HTTPS.

![Setting up your Github repository](images/https.png?raw=true)

Run the two commands described on GitHub under the heading "Push an existing repository from the command line", highlighted in red below.

![Setting up your Github repository](images/commands.png?raw=true)

On GitHub, go to the repository settings and navigate to the Collaborators page. Add [`cs171tf`](https://github.com/cs171tf) as a collaborator to your private repository.

Now your homework repository is all set!

### Committing

While working on homework assignments, periodically run the following:

```
git add -A
git commit -m "Describe your changes"
git push
```

The `git commit` operation takes snapshot of your code at that point in time — a snapshot is called a "commit" in Git parlance. You can revert to a previous commit at any time.

The `git push` operation pushes your local commits to the remote repository. It is important that you push your changes or others will not be able to see them.

You should do this frequently: as often as you have an incremental, standalone improvement.

### Submitting your homework

We will automatically copy your repository after each homework deadline. **You do not need to do anything else to submit your work (but make sure that you have pushed the latest version of your homework).** We will count the time of your last commit to the Github repository as your submission time.

Refer to the [CS 171 web page](http://www.cs171.org/2015/homework/) for more information on how to submit your homework.

### Getting new homework assignments

When we release a new assignment we will simply add it to the [homework github repository](https://github.com/CS171/2015-cs171-homework).

To get the latest homework assignments and potential updates or corrections to the assignment, run the following.

```
git pull homework master
```

Make sure to have all your changes committed before you do that.

*Hands-on help to ensure all students have their git environment configured*

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