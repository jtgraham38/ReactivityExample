# My Reactivity Example

I decided to explore how reactive variables are often implemented in JavaScript by doing it myself. This involved using js Proxy and Reflect objects. I implemented four directives: j-state, j-text, j-on, and j-show. j-state uses a json string to define the state data. j-text sets the innertext of an entity to a reactive variable. j-on runs an expression when the designated event occurs. And, j-show hides or shows an event based on an expression that can use reactive variables. HEre is an example of how it works:

```html
<!DOCTYPE html>
<html lang="en" class="h-full">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reactive</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="h-full">
    <div j-state='{"count": 0}' class="h-1/2 w-full grid place-items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
        <h1 class="text-2xl font-bold mb-4">Welcome to my website!</h1>
        <div class="p-2 grid place-items-center bg-gray-400">
          <p class="text-xl">
            You have clicked the button <span j-text="count"></span> times
          </p>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            j-on="click|this.count = this.count + 1"
          >
            Click me!
          </button>
        </div>
        <h3 j-show="this.count % 2 === 1" class="text-3xl p-2">It's odd!</h3>
      </div>
    </div>

    <div j-state='{"count": 7}' class="h-1/2 w-full grid place-items-center">
      <div class="bg-gray-200 p-4 rounded-lg">
        <h1 class="text-2xl font-bold mb-4">Welcome to my website!</h1>
        <div class="p-2 grid place-items-center bg-gray-400">
          <p class="text-xl">
            You have clicked the button <span j-text="count"></span> times
          </p>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
            j-on="click|this.count = this.count + 1"
          >
            Click me!
          </button>
        </div>
      </div>
    </div>
  </body>

  <script src="reactive/index.js" type="module"></script>
</html>
```
