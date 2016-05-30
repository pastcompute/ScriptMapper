# ScriptMapper

This is a Javascript minified decoder based on the [Mozilla source-map](https://github.com/mozilla/source-map/) library.

I needed something quick & simple for debugging browser Javascript errors in minified code for cases where I 
don't want to use the debugger. This is particularly useful for post-mortem debugging from a console log output
provided by an end user.

1. Go to https://pastcompute.github.io/ScriptMapper/
2. Copy/Paste the full content of a map file into the text area
3. Enter the line & column 
4. Hit Search

Alternatively, hit Dump to get a list of all mappings in the map file.

### TODO

* Drag and drop mapfile
* Enter & load a mapfile from a URL
* Hyperlink from the results to the full dump or source code