# What is the DOM?

### A Brief Definition

The DOM is an in-memory representation of an HTML document.

DOM stands for "document object model". The "document" is usually an HTML file. The DOM is a representation of this document that can be manipulated by a scripting language such as JavaScript.

Nodes are the individual pieces that make up the DOM

When a broswer reads an HTML document it interprets the HTML and compiles it into nodes. Individual elements such as headers, paragraphs, and images are represented as separate Element Nodes. The text within elements are represented as Text Nodes, and comments are represented as you guessed it, Comment Nodes.

Let's look at a portion of some html...

```html
<div>
  <h1>My Life</h1>
  <p>Dear diary, why didn't I eat that pizza?</p>
  <!-- some worthless commentary -->
</div>
```

And the resulting portion of the DOM generated by this example...

You'll also notice some "empty" text nodes mixed in with the two element nodes and one comment node. These text nodes are comming from the use of newlines and indentation in the HTML. Although the W3C sets standards for the way the browser interprets the HTML, the way in which the browser decides how to convert whitespace into nodes can vary between browsers. Remember that the browsers are ultimately in charge of the way in which the DOM is compiled.


### Relationships

The DOM keeps track of how each of these nodes are related in a way that could be compared to a family tree.


The three main ways to describe the relationship of elements are parent, child, and sibling.


The div is the parent of two element nodes one comment node, and a few text nodes resulting from whitespace in the HTML. From another perspective, the element nodes are children of the div element node. The h1 p and comment nodes are each siblings to each other.


### A Larger View of the DOM

```html
<!DOCTYPE HTML>
<html>
  <head>
   <title>Title</title>
  </head>
  <body>
    <div>
      <h1>My Life</h1>
      <p>Dear diary, why didn't I eat that pizza?</p>
      <!-- some worthless commentary -->
    </div>
  </body>
</html>
```

The root node of the DOM is the HTMLDocument node.

Each of these types of Nodes have an "interface" unique to their role in the DOM. For example the HTMLHeadElement interface contains the descriptive and metadata for the document. This makes sense because this is what we'd use the head tag for within an HTML document.

> "Interface": In the context of Object Oriented Programming, an object's interface consists of the methods that are available to that object.
