# Digital Book Shop

## Why is it important to you and what inspired it?

-  Practice site, good practice for my Song Shop
-  Challenge of making an online shop that handles real payments
-  Wanted to focus on functionality as much as possible
-  Wanted to make a nice UX, taking inspiration from Amazon

## Major features and what makes it unique?

-  Ultra minimal digital book shop
-  Stateless authentication server using JSON web tokens
-  Stripe-hosted checkout page for payments
-  Purchased PDF downloads are token-protected, and downloads are limited to 5 per purchase
-  Cart handling for signed-in and sign-out users. This added a lot of complexity but I think it's essential to avoid a frustrating shopping experience

## What did you start with? Where does the design come from?

-  I had been reading about project management, and decided to do things a bit differently from how I normally would, which helped a lot.
-  I started my listing all the features I wanted it to have
   -  Main thing is the UX, which I think is really all about communication. The site should make it obvious what's going on, what's happening, and what has gone wrong
   -  Also listing the features I don't want it to have to avoid the project getting out of scope
   -  The books are hardcoded, although I learned later that it's a better idea to keep the price data in the database to prevent hackers helping themselves to massive discounts.
-  I initially thought I would make a text-only shop, but then I discovered that Google Gemini can generate images, so I got it to make these book covers, although they can't contain people unless you have the pro version. The Dracula one is pretty cool, right? While I don't love all aspects of my design, it's satisfactory for my aims, and some bits of it (menu bar and cart tables) actually look pretty neat.

## What was the hardest part, and where did you get stuck?

-  Getting the books to be added to the user's 'purchased' array was a big challenge.

## How did you resolve it?

-  I had to learn all about Stripe test mode, which was more complicated than I thought.
   -  Generating a webhook endpoint on the Stripe dashboard, and making a `/api/webhook` route to add the items to the user's purchased items
-  Then I made a test suite with Vitest and Puppeteer
-  To test the payment system, I needed to have three terminals open
   -  One running the application
   -  One using the Stripe CLI to listen to and redirect the webhook trigger
   -  One to run the test suite

## What did you learn, and how has that affected subsequent projects?

-  The main thing I learned is that I can actually be more ambitious in the future! I thought this would be a lot harder than it actually was.
-  Environment variable handling is really important, and this has actually put me off using Next.js a little bit. If this isn't done in a robust & fail-fast way, you can waste a lot of time. I found a work around though, and my end-to-end test suite ensures that everything is working properly.
-  API responses are much easier to handle when they're consistent
-  My planning really paid off, but even more planning would have helped even further. Especially UX stuff - thinking about the behavior you want before you start to code can save so much time.

For my Song Shop, I will think very carefully about the structure of the API response, as well as how the users (this time with buyers and sellers) flow from page to page
