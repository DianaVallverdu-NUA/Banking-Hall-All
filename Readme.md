#Banking Hall Template - Version intech midi

#Instructions

You have up to a, b, c, d pages to show with one intech (might go up higher if you mix them).

Create a folder if it doesn't exist. (copy over all folders except for sketch.js)

Remove any unused folders. 


For each group:

1. Replace sketch.js with their group's sketch
2. Index.html:
  - Change / (un)Comment Title
  - Change / (un)Comment info in infoDiv
3. on sketch.js:
  - remove onEnabled function
  - rename allCC to customCC
  - rename draw to customDraw

In General:
1. Ensure pages vector only covers pages
2. Adjust frame width using the customp5.js drawFrame function
5. Turn messaging on and off by:
- Uncommenting message.js import script from each index
- toggling messagingON variable from messaging.js