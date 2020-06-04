const puppeteer = require('puppeteer');

let users = [{"name":"Carlos Guevara","email":"myemail@gmail.com"}]

let user = {};
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < users.length; i++) {
    user = users[i];
    console.log('Enrolling --> ' + user.email);

        await page.goto('https://itpe.webinarninja.com/hybrid-webinars/372721/register?in_tok=db0980ae-5d71-4b4b-96e5-4e5a3d05556a',{waitUntil: 'domcontentloaded'});
        await page.$eval('input[name=wn_reg_email]', (el,val) => {el.value=val}, users[i].email);
        await page.$eval('input[name=wn_reg_name]', (el,val) => {el.value=val}, users[i].name);

        await Promise.all([
            page.$eval('button[type="submit"]', el => el.click()),
            page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        ]);

        console.log(user.email + ' is ready');
    };
  await browser.close();
})();

