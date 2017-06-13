#Superheroes Demo App

##Try
1. change Firebase config [ src/app/app.module.ts line 18 ]
2. npm install
3. ng serve

##Deploy Hosting and Database
1. firebase init
  1. Database and Hosting
  2. Rewrite url to index.html (one page app)
  3. Folder dist/
  4. Database rules (not change)
2. firebase deploy

##Deploy Firebase Functions
1. cd functions
2. npm install
3. cd ..
4. firebase init
  1. Functions
  2. Folder functions/
5. firebase deploy
